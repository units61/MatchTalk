import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { prisma } from '../lib/prisma';
import { HttpError } from '../errors';
import { CreateRoomInput, JoinRoomInput } from '../schemas/rooms';
import { timerService } from './timerService';

export class RoomsService {
  /**
   * Aktif odaları listeleme
   */
  async getActiveRooms() {
    const rooms = await prisma.room.findMany({
      where: {
        timeLeftSec: {
          gt: 0, // Sadece süresi dolmamış odalar
        },
      },
      include: {
        participants: {
          include: {
            user: {
              select: {
                id: true,
                name: true,
                gender: true,
              },
            },
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    return rooms.map(room => ({
      id: room.id,
      name: room.name,
      category: room.category,
      maxParticipants: room.maxParticipants,
      currentParticipants: room.participants.length,
      timeLeftSec: room.timeLeftSec,
      durationSec: room.durationSec,
      extended: room.extended,
      participants: room.participants.map(p => ({
        id: p.user.id,
        name: p.user.name,
        gender: p.user.gender,
      })),
      maleCount: room.participants.filter(p => p.user.gender === 'male').length,
      femaleCount: room.participants.filter(p => p.user.gender === 'female').length,
      createdAt: room.createdAt,
    }));
  }

  /**
   * Oda oluşturma
   */
  async createRoom(userId: string, input: CreateRoomInput) {
    // Kullanıcının başka bir odada olup olmadığını kontrol et
    const existingParticipation = await prisma.roomParticipant.findFirst({
      where: {
        userId,
        room: {
          timeLeftSec: {
            gt: 0,
          },
        },
      },
    });

    if (existingParticipation) {
      throw new HttpError(400, 'Zaten bir odadasınız');
    }

    // Oda oluştur (timer başlamamış - timeLeftSec = 0)
    const room = await prisma.room.create({
      data: {
        name: input.name,
        category: input.category,
        maxParticipants: input.maxParticipants,
        durationSec: input.durationSec,
        timeLeftSec: 0, // Timer oda dolduğunda başlayacak
        participants: {
          create: {
            userId,
          },
        },
      },
      include: {
        participants: {
          include: {
            user: {
              select: {
                id: true,
                name: true,
                gender: true,
              },
            },
          },
        },
      },
    });

    return {
      id: room.id,
      name: room.name,
      category: room.category,
      maxParticipants: room.maxParticipants,
      currentParticipants: room.participants.length,
      timeLeftSec: room.timeLeftSec,
      durationSec: room.durationSec,
      participants: room.participants.map(p => ({
        id: p.user.id,
        name: p.user.name,
        gender: p.user.gender,
      })),
      maleCount: room.participants.filter(p => p.user.gender === 'male').length,
      femaleCount: room.participants.filter(p => p.user.gender === 'female').length,
      createdAt: room.createdAt,
    };
  }

  /**
   * Odaya katılma
   */
  async joinRoom(userId: string, input: JoinRoomInput) {
    let shouldStartTimer = false;

    const result = await prisma.$transaction(async (tx) => {
      // 1. Odayı kilitle (Concurrency için - Race Condition Önlemi)
      // PostgreSQL "FOR UPDATE" ile bu satırı kilitler, işlem bitene kadar başkası okuyamaz/yazamaz.
      await tx.$executeRaw`SELECT 1 FROM "Room" WHERE id = ${input.roomId} FOR UPDATE`;

      // 2. Oda bilgilerini getir
      const room = await tx.room.findUnique({
        where: { id: input.roomId },
        include: {
          participants: true,
        },
      });

      if (!room) {
        throw new HttpError(404, 'Oda bulunamadı');
      }

      // Validasyonlar
      if (room.timeLeftSec === 0 && room.participants.length === room.maxParticipants) {
        throw new HttpError(400, 'Oda süresi dolmuş');
      }

      if (room.participants.length >= room.maxParticipants) {
        throw new HttpError(400, 'Oda dolu');
      }

      const existingParticipation = room.participants.find(p => p.userId === userId);
      if (existingParticipation) {
        throw new HttpError(400, 'Zaten bu odadasınız');
      }

      // Başka oda kontrolü
      const otherRoomParticipation = await tx.roomParticipant.findFirst({
        where: {
          userId,
          roomId: { not: input.roomId },
          room: { timeLeftSec: { gt: 0 } },
        },
      });

      if (otherRoomParticipation) {
        throw new HttpError(400, 'Başka bir odadasınız');
      }

      // 3. Odaya katıl
      await tx.roomParticipant.create({
        data: {
          userId,
          roomId: input.roomId,
        },
      });

      // 4. Güncel durumu kontrol et (Timer başlatma ihtiyacı var mı?)
      // Create sonrası participant sayısı +1 oldu.
      const currentCount = room.participants.length + 1;

      if (currentCount === room.maxParticipants && room.timeLeftSec === 0) {
        // Timer başlatılmalı
        await tx.room.update({
          where: { id: input.roomId },
          data: { timeLeftSec: room.durationSec },
        });
        shouldStartTimer = true;
      }

      // 5. Return için güncel odayı getir
      return await tx.room.findUnique({
        where: { id: input.roomId },
        include: {
          participants: {
            include: {
              user: {
                select: {
                  id: true,
                  name: true,
                  gender: true,
                },
              },
            },
          },
        },
      });
    });

    if (!result) throw new HttpError(500, 'İşlem başarısız');

    // Transaction başarılı ise ve timer başlatılmalıysa başlat
    if (shouldStartTimer) {
      // Not: startTimer async ama burada await etmemize gerek yok, arka planda çalışsın.
      // Hata yakalama eklenebilir.
      timerService.startTimer(input.roomId).catch(err => console.error('Timer start error:', err));
    }

    return {
      id: result.id,
      name: result.name,
      category: result.category,
      maxParticipants: result.maxParticipants,
      currentParticipants: result.participants.length,
      timeLeftSec: result.timeLeftSec,
      durationSec: result.durationSec,
      participants: result.participants.map(p => ({
        id: p.user.id,
        name: p.user.name,
        gender: p.user.gender,
      })),
      maleCount: result.participants.filter(p => p.user.gender === 'male').length,
      femaleCount: result.participants.filter(p => p.user.gender === 'female').length,
      createdAt: result.createdAt,
    };
  }

  /**
   * Odadan ayrılma
   */
  async leaveRoom(userId: string, roomId: string) {
    // Katılım kontrolü
    const participation = await prisma.roomParticipant.findUnique({
      where: {
        userId_roomId: {
          userId,
          roomId,
        },
      },
    });

    if (!participation) {
      throw new HttpError(404, 'Bu odada değilsiniz');
    }

    // Odadan ayrıl (yarış koşullarında P2025'i yakala)
    try {
      await prisma.roomParticipant.delete({
        where: {
          id: participation.id,
        },
      });
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError && error.code === 'P2025') {
        // Kayıt silinemedi çünkü zaten yok: çağrıyı idempotent hale getir
        throw new HttpError(404, 'Bu odada değilsiniz');
      }
      throw error;
    }

    // Eğer odada kimse kalmadıysa odayı sil
    const remainingParticipants = await prisma.roomParticipant.count({
      where: { roomId },
    });

    if (remainingParticipants === 0) {
      await prisma.room.delete({
        where: { id: roomId },
      });
    }

    return { success: true };
  }

  /**
   * Oda detaylarını getirme
   */
  async getRoomById(roomId: string) {
    const room = await prisma.room.findUnique({
      where: { id: roomId },
      include: {
        participants: {
          include: {
            user: {
              select: {
                id: true,
                name: true,
                gender: true,
              },
            },
          },
        },
      },
    });

    if (!room) {
      throw new HttpError(404, 'Oda bulunamadı');
    }

    return {
      id: room.id,
      name: room.name,
      category: room.category,
      maxParticipants: room.maxParticipants,
      currentParticipants: room.participants.length,
      timeLeftSec: room.timeLeftSec,
      durationSec: room.durationSec,
      extended: room.extended,
      extensionYes: room.extensionYes,
      extensionNo: room.extensionNo,
      participants: room.participants.map(p => ({
        id: p.user.id,
        name: p.user.name,
        gender: p.user.gender,
      })),
      maleCount: room.participants.filter(p => p.user.gender === 'male').length,
      femaleCount: room.participants.filter(p => p.user.gender === 'female').length,
      createdAt: room.createdAt,
    };
  }
}

export const roomsService = new RoomsService();

