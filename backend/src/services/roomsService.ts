import {prisma} from '../lib/prisma';
import {HttpError} from '../errors';
import {CreateRoomInput, JoinRoomInput} from '../schemas/rooms';
import {timerService} from './timerService';

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

    // Oda oluştur
    const room = await prisma.room.create({
      data: {
        name: input.name,
        category: input.category,
        maxParticipants: input.maxParticipants,
        durationSec: input.durationSec,
        timeLeftSec: input.durationSec,
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
    // Oda kontrolü
    const room = await prisma.room.findUnique({
      where: {id: input.roomId},
      include: {
        participants: true,
      },
    });

    if (!room) {
      throw new HttpError(404, 'Oda bulunamadı');
    }

    if (room.timeLeftSec <= 0) {
      throw new HttpError(400, 'Oda süresi dolmuş');
    }

    if (room.participants.length >= room.maxParticipants) {
      throw new HttpError(400, 'Oda dolu');
    }

    // Kullanıcının zaten odada olup olmadığını kontrol et
    const existingParticipation = room.participants.find(p => p.userId === userId);
    if (existingParticipation) {
      throw new HttpError(400, 'Zaten bu odadasınız');
    }

    // Kullanıcının başka bir odada olup olmadığını kontrol et
    const otherRoomParticipation = await prisma.roomParticipant.findFirst({
      where: {
        userId,
        roomId: {
          not: input.roomId,
        },
        room: {
          timeLeftSec: {
            gt: 0,
          },
        },
      },
    });

    if (otherRoomParticipation) {
      throw new HttpError(400, 'Başka bir odadasınız');
    }

    // Odaya katıl
    await prisma.roomParticipant.create({
      data: {
        userId,
        roomId: input.roomId,
      },
    });

    // Güncellenmiş oda bilgilerini getir
    const updatedRoom = await prisma.room.findUnique({
      where: {id: input.roomId},
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

    if (!updatedRoom) {
      throw new HttpError(500, 'Oda bilgileri alınamadı');
    }

    return {
      id: updatedRoom.id,
      name: updatedRoom.name,
      category: updatedRoom.category,
      maxParticipants: updatedRoom.maxParticipants,
      currentParticipants: updatedRoom.participants.length,
      timeLeftSec: updatedRoom.timeLeftSec,
      durationSec: updatedRoom.durationSec,
      participants: updatedRoom.participants.map(p => ({
        id: p.user.id,
        name: p.user.name,
        gender: p.user.gender,
      })),
      maleCount: updatedRoom.participants.filter(p => p.user.gender === 'male').length,
      femaleCount: updatedRoom.participants.filter(p => p.user.gender === 'female').length,
      createdAt: updatedRoom.createdAt,
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

    // Odadan ayrıl
    await prisma.roomParticipant.delete({
      where: {
        id: participation.id,
      },
    });

    // Eğer odada kimse kalmadıysa odayı sil
    const remainingParticipants = await prisma.roomParticipant.count({
      where: {roomId},
    });

    if (remainingParticipants === 0) {
      await prisma.room.delete({
        where: {id: roomId},
      });
    }

    return {success: true};
  }

  /**
   * Oda detaylarını getirme
   */
  async getRoomById(roomId: string) {
    const room = await prisma.room.findUnique({
      where: {id: roomId},
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

