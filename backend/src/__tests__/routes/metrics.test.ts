import request from 'supertest';
import {createApp} from '../../app';
import {createTestUser, cleanupTestData, generateTestToken} from '../utils/testHelpers';
import {prisma} from '../../lib/prisma';

// Mock Redis
jest.mock('../../lib/redis', () => {
  const {createMockRedis} = require('../mocks/redis.mock');
  const mockRedis = createMockRedis();
  mockRedis.keys = jest.fn().mockResolvedValue([]);
  mockRedis.zadd = jest.fn().mockResolvedValue(1);
  mockRedis.zremrangebyrank = jest.fn().mockResolvedValue(0);
  return {
    redis: mockRedis,
  };
});

describe('Metrics Routes', () => {
  let app: any;
  let adminUser: any;
  let regularUser: any;
  let adminToken: string;
  let regularToken: string;

  beforeAll(() => {
    app = createApp();
    process.env.ENABLE_METRICS = 'true';
  });

  beforeEach(async () => {
    await cleanupTestData();
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

    regularUser = await createTestUser({
      email: 'user@test.com',
      name: 'Regular User',
      password: 'password123',
      gender: 'female',
    });

    adminToken = generateTestToken(adminUser.id);
    regularToken = generateTestToken(regularUser.id);
  });

  afterAll(async () => {
    await cleanupTestData();
    await prisma.$disconnect();
    delete process.env.ENABLE_METRICS;
  });

  describe('GET /metrics', () => {
    it('should return Prometheus metrics for admin', async () => {
      const response = await request(app)
        .get('/metrics')
        .set('Authorization', `Bearer ${adminToken}`)
        .expect(200);

      expect(response.headers['content-type']).toContain('text/plain');
      expect(response.text).toContain('http_requests_total');
    });

    it('should require admin role', async () => {
      await request(app)
        .get('/metrics')
        .set('Authorization', `Bearer ${regularToken}`)
        .expect(403);
    });
  });

  describe('GET /metrics/stats', () => {
    it('should return endpoint stats for admin', async () => {
      const response = await request(app)
        .get('/metrics/stats')
        .set('Authorization', `Bearer ${adminToken}`)
        .expect(200);

      expect(response.body.success).toBe(true);
      expect(response.body.data).toBeInstanceOf(Object);
    });
  });
});
