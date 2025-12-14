import { prisma } from '../lib/prisma';
import { HttpError } from '../errors';
import { roomsService } from './roomsService';
import { emitToUser } from '../websocket/server';
import { Server as SocketIOServer } from 'socket.io';
import { redis } from '../lib/redis';

export class MatchingService {
  private io: SocketIOServer | null = null;
  private QUEUE_MALE = 'queue:male';
  private QUEUE_FEMALE = 'queue:female';

  /**
   * WebSocket server'ı set et
   */
  setIO(io: SocketIOServer) {
    this.io = io;
  }

  /**
   * Eşleştirme kuyruğuna katılma
   */
  async joinQueue(userId: string) {
    // Kullanıcının bilgilerini al (Cinsiyet önemli)
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: { id: true, gender: true, name: true },
    });

    if (!user) {
      throw new HttpError(404, 'Kullanıcı bulunamadı');
    }

    const queueKey = user.gender === 'male' ? this.QUEUE_MALE : this.QUEUE_FEMALE;
    // const otherQueueKey = user.gender === 'male' ? this.QUEUE_FEMALE : this.QUEUE_MALE; // For future use

    // Zaten kuyrukta mı? (Redis LPOS O(N) ama N küçükse sorun değil, büyükse set kullanılabilir)
    // Basitlik için LRM yapıp tekrar ekleyebiliriz veya LPOS bakabiliriz.
    // LPOS Redis 6.0.6+ gerektirir.
    const pos = await redis.lpos(queueKey, userId);

    if (pos !== null) {
      throw new HttpError(400, 'Zaten eşleştirme kuyruğundasınız');
    }

    // Aktif oda kontrolü (DB'den)
    const activeRoom = await prisma.roomParticipant.findFirst({
      where: {
        userId,
        room: {
          timeLeftSec: { gt: 0 },
        },
      },
    });

    if (activeRoom) {
      throw new HttpError(400, 'Zaten bir odadasınız');
    }

    // Kuyruğa ekle
    await redis.rpush(queueKey, userId);

    // Eşleştirme kontrolü yap
    await this.checkAndMatch();

    return {
      success: true,
      id: `queue_${Date.now()}`, // Fake ID for backward compatibility
      status: 'WAITING',
      position: await redis.llen(queueKey),
      createdAt: new Date(),
    };
  }

  /**
   * Kuyruktan ayrılma
   */
  async leaveQueue(userId: string) {
    // Kullanıcı cinsiyetini bilmediğimiz için iki kuyruğa da bakıp siliyoruz
    // LREM count=0 hepsini siler
    const removedMale = await redis.lrem(this.QUEUE_MALE, 0, userId);
    const removedFemale = await redis.lrem(this.QUEUE_FEMALE, 0, userId);

    if (removedMale === 0 && removedFemale === 0) {
      // Kuyrukta yokmuş, hata vermeye gerek var mı? UI için sessiz kalabiliriz.
    }

    return { success: true };
  }

  /**
   * Kuyruk durumunu getirme
   */
  async getQueueStatus(userId: string) {
    // Hangi kuyrukta olduğunu bulmak zor (cinsiyet bilmiyorsak).
    // Varsayım: İkisini de kontrol et.

    let pos = await redis.lpos(this.QUEUE_MALE, userId);
    let queueKey = this.QUEUE_MALE;

    if (pos === null) {
      pos = await redis.lpos(this.QUEUE_FEMALE, userId);
      queueKey = this.QUEUE_FEMALE;
    }

    if (pos === null) {
      return {
        inQueue: false,
        position: null,
        totalWaiting: 0,
      };
    }

    const totalWaiting = await redis.llen(queueKey);

    return {
      inQueue: true,
      position: pos + 1, // 1-based
      totalWaiting,
      createdAt: new Date(), // Mock date since Redis list doesn't store time
    };
  }

  /**
   * Eşleştirme kontrolü ve oda oluşturma
   */
  private async checkAndMatch() {
    const maleCount = await redis.llen(this.QUEUE_MALE);
    const femaleCount = await redis.llen(this.QUEUE_FEMALE);

    // En az 4 erkek ve 4 kadın
    if (maleCount < 4 || femaleCount < 4) {
      return;
    }

    // Atomik olarak çekmeyi dene
    // Not: Concurrency sorunu düşük ihtimal (Node single thread) ama cluster modunda Redis lock gerekir.
    // Şimdilik basit LPOP yapıyoruz.

    const males = await redis.lpop(this.QUEUE_MALE, 4);
    if (!males || males.length < 4) {
      // Yetersiz sayı, geri koy
      if (males && males.length > 0) {
        await redis.lpush(this.QUEUE_MALE, ...males);
      }
      return;
    }

    const females = await redis.lpop(this.QUEUE_FEMALE, 4);
    if (!females || females.length < 4) {
      // Yetersiz sayı, erkekleri de geri koy
      if (females && females.length > 0) {
        await redis.lpush(this.QUEUE_FEMALE, ...females);
      }
      // Erkekleri geri koy (Sırayı bozmamak için RPUSH mu LPUSH mu? LPUSH başa koyar, öncelik verir)
      // Hakkı yenenleri başa koymak adildir.
      await redis.lpush(this.QUEUE_MALE, ...males);
      return;
    }

    const selectedUserIds = [...males, ...females];

    try {
      // Odayı oluştur
      const room = await roomsService.createRoom(selectedUserIds[0], {
        name: `Eşleştirme Oda ${Date.now()}`,
        category: 'Eşleştirme',
        maxParticipants: 8,
        durationSec: 300,
      });

      // Diğer kullanıcıları odaya ekle
      // İlk kullanıcı createRoom ile eklendi
      for (let i = 1; i < selectedUserIds.length; i++) {
        try {
          await roomsService.joinRoom(selectedUserIds[i], {
            roomId: room.id,
          });
        } catch (e) {
          console.error(`User ${selectedUserIds[i]} failed to auto-join room`, e);
          // TODO: Retry veya kullanıcıya hata bildir
        }
      }

      // Kullanıcı detaylarını toplu çek (Socket bildirimi için)
      const users = await prisma.user.findMany({
        where: { id: { in: selectedUserIds } },
        select: { id: true, name: true, gender: true },
      });

      // WebSocket ile eşleşen kullanıcılara bildir
      if (this.io) {
        const roomData = {
          id: room.id,
          name: room.name,
          category: room.category,
          maxParticipants: room.maxParticipants,
          currentParticipants: 8,
          timeLeftSec: room.timeLeftSec,
          durationSec: room.durationSec,
        };

        for (const user of users) {
          emitToUser(this.io, user.id, 'match-found', {
            roomId: room.id,
            room: roomData,
            matchedUsers: users,
          });
        }
      }

      return room;

    } catch (error) {
      console.error('Error creating room from match:', error);
      // Hata durumunda kullanıcıları kuyruğa geri ekle?
      // Bu senaryoda kullanıcılar kuyruktan çıktı ama oda kurulamadı.
      // Kritik hata. Loglayıp geçiyoruz şimdilik.
      // Production için: "Recovery Queue" mekanizması eklenebilir.
    }
  }

  // Admin/Debug için
  // Admin/Debug için
  async getQueueUsers() {
    const males = await redis.lrange(this.QUEUE_MALE, 0, 10);
    const females = await redis.lrange(this.QUEUE_FEMALE, 0, 10);

    const allIds = [...males, ...females];

    if (allIds.length === 0) {
      return [];
    }

    const users = await prisma.user.findMany({
      where: { id: { in: allIds } },
      select: {
        id: true,
        name: true,
        gender: true,
        email: true,
      },
    });

    return users;
  }
}

export const matchingService = new MatchingService();
