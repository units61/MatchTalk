import request from 'supertest';
import {createApp} from '../../app';
import {createTestUser, cleanupTestData, generateTestToken} from '../utils/testHelpers';
import {prisma} from '../../lib/prisma';

describe('Badges Routes', () => {
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

  describe('GET /api/v1/badges', () => {
    it('should return all badges', async () => {
      const response = await request(app)
        .get('/api/v1/badges')
        .set('Authorization', `Bearer ${token}`)
        .expect(200);

      expect(response.body.success).toBe(true);
      expect(response.body.data).toBeInstanceOf(Array);
    });

    it('should require authentication', async () => {
      await request(app)
        .get('/api/v1/badges')
        .expect(401);
    });
  });

  describe('GET /api/v1/badges/me', () => {
    it('should return user badges', async () => {
      const response = await request(app)
        .get('/api/v1/badges/me')
        .set('Authorization', `Bearer ${token}`)
        .expect(200);

      expect(response.body.success).toBe(true);
      expect(response.body.data).toBeInstanceOf(Array);
    });
  });

  describe('GET /api/v1/badges/stats', () => {
    it('should return user stats', async () => {
      const response = await request(app)
        .get('/api/v1/badges/stats')
        .set('Authorization', `Bearer ${token}`)
        .expect(200);

      expect(response.body.success).toBe(true);
      expect(response.body.data).toHaveProperty('xp');
      expect(response.body.data).toHaveProperty('level');
      expect(response.body.data).toHaveProperty('badgeCount');
    });
  });

  describe('GET /api/v1/badges/leaderboard', () => {
    it('should return leaderboard', async () => {
      const response = await request(app)
        .get('/api/v1/badges/leaderboard?limit=10')
        .set('Authorization', `Bearer ${token}`)
        .expect(200);

      expect(response.body.success).toBe(true);
      expect(response.body.data).toBeInstanceOf(Array);
    });
  });
});
