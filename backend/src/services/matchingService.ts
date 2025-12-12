import {prisma} from '../lib/prisma';
import {HttpError} from '../errors';
import {roomsService} from './roomsService';
import {emitToUser} from '../websocket/server';
import {Server as SocketIOServer} from 'socket.io';

export class MatchingService {
  private io: SocketIOServer | null = null;

  /**
   * WebSocket server'ı ayarla (match-found eventleri için)
   */
  setIO(io: SocketIOServer) {
    this.io = io;
  }

  /**
   * Eşleştirme kuyruğuna katılma
   */
  async joinQueue(userId: string) {
    // Kullanıcının zaten kuyrukta olup olmadığını kontrol et
    const existingQueue = await prisma.matchQueue.findFirst({
      where: {
        userId,
        status: 'WAITING',
      },
    });

    if (existingQueue) {
      throw new HttpError(400, 'Zaten eşleştirme kuyruğundasınız');
    }

    // Kullanıcının aktif bir odada olup olmadığını kontrol et
    const activeRoom = await prisma.roomParticipant.findFirst({
      where: {
        userId,
        room: {
          timeLeftSec: {
            gt: 0,
          },
        },
      },
    });

    if (activeRoom) {
      throw new HttpError(400, 'Zaten bir odadasınız');
    }

    // Kuyruğa ekle
    const queueEntry = await prisma.matchQueue.create({
      data: {
        userId,
        status: 'WAITING',
      },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            gender: true,
          },
        },
      },
    });

    // Eşleştirme kontrolü yap
    await this.checkAndMatch();

    return {
      id: queueEntry.id,
      status: queueEntry.status,
      user: queueEntry.user,
      createdAt: queueEntry.createdAt,
    };
  }

  /**
   * Kuyruktan ayrılma
   */
  async leaveQueue(userId: string) {
    const queueEntry = await prisma.matchQueue.findFirst({
      where: {
        userId,
        status: 'WAITING',
      },
    });

    if (!queueEntry) {
      throw new HttpError(404, 'Kuyrukta değilsiniz');
    }

    await prisma.matchQueue.update({
      where: {id: queueEntry.id},
      data: {status: 'LEFT'},
    });

    return {success: true};
  }

  /**
   * Kuyruk durumunu getirme
   */
  async getQueueStatus(userId: string) {
    const queueEntry = await prisma.matchQueue.findFirst({
      where: {
        userId,
        status: 'WAITING',
      },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            gender: true,
          },
        },
      },
    });

    if (!queueEntry) {
      return {
        inQueue: false,
        position: null,
        totalWaiting: 0,
      };
    }

    // Kuyruktaki toplam bekleyen sayısı
    const totalWaiting = await prisma.matchQueue.count({
      where: {
        status: 'WAITING',
      },
    });

    // Pozisyon hesaplama (basit - öncelik sırasına göre)
    const position = await prisma.matchQueue.count({
      where: {
        status: 'WAITING',
        createdAt: {
          lte: queueEntry.createdAt,
        },
      },
    });

    return {
      inQueue: true,
      position,
      totalWaiting,
      createdAt: queueEntry.createdAt,
    };
  }

  /**
   * Eşleştirme kontrolü ve oda oluşturma
   */
  private async checkAndMatch() {
    // Kuyruktaki tüm bekleyenleri al
    const waitingUsers = await prisma.matchQueue.findMany({
      where: {
        status: 'WAITING',
      },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            gender: true,
          },
        },
      },
      orderBy: {
        createdAt: 'asc',
      },
    });

    if (waitingUsers.length < 8) {
      return; // Yeterli kişi yok
    }

    // Gender balance kontrolü
    const males = waitingUsers.filter((u) => u.user.gender === 'male');
    const females = waitingUsers.filter((u) => u.user.gender === 'female');

    // En az 4 erkek ve 4 kadın olmalı
    if (males.length < 4 || females.length < 4) {
      return; // Gender balance yok
    }

    // İlk 8 kişiyi seç (4 erkek, 4 kadın)
    const selectedMales = males.slice(0, 4);
    const selectedFemales = females.slice(0, 4);
    const selectedUsers = [...selectedMales, ...selectedFemales];

    // Oda oluştur
    try {
      const room = await roomsService.createRoom(selectedUsers[0].userId, {
        name: `Eşleştirme Oda ${Date.now()}`,
        category: 'Eşleştirme',
        maxParticipants: 8,
        durationSec: 300,
      });

      // Diğer kullanıcıları odaya ekle
      for (let i = 1; i < selectedUsers.length; i++) {
        await roomsService.joinRoom(selectedUsers[i].userId, {
          roomId: room.id,
        });
      }

      // Kuyruktan çıkar
      await prisma.matchQueue.updateMany({
        where: {
          userId: {
            in: selectedUsers.map((u) => u.userId),
          },
        },
        data: {
          status: 'MATCHED',
        },
      });

      // WebSocket ile eşleşen kullanıcılara bildir
      if (this.io) {
        const matchedUserIds = selectedUsers.map((u) => u.userId);
        for (const userId of matchedUserIds) {
          emitToUser(this.io, userId, 'match-found', {
            roomId: room.id,
            room: {
              id: room.id,
              name: room.name,
              category: room.category,
              maxParticipants: room.maxParticipants,
              currentParticipants: room.participants.length,
              timeLeftSec: room.timeLeftSec,
              durationSec: room.durationSec,
            },
            matchedUsers: selectedUsers.map((u) => u.user),
          });
        }
      }

      return {
        roomId: room.id,
        matchedUsers: selectedUsers.map((u) => u.user),
      };
    } catch (error) {
      console.error('Error creating room from match:', error);
      // Hata durumunda kuyruk durumunu koru
      return null;
    }
  }

  /**
   * Kuyruktaki kullanıcıları getir (matching progress için)
   */
  async getQueueUsers() {
    const waitingUsers = await prisma.matchQueue.findMany({
      where: {
        status: 'WAITING',
      },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            gender: true,
            email: true,
          },
        },
      },
      orderBy: {
        createdAt: 'asc',
      },
      take: 8, // İlk 8 kişi
    });

    return waitingUsers.map((q) => ({
      id: q.user.id,
      name: q.user.name,
      gender: q.user.gender,
      email: q.user.email,
    }));
  }
}

export const matchingService = new MatchingService();

