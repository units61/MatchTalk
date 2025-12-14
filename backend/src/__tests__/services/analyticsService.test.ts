import {analyticsService} from '../../services/analyticsService';
import {createTestUser, cleanupTestData} from '../utils/testHelpers';
import {prisma} from '../../lib/prisma';

// Mock analytics queue
jest.mock('../../jobs/queue', () => ({
  analyticsQueue: {
    add: jest.fn().mockResolvedValue({}),
  },
}));

describe('AnalyticsService', () => {
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

  describe('trackEvent', () => {
    it('should track event successfully', async () => {
      const event = await analyticsService.trackEvent(
        user.id,
        'test_event',
        {key: 'value'},
        {metadata: 'test'}
      );

      expect(event).not.toBeNull();
      expect(event?.eventType).toBe('test_event');
      expect(event?.userId).toBe(user.id);
    });

    it('should track event without user', async () => {
      const event = await analyticsService.trackEvent(
        null,
        'anonymous_event',
        {key: 'value'}
      );

      expect(event).not.toBeNull();
      expect(event?.userId).toBeNull();
    });

    it('should not throw error on failure (silent fail)', async () => {
      // This should not break the flow even if tracking fails
      const event = await analyticsService.trackEvent(
        'invalid-user-id',
        'test_event',
        {}
      );

      // Should return null on error, not throw
      expect(event).toBeNull();
    });
  });

  describe('getUserStats', () => {
    it('should return user statistics', async () => {
      // Track some events
      await analyticsService.trackEvent(user.id, 'room_join', {roomId: 'room-1'});
      await analyticsService.trackEvent(user.id, 'room_join', {roomId: 'room-2'});
      await analyticsService.trackEvent(user.id, 'friend_add', {friendId: 'friend-1'});

      const stats = await analyticsService.getUserStats(user.id);

      expect(stats.totalEvents).toBe(3);
      expect(stats.eventTypes['room_join']).toBe(2);
      expect(stats.eventTypes['friend_add']).toBe(1);
    });

    it('should filter by date range', async () => {
      const start = new Date();
      start.setDate(start.getDate() - 7);
      const end = new Date();

      await analyticsService.trackEvent(user.id, 'test_event', {});

      const stats = await analyticsService.getUserStats(user.id, {start, end});

      expect(stats.dateRange).toBeDefined();
    });
  });

  describe('getPlatformStats', () => {
    it('should return platform statistics', async () => {
      await analyticsService.trackEvent(user.id, 'test_event', {});

      const stats = await analyticsService.getPlatformStats();

      expect(stats.totalEvents).toBeGreaterThan(0);
      expect(stats).toHaveProperty('uniqueUsers');
      expect(stats).toHaveProperty('eventsByType');
    });
  });
});
