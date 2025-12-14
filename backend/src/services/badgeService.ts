import { prisma } from '../lib/prisma';
import { HttpError } from '../errors';
import { logger } from '../logger';

// XP rewards for different actions
export const XP_REWARDS = {
  ROOM_COMPLETION: 50,
  FRIEND_ADDED: 25,
  INVITE_SENT: 10,
  FIRST_ROOM: 100,
  FIRST_FRIEND: 50,
} as const;

// Level calculation formula: level = floor(sqrt(xp / 100)) + 1
export function calculateLevel(xp: number): number {
  return Math.floor(Math.sqrt(xp / 100)) + 1;
}

export class BadgeService {
  /**
   * XP hesapla ve kullanıcıya ekle
   */
  async addXP(userId: string, amount: number, action: string): Promise<{ xp: number; level: number; leveledUp: boolean }> {
    try {
      // Kullanıcıyı getir
      const user = await prisma.user.findUnique({
        where: { id: userId },
        select: { xp: true, level: true },
      });

      if (!user) {
        throw new HttpError(404, 'Kullanıcı bulunamadı');
      }

      // Yeni XP ve level hesapla
      const newXP = user.xp + amount;
      const newLevel = calculateLevel(newXP);
      const leveledUp = newLevel > user.level;

      // Kullanıcıyı güncelle
      const updatedUser = await prisma.user.update({
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

      logger.info(`XP added to user ${userId}: +${amount} (${action}), new XP: ${updatedUser.xp}, new level: ${updatedUser.level}`);

      // Level up olduysa badge kontrolü yap
      if (leveledUp) {
        await this.checkLevelUpBadges(userId, newLevel);
      }

      return {
        xp: updatedUser.xp,
        level: updatedUser.level,
        leveledUp,
      };
    } catch (error) {
      if (error instanceof HttpError) {
        throw error;
      }
      logger.error('Error adding XP:', error);
      throw new HttpError(500, 'XP eklenirken bir hata oluştu');
    }
  }

  /**
   * Badge ver
   */
  async awardBadge(userId: string, badgeId: string): Promise<void> {
    try {
      // Badge'in var olup olmadığını kontrol et
      const badge = await prisma.badge.findUnique({
        where: { id: badgeId },
      });

      if (!badge) {
        throw new HttpError(404, 'Badge bulunamadı');
      }

      // Kullanıcının zaten bu badge'e sahip olup olmadığını kontrol et
      const existingUserBadge = await prisma.userBadge.findUnique({
        where: {
          userId_badgeId: {
            userId,
            badgeId,
          },
        },
      });

      if (existingUserBadge) {
        logger.warn(`User ${userId} already has badge ${badgeId}`);
        return; // Zaten var, hata verme
      }

      // Badge'i ver
      await prisma.userBadge.create({
        data: {
          userId,
          badgeId,
        },
      });

      // XP reward varsa ekle
      if (badge.xpReward > 0) {
        await this.addXP(userId, badge.xpReward, `badge-${badge.name}`);
      }

      logger.info(`Badge awarded to user ${userId}: ${badge.name}`);
    } catch (error) {
      if (error instanceof HttpError) {
        throw error;
      }
      logger.error('Error awarding badge:', error);
      throw new HttpError(500, 'Badge verilirken bir hata oluştu');
    }
  }

  /**
   * Level up badge'lerini kontrol et
   */
  private async checkLevelUpBadges(userId: string, level: number): Promise<void> {
    try {
      // Level-based badge'leri kontrol et (örnek: Level 5, 10, 20, vb.)
      const levelBadges = await prisma.badge.findMany({
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
    } catch (error) {
      logger.error('Error checking level up badges:', error);
      // Hata olsa bile devam et
    }
  }

  /**
   * Kullanıcının badge'lerini getir
   */
  async getUserBadges(userId: string) {
    try {
      const userBadges = await prisma.userBadge.findMany({
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
    } catch (error) {
      logger.error('Error getting user badges:', error);
      throw new HttpError(500, "Badge'ler alınırken bir hata oluştu");
    }
  }

  /**
   * Tüm badge'leri getir
   */
  async getAllBadges() {
    try {
      const badges = await prisma.badge.findMany({
        orderBy: {
          createdAt: 'asc',
        },
      });

      return badges;
    } catch (error) {
      logger.error('Error getting all badges:', error);
      throw new HttpError(500, "Badge'ler alınırken bir hata oluştu");
    }
  }

  /**
   * Leaderboard getir
   */
  async getLeaderboard(limit: number = 100) {
    try {
      const users = await prisma.user.findMany({
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
    } catch (error) {
      logger.error('Error getting leaderboard:', error);
      throw new HttpError(500, 'Leaderboard alınırken bir hata oluştu');
    }
  }

  /**
   * Kullanıcı istatistiklerini getir (XP, level, badge sayısı)
   */
  async getUserStats(userId: string) {
    try {
      const user = await prisma.user.findUnique({
        where: { id: userId },
        select: {
          xp: true,
          level: true,
        },
      });

      if (!user) {
        throw new HttpError(404, 'Kullanıcı bulunamadı');
      }

      const badgeCount = await prisma.userBadge.count({
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
    } catch (error) {
      if (error instanceof HttpError) {
        throw error;
      }
      logger.error('Error getting user stats:', error);
      throw new HttpError(500, 'İstatistikler alınırken bir hata oluştu');
    }
  }
}

export const badgeService = new BadgeService();
