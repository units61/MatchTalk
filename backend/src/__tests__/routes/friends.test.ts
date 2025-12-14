import request from 'supertest';
import {createApp} from '../../app';
import {createTestUser, cleanupTestData, generateTestToken} from '../utils/testHelpers';
import {prisma} from '../../lib/prisma';

describe('Friends Routes', () => {
  let app: any;
  let user1: any;
  let user2: any;
  let token1: string;
  let token2: string;

  beforeAll(() => {
    app = createApp();
  });

  beforeEach(async () => {
    await cleanupTestData();
    user1 = await createTestUser({
      email: 'user1@test.com',
      name: 'User 1',
      password: 'password123',
      gender: 'male',
    });
    user2 = await createTestUser({
      email: 'user2@test.com',
      name: 'User 2',
      password: 'password123',
      gender: 'female',
    });
    token1 = generateTestToken(user1.id);
    token2 = generateTestToken(user2.id);
  });

  afterAll(async () => {
    await cleanupTestData();
    await prisma.$disconnect();
  });

  describe('GET /api/v1/friends', () => {
    it('should return friends list', async () => {
      // Add friend first
      await prisma.friendship.createMany({
        data: [
          {userId: user1.id, friendId: user2.id},
          {userId: user2.id, friendId: user1.id},
        ],
      });

      const response = await request(app)
        .get('/api/v1/friends')
        .set('Authorization', `Bearer ${token1}`)
        .expect(200);

      expect(response.body.success).toBe(true);
      expect(response.body.data).toBeInstanceOf(Array);
      expect(response.body.data.length).toBeGreaterThan(0);
    });

    it('should return empty array when no friends', async () => {
      const response = await request(app)
        .get('/api/v1/friends')
        .set('Authorization', `Bearer ${token1}`)
        .expect(200);

      expect(response.body.success).toBe(true);
      expect(response.body.data).toEqual([]);
    });

    it('should require authentication', async () => {
      await request(app)
        .get('/api/v1/friends')
        .expect(401);
    });
  });

  describe('POST /api/v1/friends', () => {
    it('should add friend successfully', async () => {
      const response = await request(app)
        .post('/api/v1/friends')
        .set('Authorization', `Bearer ${token1}`)
        .send({friendId: user2.id})
        .expect(201);

      expect(response.body.success).toBe(true);
      expect(response.body.data.friend.id).toBe(user2.id);
    });

    it('should require authentication', async () => {
      await request(app)
        .post('/api/v1/friends')
        .send({friendId: user2.id})
        .expect(401);
    });
  });

  describe('DELETE /api/v1/friends/:id', () => {
    it('should remove friend successfully', async () => {
      // Add friend first
      await prisma.friendship.createMany({
        data: [
          {userId: user1.id, friendId: user2.id},
          {userId: user2.id, friendId: user1.id},
        ],
      });

      const response = await request(app)
        .delete(`/api/v1/friends/${user2.id}`)
        .set('Authorization', `Bearer ${token1}`)
        .expect(200);

      expect(response.body.success).toBe(true);
    });

    it('should require authentication', async () => {
      await request(app)
        .delete(`/api/v1/friends/${user2.id}`)
        .expect(401);
    });
  });

  describe('GET /api/v1/friends/search', () => {
    it('should return search results', async () => {
      const response = await request(app)
        .get('/api/v1/friends/search?q=User')
        .set('Authorization', `Bearer ${token1}`)
        .expect(200);

      expect(response.body.success).toBe(true);
      expect(response.body.data).toBeInstanceOf(Array);
    });

    it('should return empty array for empty query', async () => {
      const response = await request(app)
        .get('/api/v1/friends/search?q=')
        .set('Authorization', `Bearer ${token1}`)
        .expect(200);

      expect(response.body.success).toBe(true);
      expect(response.body.data).toEqual([]);
    });
  });
});
