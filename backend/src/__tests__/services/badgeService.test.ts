import {badgeService, calculateLevel, XP_REWARDS} from '../../services/badgeService';
import {createTestUser, cleanupTestData} from '../utils/testHelpers';
import {prisma} from '../../lib/prisma';
import {HttpError} from '../../errors';

describe('BadgeService', () => {
  let user: any;

  beforeEach(async () => {
    await cleanupTestData();
    user = await createTestUser({
      email: 'user@test.com',
      name: 'Test User',
      password: 'password123',
      gender: 'male',
    });
  });

  afterAll(async () => {
    await cleanupTestData();
    await prisma.$disconnect();
  });

  describe('calculateLevel', () => {
    it('should calculate level 1 for 0 XP', () => {
      expect(calculateLevel(0)).toBe(1);
    });

    it('should calculate level 1 for 99 XP', () => {
      expect(calculateLevel(99)).toBe(1);
    });

    it('should calculate level 2 for 100 XP', () => {
      expect(calculateLevel(100)).toBe(2);
    });

    it('should calculate level 2 for 399 XP', () => {
      expect(calculateLevel(399)).toBe(2);
    });

    it('should calculate level 3 for 400 XP', () => {
      expect(calculateLevel(400)).toBe(3);
    });

    it('should calculate level 5 for 1600 XP', () => {
      expect(calculateLevel(1600)).toBe(5);
    });
  });

  describe('addXP', () => {
    it('should add XP successfully', async () => {
      const result = await badgeService.addXP(user.id, 50, 'test-action');

      expect(result.xp).toBe(50);
      expect(result.level).toBe(1);
      expect(result.leveledUp).toBe(false);

      // Verify in database
      const updatedUser = await prisma.user.findUnique({
        where: {id: user.id},
        select: {xp: true, level: true},
      });
      expect(updatedUser?.xp).toBe(50);
      expect(updatedUser?.level).toBe(1);
    });

    it('should level up when XP threshold is reached', async () => {
      // Set user to 99 XP (just below level 2)
      await prisma.user.update({
        where: {id: user.id},
        data: {xp: 99, level: 1},
      });

      const result = await badgeService.addXP(user.id, 1, 'test-action');

      expect(result.xp).toBe(100);
      expect(result.level).toBe(2);
      expect(result.leveledUp).toBe(true);
    });

    it('should throw error if user does not exist', async () => {
      const fakeUserId = '00000000-0000-0000-0000-000000000000';

      await expect(badgeService.addXP(fakeUserId, 50, 'test-action')).rejects.toThrow(HttpError);
      await expect(badgeService.addXP(fakeUserId, 50, 'test-action')).rejects.toThrow('Kullanıcı bulunamadı');
    });

    it('should handle multiple XP additions', async () => {
      await badgeService.addXP(user.id, 25, 'action1');
      await badgeService.addXP(user.id, 25, 'action2');

      const updatedUser = await prisma.user.findUnique({
        where: {id: user.id},
        select: {xp: true, level: true},
      });
      expect(updatedUser?.xp).toBe(50);
    });
  });

  describe('awardBadge', () => {
    let badge: any;

    beforeEach(async () => {
      // Create a test badge
      badge = await prisma.badge.create({
        data: {
          name: 'Test Badge',
          description: 'A test badge',
          icon: 'test-icon',
          xpReward: 10,
        },
      });
    });

    it('should award badge successfully', async () => {
      await badgeService.awardBadge(user.id, badge.id);

      // Verify badge was awarded
      const userBadge = await prisma.userBadge.findUnique({
        where: {
          userId_badgeId: {
            userId: user.id,
            badgeId: badge.id,
          },
        },
      });
      expect(userBadge).not.toBeNull();

      // Verify XP reward was added
      const updatedUser = await prisma.user.findUnique({
        where: {id: user.id},
        select: {xp: true},
      });
      expect(updatedUser?.xp).toBe(10); // XP reward
    });

    it('should not award badge twice (silent success)', async () => {
      await badgeService.awardBadge(user.id, badge.id);
      await badgeService.awardBadge(user.id, badge.id); // Second time

      // Should only have one badge
      const userBadges = await prisma.userBadge.findMany({
        where: {userId: user.id, badgeId: badge.id},
      });
      expect(userBadges).toHaveLength(1);
    });

    it('should throw error if badge does not exist', async () => {
      const fakeBadgeId = '00000000-0000-0000-0000-000000000000';

      await expect(badgeService.awardBadge(user.id, fakeBadgeId)).rejects.toThrow(HttpError);
      await expect(badgeService.awardBadge(user.id, fakeBadgeId)).rejects.toThrow('Badge bulunamadı');
    });
  });

  describe('getUserBadges', () => {
    let badge1: any;
    let badge2: any;

    beforeEach(async () => {
      badge1 = await prisma.badge.create({
        data: {
          name: 'Badge 1',
          description: 'First badge',
          icon: 'icon1',
          xpReward: 0,
        },
      });
      badge2 = await prisma.badge.create({
        data: {
          name: 'Badge 2',
          description: 'Second badge',
          icon: 'icon2',
          xpReward: 0,
        },
      });
    });

    it('should return empty array when user has no badges', async () => {
      const badges = await badgeService.getUserBadges(user.id);
      expect(badges).toEqual([]);
    });

    it('should return user badges', async () => {
      await badgeService.awardBadge(user.id, badge1.id);
      await badgeService.awardBadge(user.id, badge2.id);

      const badges = await badgeService.getUserBadges(user.id);
      expect(badges).toHaveLength(2);
      expect(badges.map(b => b.name)).toContain('Badge 1');
      expect(badges.map(b => b.name)).toContain('Badge 2');
    });
  });

  describe('getAllBadges', () => {
    it('should return all badges', async () => {
      await prisma.badge.createMany({
        data: [
          {
            name: 'Badge 1',
            description: 'First',
            icon: 'icon1',
            xpReward: 0,
          },
          {
            name: 'Badge 2',
            description: 'Second',
            icon: 'icon2',
            xpReward: 0,
          },
        ],
      });

      const badges = await badgeService.getAllBadges();
      expect(badges.length).toBeGreaterThanOrEqual(2);
    });
  });

  describe('getLeaderboard', () => {
    beforeEach(async () => {
      // Create multiple users with different XP
      const user1 = await createTestUser({
        email: 'user1@test.com',
        name: 'User 1',
        password: 'password123',
        gender: 'male',
      });
      await prisma.user.update({
        where: {id: user1.id},
        data: {xp: 500, level: 3},
      });

      const user2 = await createTestUser({
        email: 'user2@test.com',
        name: 'User 2',
        password: 'password123',
        gender: 'female',
      });
      await prisma.user.update({
        where: {id: user2.id},
        data: {xp: 1000, level: 4},
      });

      await prisma.user.update({
        where: {id: user.id},
        data: {xp: 200, level: 2},
      });
    });

    it('should return leaderboard sorted by level and XP', async () => {
      const leaderboard = await badgeService.getLeaderboard(10);

      expect(leaderboard.length).toBeGreaterThanOrEqual(3);
      // Should be sorted by level desc, then XP desc
      expect(leaderboard[0].level).toBeGreaterThanOrEqual(leaderboard[1].level);
    });

    it('should respect limit parameter', async () => {
      const leaderboard = await badgeService.getLeaderboard(2);
      expect(leaderboard.length).toBeLessThanOrEqual(2);
    });
  });

  describe('getUserStats', () => {
    it('should return user stats', async () => {
      await prisma.user.update({
        where: {id: user.id},
        data: {xp: 100, level: 2},
      });

      const stats = await badgeService.getUserStats(user.id);

      expect(stats.xp).toBe(100);
      expect(stats.level).toBe(2);
      expect(stats.badgeCount).toBe(0);
      expect(stats.xpForNextLevel).toBeGreaterThan(0);
    });

    it('should throw error if user does not exist', async () => {
      const fakeUserId = '00000000-0000-0000-0000-000000000000';

      await expect(badgeService.getUserStats(fakeUserId)).rejects.toThrow(HttpError);
      await expect(badgeService.getUserStats(fakeUserId)).rejects.toThrow('Kullanıcı bulunamadı');
    });
  });
});
