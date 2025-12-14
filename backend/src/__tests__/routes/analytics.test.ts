import request from 'supertest';
import {createApp} from '../../app';
import {createTestUser, cleanupTestData, generateTestToken} from '../utils/testHelpers';
import {prisma} from '../../lib/prisma';

// Mock analytics queue
jest.mock('../../jobs/queue', () => ({
  analyticsQueue: {
    add: jest.fn().mockResolvedValue({}),
  },
}));

describe('Analytics Routes', () => {
  let app: any;
  let user: any;
  let adminUser: any;
  let token: string;
  let adminToken: string;

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
    adminUser = await createTestUser({
      email: 'admin@test.com',
      name: 'Admin User',
      password: 'password123',
      gender: 'male',
    });
    await prisma.user.update({
      where: {id: adminUser.id},
      data: {role: 'admin'},
    });
    token = generateTestToken(user.id);
    adminToken = generateTestToken(adminUser.id);
  });

  afterAll(async () => {
    await cleanupTestData();
    await prisma.$disconnect();
  });

  describe('POST /api/v1/analytics/track', () => {
    it('should track event', async () => {
      const response = await request(app)
        .post('/api/v1/analytics/track')
        .set('Authorization', `Bearer ${token}`)
        .send({
          eventType: 'test_event',
          eventData: {key: 'value'},
        })
        .expect(200);

      expect(response.body.success).toBe(true);
    });

    it('should track anonymous event', async () => {
      const response = await request(app)
        .post('/api/v1/analytics/track')
        .send({
          eventType: 'anonymous_event',
        })
        .expect(200);

      expect(response.body.success).toBe(true);
    });
  });

  describe('GET /api/v1/analytics/stats', () => {
    it('should require admin role', async () => {
      await request(app)
        .get('/api/v1/analytics/stats')
        .set('Authorization', `Bearer ${token}`)
        .expect(403);
    });

    it('should return platform stats for admin', async () => {
      const response = await request(app)
        .get('/api/v1/analytics/stats')
        .set('Authorization', `Bearer ${adminToken}`)
        .expect(200);

      expect(response.body.success).toBe(true);
      expect(response.body.data).toHaveProperty('totalEvents');
    });
  });
});
