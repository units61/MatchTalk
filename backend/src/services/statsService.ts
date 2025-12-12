import {prisma} from '../lib/prisma';
import {HttpError} from '../errors';

export class StatsService {
  /**
   * Kullanıcı istatistiklerini hesapla
   */
  async getUserStats(userId: string) {
    // Toplam oda sayısı (katıldığı odalar)
    const totalRooms = await prisma.roomParticipant.count({
      where: {
        userId,
      },
    });

    // Toplam sohbet saati (room durationSec toplamı)
    const roomParticipants = await prisma.roomParticipant.findMany({
      where: {
        userId,
      },
      include: {
        room: {
          select: {
            durationSec: true,
          },
        },
      },
    });

    const totalHours = roomParticipants.reduce((sum, participant) => {
      return sum + (participant.room.durationSec || 0);
    }, 0);

    const totalHoursInMinutes = Math.floor(totalHours / 60);
    const totalHoursFormatted = Math.floor(totalHoursInMinutes / 60);

    // Arkadaş sayısı
    const totalFriends = await prisma.friendship.count({
      where: {
        OR: [
          {userId},
          {friendId: userId},
        ],
      },
    });

    return {
      totalRooms,
      totalHours: totalHoursFormatted,
      totalMinutes: totalHoursInMinutes % 60,
      totalFriends,
    };
  }
}

export const statsService = new StatsService();

