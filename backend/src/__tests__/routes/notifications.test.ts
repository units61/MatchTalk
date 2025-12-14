import request from 'supertest';
import {createApp} from '../../app';
import {createTestUser, cleanupTestData, generateTestToken} from '../utils/testHelpers';
import {prisma} from '../../lib/prisma';
import {notificationService} from '../../services/notificationService';

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

describe('Notifications Routes', () => {
  let app: any;
  let user: any;
  let token: string;

  beforeAll(() => {
    app = createApp();
  });

  beforeEach(async () => {
    await cleanupTestData();
    user = await createTestUser({
      email: 'user@test.com',
      name: 'Test User',
      password: 'password123',
      gender: 'male',
    });
    token = generateTestToken(user.id);
  });

  afterAll(async () => {
    await cleanupTestData();
    await prisma.$disconnect();
  });

  describe('GET /api/v1/notifications', () => {
    it('should return user notifications', async () => {
      await notificationService.createNotification(user.id, 'test', 'Title', 'Message');

      const response = await request(app)
        .get('/api/v1/notifications')
        .set('Authorization', `Bearer ${token}`)
        .expect(200);

      expect(response.body.success).toBe(true);
      expect(response.body.data).toBeInstanceOf(Array);
      expect(response.body.data.length).toBeGreaterThan(0);
    });

    it('should respect limit and offset', async () => {
      // Create multiple notifications
      for (let i = 0; i < 5; i++) {
        await notificationService.createNotification(user.id, 'test', `Title ${i}`, 'Message');
      }

      const response = await request(app)
        .get('/api/v1/notifications?limit=2&offset=1')
        .set('Authorization', `Bearer ${token}`)
        .expect(200);

      expect(response.body.data.length).toBeLessThanOrEqual(2);
    });
  });

  describe('GET /api/v1/notifications/unread-count', () => {
    it('should return unread count', async () => {
      await notificationService.createNotification(user.id, 'test', 'Title', 'Message');

      const response = await request(app)
        .get('/api/v1/notifications/unread-count')
        .set('Authorization', `Bearer ${token}`)
        .expect(200);

      expect(response.body.success).toBe(true);
      expect(response.body.data.count).toBeGreaterThan(0);
    });
  });

  describe('PUT /api/v1/notifications/:id/read', () => {
    it('should mark notification as read', async () => {
      const notification = await notificationService.createNotification(
        user.id,
        'test',
        'Title',
        'Message'
      );

      const response = await request(app)
        .put(`/api/v1/notifications/${notification.id}/read`)
        .set('Authorization', `Bearer ${token}`)
        .expect(200);

      expect(response.body.success).toBe(true);
      expect(response.body.data.read).toBe(true);
    });
  });

  describe('PUT /api/v1/notifications/read-all', () => {
    it('should mark all notifications as read', async () => {
      await notificationService.createNotification(user.id, 'test', 'Title 1', 'Message');
      await notificationService.createNotification(user.id, 'test', 'Title 2', 'Message');

      const response = await request(app)
        .put('/api/v1/notifications/read-all')
        .set('Authorization', `Bearer ${token}`)
        .expect(200);

      expect(response.body.success).toBe(true);
      expect(response.body.data.updatedCount).toBeGreaterThan(0);
    });
  });

  describe('DELETE /api/v1/notifications/:id', () => {
    it('should delete notification', async () => {
      const notification = await notificationService.createNotification(
        user.id,
        'test',
        'Title',
        'Message'
      );

      const response = await request(app)
        .delete(`/api/v1/notifications/${notification.id}`)
        .set('Authorization', `Bearer ${token}`)
        .expect(200);

      expect(response.body.success).toBe(true);
    });
  });
});
