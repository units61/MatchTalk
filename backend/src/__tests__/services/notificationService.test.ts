import {notificationService} from '../../services/notificationService';
import {createTestUser, cleanupTestData, getMockSocketIOServer} from '../utils/testHelpers';
import {prisma} from '../../lib/prisma';
import {HttpError} from '../../errors';
import {emitToUser} from '../../websocket/server';

// Mock WebSocket
jest.mock('../../websocket/server', () => ({
  emitToUser: jest.fn(),
}));

// Mock notification queue
jest.mock('../../jobs/queue', () => ({
  notificationQueue: {
    add: jest.fn().mockResolvedValue({}),
  },
}));

describe('NotificationService', () => {
  let user: any;

  beforeEach(async () => {
    await cleanupTestData();
    user = await createTestUser({
      email: 'user@test.com',
      name: 'Test User',
      password: 'password123',
      gender: 'male',
    });

    // Set up WebSocket mock
    const mockIO = getMockSocketIOServer();
    notificationService.setIO(mockIO as any);

    jest.clearAllMocks();
  });

  afterAll(async () => {
    await cleanupTestData();
    await prisma.$disconnect();
  });

  describe('createNotification', () => {
    it('should create notification successfully', async () => {
      const notification = await notificationService.createNotification(
        user.id,
        'test',
        'Test Title',
        'Test Message',
        {key: 'value'}
      );

      expect(notification.userId).toBe(user.id);
      expect(notification.type).toBe('test');
      expect(notification.title).toBe('Test Title');
      expect(notification.message).toBe('Test Message');
      expect(notification.read).toBe(false);

      // Verify WebSocket event
      expect(emitToUser).toHaveBeenCalledWith(
        expect.anything(),
        user.id,
        'notification',
        expect.objectContaining({
          type: 'test',
          title: 'Test Title',
        })
      );
    });

    it('should create notification without data', async () => {
      const notification = await notificationService.createNotification(
        user.id,
        'test',
        'Title',
        'Message'
      );

      expect(notification.data).toBeNull();
    });
  });

  describe('getUserNotifications', () => {
    it('should return user notifications', async () => {
      await notificationService.createNotification(user.id, 'type1', 'Title 1', 'Message 1');
      await notificationService.createNotification(user.id, 'type2', 'Title 2', 'Message 2');

      const notifications = await notificationService.getUserNotifications(user.id);

      expect(notifications).toHaveLength(2);
      expect(notifications[0].title).toBe('Title 2'); // Most recent first
    });

    it('should respect limit parameter', async () => {
      // Create 5 notifications
      for (let i = 0; i < 5; i++) {
        await notificationService.createNotification(user.id, 'test', `Title ${i}`, 'Message');
      }

      const notifications = await notificationService.getUserNotifications(user.id, 3);
      expect(notifications).toHaveLength(3);
    });

    it('should respect offset parameter', async () => {
      for (let i = 0; i < 5; i++) {
        await notificationService.createNotification(user.id, 'test', `Title ${i}`, 'Message');
      }

      const notifications = await notificationService.getUserNotifications(user.id, 3, 2);
      expect(notifications).toHaveLength(3);
    });
  });

  describe('markAsRead', () => {
    it('should mark notification as read', async () => {
      const notification = await notificationService.createNotification(
        user.id,
        'test',
        'Title',
        'Message'
      );

      const updated = await notificationService.markAsRead(notification.id, user.id);

      expect(updated.read).toBe(true);
    });

    it('should throw error if notification does not exist', async () => {
      const fakeId = '00000000-0000-0000-0000-000000000000';

      await expect(notificationService.markAsRead(fakeId, user.id)).rejects.toThrow(HttpError);
      await expect(notificationService.markAsRead(fakeId, user.id)).rejects.toThrow('Notification not found');
    });

    it('should throw error if user is not owner', async () => {
      const otherUser = await createTestUser({
        email: 'other@test.com',
        name: 'Other User',
        password: 'password123',
        gender: 'female',
      });

      const notification = await notificationService.createNotification(
        user.id,
        'test',
        'Title',
        'Message'
      );

      await expect(notificationService.markAsRead(notification.id, otherUser.id)).rejects.toThrow(HttpError);
      await expect(notificationService.markAsRead(notification.id, otherUser.id)).rejects.toThrow('Not authorized');
    });
  });

  describe('markAllAsRead', () => {
    it('should mark all notifications as read', async () => {
      await notificationService.createNotification(user.id, 'test', 'Title 1', 'Message 1');
      await notificationService.createNotification(user.id, 'test', 'Title 2', 'Message 2');

      const result = await notificationService.markAllAsRead(user.id);

      expect(result.updatedCount).toBe(2);

      const notifications = await notificationService.getUserNotifications(user.id);
      expect(notifications.every(n => n.read)).toBe(true);
    });
  });

  describe('getUnreadCount', () => {
    it('should return unread count', async () => {
      await notificationService.createNotification(user.id, 'test', 'Title 1', 'Message 1');
      await notificationService.createNotification(user.id, 'test', 'Title 2', 'Message 2');
      await notificationService.createNotification(user.id, 'test', 'Title 3', 'Message 3');

      const result = await notificationService.getUnreadCount(user.id);

      expect(result.count).toBe(3);
    });

    it('should return 0 when all notifications are read', async () => {
      await notificationService.createNotification(user.id, 'test', 'Title', 'Message');
      await notificationService.markAllAsRead(user.id);

      const result = await notificationService.getUnreadCount(user.id);
      expect(result.count).toBe(0);
    });
  });

  describe('deleteNotification', () => {
    it('should delete notification successfully', async () => {
      const notification = await notificationService.createNotification(
        user.id,
        'test',
        'Title',
        'Message'
      );

      const result = await notificationService.deleteNotification(notification.id, user.id);

      expect(result.success).toBe(true);

      const deleted = await prisma.notification.findUnique({
        where: {id: notification.id},
      });
      expect(deleted).toBeNull();
    });

    it('should throw error if notification does not exist', async () => {
      const fakeId = '00000000-0000-0000-0000-000000000000';

      await expect(notificationService.deleteNotification(fakeId, user.id)).rejects.toThrow(HttpError);
      await expect(notificationService.deleteNotification(fakeId, user.id)).rejects.toThrow('Notification not found');
    });

    it('should throw error if user is not owner', async () => {
      const otherUser = await createTestUser({
        email: 'other@test.com',
        name: 'Other User',
        password: 'password123',
        gender: 'female',
      });

      const notification = await notificationService.createNotification(
        user.id,
        'test',
        'Title',
        'Message'
      );

      await expect(notificationService.deleteNotification(notification.id, otherUser.id)).rejects.toThrow(HttpError);
      await expect(notificationService.deleteNotification(notification.id, otherUser.id)).rejects.toThrow('Not authorized');
    });
  });
});
