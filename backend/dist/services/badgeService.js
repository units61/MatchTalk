"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.badgeService = exports.BadgeService = exports.XP_REWARDS = void 0;
exports.calculateLevel = calculateLevel;
const prisma_1 = require("../lib/prisma");
const errors_1 = require("../errors");
const logger_1 = require("../logger");
// XP rewards for different actions
exports.XP_REWARDS = {
    ROOM_COMPLETION: 50,
    FRIEND_ADDED: 25,
    INVITE_SENT: 10,
    FIRST_ROOM: 100,
    FIRST_FRIEND: 50,
};
// Level calculation formula: level = floor(sqrt(xp / 100)) + 1
function calculateLevel(xp) {
    return Math.floor(Math.sqrt(xp / 100)) + 1;
}
class BadgeService {
    /**
     * XP hesapla ve kullanıcıya ekle
     */
    async addXP(userId, amount, action) {
        try {
            // Kullanıcıyı getir
            const user = await prisma_1.prisma.user.findUnique({
                where: { id: userId },
                select: { xp: true, level: true },
            });
            if (!user) {
                throw new errors_1.HttpError(404, 'Kullanıcı bulunamadı');
            }
            // Yeni XP ve level hesapla
            const newXP = user.xp + amount;
            const newLevel = calculateLevel(newXP);
            const leveledUp = newLevel > user.level;
            // Kullanıcıyı güncelle
            const updatedUser = await prisma_1.prisma.user.update({
                where: { id: userId },
                data: {
                    xp: newXP,
                    level: newLevel,
                },
                select: {
                    xp: true,
                    level: true,
                },
            });
            logger_1.logger.info(`XP added to user ${userId}: +${amount} (${action}), new XP: ${updatedUser.xp}, new level: ${updatedUser.level}`);
            // Level up olduysa badge kontrolü yap
            if (leveledUp) {
                await this.checkLevelUpBadges(userId, newLevel);
            }
            return {
                xp: updatedUser.xp,
                level: updatedUser.level,
                leveledUp,
            };
        }
        catch (error) {
            if (error instanceof errors_1.HttpError) {
                throw error;
            }
            logger_1.logger.error('Error adding XP:', error);
            throw new errors_1.HttpError(500, 'XP eklenirken bir hata oluştu');
        }
    }
    /**
     * Badge ver
     */
    async awardBadge(userId, badgeId) {
        try {
            // Badge'in var olup olmadığını kontrol et
            const badge = await prisma_1.prisma.badge.findUnique({
                where: { id: badgeId },
            });
            if (!badge) {
                throw new errors_1.HttpError(404, 'Badge bulunamadı');
            }
            // Kullanıcının zaten bu badge'e sahip olup olmadığını kontrol et
            const existingUserBadge = await prisma_1.prisma.userBadge.findUnique({
                where: {
                    userId_badgeId: {
                        userId,
                        badgeId,
                    },
                },
            });
            if (existingUserBadge) {
                logger_1.logger.warn(`User ${userId} already has badge ${badgeId}`);
                return; // Zaten var, hata verme
            }
            // Badge'i ver
            await prisma_1.prisma.userBadge.create({
                data: {
                    userId,
                    badgeId,
                },
            });
            // XP reward varsa ekle
            if (badge.xpReward > 0) {
                await this.addXP(userId, badge.xpReward, `badge-${badge.name}`);
            }
            logger_1.logger.info(`Badge awarded to user ${userId}: ${badge.name}`);
        }
        catch (error) {
            if (error instanceof errors_1.HttpError) {
                throw error;
            }
            logger_1.logger.error('Error awarding badge:', error);
            throw new errors_1.HttpError(500, 'Badge verilirken bir hata oluştu');
        }
    }
    /**
     * Level up badge'lerini kontrol et
     */
    async checkLevelUpBadges(userId, level) {
        try {
            // Level-based badge'leri kontrol et (örnek: Level 5, 10, 20, vb.)
            const levelBadges = await prisma_1.prisma.badge.findMany({
                where: {
                    name: {
                        startsWith: 'Level ',
                    },
                },
            });
            for (const badge of levelBadges) {
                // Badge adından level'ı çıkar (örn: "Level 5" -> 5)
                const badgeLevel = parseInt(badge.name.replace('Level ', ''), 10);
                if (level >= badgeLevel) {
                    await this.awardBadge(userId, badge.id);
                }
            }
        }
        catch (error) {
            logger_1.logger.error('Error checking level up badges:', error);
            // Hata olsa bile devam et
        }
    }
    /**
     * Kullanıcının badge'lerini getir
     */
    async getUserBadges(userId) {
        try {
            const userBadges = await prisma_1.prisma.userBadge.findMany({
                where: { userId },
                include: {
                    badge: true,
                },
                orderBy: {
                    earnedAt: 'desc',
                },
            });
            return userBadges.map(ub => ({
                id: ub.badge.id,
                name: ub.badge.name,
                description: ub.badge.description,
                icon: ub.badge.icon,
                earnedAt: ub.earnedAt,
            }));
        }
        catch (error) {
            logger_1.logger.error('Error getting user badges:', error);
            throw new errors_1.HttpError(500, "Badge'ler alınırken bir hata oluştu");
        }
    }
    /**
     * Tüm badge'leri getir
     */
    async getAllBadges() {
        try {
            const badges = await prisma_1.prisma.badge.findMany({
                orderBy: {
                    createdAt: 'asc',
                },
            });
            return badges;
        }
        catch (error) {
            logger_1.logger.error('Error getting all badges:', error);
            throw new errors_1.HttpError(500, "Badge'ler alınırken bir hata oluştu");
        }
    }
    /**
     * Leaderboard getir
     */
    async getLeaderboard(limit = 100) {
        try {
            const users = await prisma_1.prisma.user.findMany({
                select: {
                    id: true,
                    name: true,
                    avatar: true,
                    xp: true,
                    level: true,
                },
                orderBy: [
                    { level: 'desc' },
                    { xp: 'desc' },
                ],
                take: limit,
            });
            return users.map((user, index) => ({
                rank: index + 1,
                ...user,
            }));
        }
        catch (error) {
            logger_1.logger.error('Error getting leaderboard:', error);
            throw new errors_1.HttpError(500, 'Leaderboard alınırken bir hata oluştu');
        }
    }
    /**
     * Kullanıcı istatistiklerini getir (XP, level, badge sayısı)
     */
    async getUserStats(userId) {
        try {
            const user = await prisma_1.prisma.user.findUnique({
                where: { id: userId },
                select: {
                    xp: true,
                    level: true,
                },
            });
            if (!user) {
                throw new errors_1.HttpError(404, 'Kullanıcı bulunamadı');
            }
            const badgeCount = await prisma_1.prisma.userBadge.count({
                where: { userId },
            });
            // Bir sonraki level için gereken XP
            const nextLevelXP = Math.pow(user.level, 2) * 100;
            const xpForNextLevel = nextLevelXP - user.xp;
            return {
                xp: user.xp,
                level: user.level,
                badgeCount,
                xpForNextLevel,
                nextLevelXP,
            };
        }
        catch (error) {
            if (error instanceof errors_1.HttpError) {
                throw error;
            }
            logger_1.logger.error('Error getting user stats:', error);
            throw new errors_1.HttpError(500, 'İstatistikler alınırken bir hata oluştu');
        }
    }
}
exports.BadgeService = BadgeService;
exports.badgeService = new BadgeService();
//# sourceMappingURL=badgeService.js.map