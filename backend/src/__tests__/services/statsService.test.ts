import {statsService} from '../../services/statsService';
import {createTestUser, cleanupTestData, createTestRoom} from '../utils/testHelpers';
import {prisma} from '../../lib/prisma';
import {HttpError} from '../../errors';

describe('StatsService', () => {
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

  describe('getUserStats', () => {
    it('should return stats for user with no activity', async () => {
      const stats = await statsService.getUserStats(user.id);

      expect(stats.totalRooms).toBe(0);
      expect(stats.totalHours).toBe(0);
      expect(stats.totalMinutes).toBe(0);
      expect(stats.totalFriends).toBe(0);
    });

    it('should calculate stats correctly', async () => {
      // Create rooms
      const room1 = await createTestRoom(user.id, {
        name: 'Room 1',
        category: 'Test',
        durationSec: 300, // 5 minutes
      });
      const room2 = await createTestRoom(user.id, {
        name: 'Room 2',
        category: 'Test',
        durationSec: 600, // 10 minutes
      });

      // Add friend
      const friend = await createTestUser({
        email: 'friend@test.com',
        name: 'Friend',
        password: 'password123',
        gender: 'female',
      });
      await prisma.friendship.createMany({
        data: [
          {userId: user.id, friendId: friend.id},
          {userId: friend.id, friendId: user.id},
        ],
      });

      const stats = await statsService.getUserStats(user.id);

      expect(stats.totalRooms).toBe(2);
      expect(stats.totalFriends).toBe(1);
      // Total duration: 300 + 600 = 900 seconds = 15 minutes = 0 hours, 15 minutes
      expect(stats.totalMinutes).toBe(15);
      expect(stats.totalHours).toBe(0);
    });
  });
});
