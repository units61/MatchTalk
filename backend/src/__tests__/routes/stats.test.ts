import request from 'supertest';
import {createApp} from '../../app';
import {createTestUser, cleanupTestData, generateTestToken} from '../utils/testHelpers';
import {prisma} from '../../lib/prisma';

describe('Stats Routes', () => {
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

  describe('GET /api/v1/stats', () => {
    it('should return user stats', async () => {
      const response = await request(app)
        .get('/api/v1/stats')
        .set('Authorization', `Bearer ${token}`)
        .expect(200);

      expect(response.body.success).toBe(true);
      expect(response.body.data).toHaveProperty('totalRooms');
      expect(response.body.data).toHaveProperty('totalHours');
      expect(response.body.data).toHaveProperty('totalMinutes');
      expect(response.body.data).toHaveProperty('totalFriends');
    });

    it('should require authentication', async () => {
      await request(app)
        .get('/api/v1/stats')
        .expect(401);
    });
  });
});
