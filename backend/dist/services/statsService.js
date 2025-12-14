"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.statsService = exports.StatsService = void 0;
const prisma_1 = require("../lib/prisma");
class StatsService {
    /**
     * Kullanıcı istatistiklerini hesapla
     */
    async getUserStats(userId) {
        // Toplam oda sayısı (katıldığı odalar)
        const totalRooms = await prisma_1.prisma.roomParticipant.count({
            where: {
                userId,
            },
        });
        // Toplam sohbet saati (room durationSec toplamı)
        const roomParticipants = await prisma_1.prisma.roomParticipant.findMany({
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
        const totalFriends = await prisma_1.prisma.friendship.count({
            where: {
                OR: [
                    { userId },
                    { friendId: userId },
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
exports.StatsService = StatsService;
exports.statsService = new StatsService();
//# sourceMappingURL=statsService.js.map