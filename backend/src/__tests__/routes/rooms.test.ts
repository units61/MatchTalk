import request from 'supertest';
import {createApp} from '../../app';
import {createTestUser, cleanupTestData, createTestRoom, generateTestToken} from '../utils/testHelpers';
import {prisma} from '../../lib/prisma';

describe('Rooms Routes', () => {
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

  describe('GET /api/v1/rooms', () => {
    it('should return active rooms', async () => {
      const room = await createTestRoom(user.id, {
        name: 'Active Room',
        category: 'Test',
      });
      await prisma.room.update({
        where: {id: room.id},
        data: {timeLeftSec: 300},
      });

      const response = await request(app)
        .get('/api/v1/rooms')
        .set('Authorization', `Bearer ${token}`)
        .expect(200);

      expect(response.body.success).toBe(true);
      expect(response.body.data).toBeInstanceOf(Array);
      expect(response.body.data.length).toBeGreaterThan(0);
      expect(response.body.data[0].id).toBe(room.id);
    });

    it('should return empty array when no active rooms', async () => {
      const response = await request(app)
        .get('/api/v1/rooms')
        .set('Authorization', `Bearer ${token}`)
        .expect(200);

      expect(response.body.success).toBe(true);
      expect(response.body.data).toEqual([]);
    });

    it('should require authentication', async () => {
      await request(app)
        .get('/api/v1/rooms')
        .expect(401);
    });
  });

  describe('GET /api/v1/rooms/:id', () => {
    it('should return room details', async () => {
      const room = await createTestRoom(user.id, {
        name: 'Detail Room',
        category: 'Test',
      });

      const response = await request(app)
        .get(`/api/v1/rooms/${room.id}`)
        .set('Authorization', `Bearer ${token}`)
        .expect(200);

      expect(response.body.success).toBe(true);
      expect(response.body.data.id).toBe(room.id);
      expect(response.body.data.name).toBe('Detail Room');
    });

    it('should return 404 for non-existent room', async () => {
      const fakeId = '00000000-0000-0000-0000-000000000000';

      const response = await request(app)
        .get(`/api/v1/rooms/${fakeId}`)
        .set('Authorization', `Bearer ${token}`)
        .expect(404);

      expect(response.body.success).toBe(false);
      expect(response.body.error).toBe('Oda bulunamadı');
    });

    it('should require authentication', async () => {
      const room = await createTestRoom(user.id);

      await request(app)
        .get(`/api/v1/rooms/${room.id}`)
        .expect(401);
    });
  });

  describe('POST /api/v1/rooms', () => {
    it('should create a room successfully', async () => {
      const roomData = {
        name: 'New Room',
        category: 'General',
        maxParticipants: 8,
        durationSec: 300,
      };

      const response = await request(app)
        .post('/api/v1/rooms')
        .set('Authorization', `Bearer ${token}`)
        .send(roomData)
        .expect(201);

      expect(response.body.success).toBe(true);
      expect(response.body.data.name).toBe('New Room');
      expect(response.body.data.category).toBe('General');
      expect(response.body.data.maxParticipants).toBe(8);
    });

    it('should validate required fields', async () => {
      const response = await request(app)
        .post('/api/v1/rooms')
        .set('Authorization', `Bearer ${token}`)
        .send({})
        .expect(400);

      expect(response.body.success).toBe(false);
    });

    it('should require authentication', async () => {
      await request(app)
        .post('/api/v1/rooms')
        .send({
          name: 'Test Room',
          category: 'Test',
        })
        .expect(401);
    });
  });

  describe('POST /api/v1/rooms/:id/join', () => {
    it('should join a room successfully', async () => {
      const room = await createTestRoom(user.id, {
        name: 'Join Test Room',
        category: 'Test',
      });

      const user2 = await createTestUser({
        email: 'user2@test.com',
        name: 'User 2',
        password: 'password123',
        gender: 'female',
      });
      const token2 = generateTestToken(user2.id);

      const response = await request(app)
        .post(`/api/v1/rooms/${room.id}/join`)
        .set('Authorization', `Bearer ${token2}`)
        .expect(200);

      expect(response.body.success).toBe(true);
      expect(response.body.data.currentParticipants).toBe(2);
    });

    it('should return 404 for non-existent room', async () => {
      const fakeId = '00000000-0000-0000-0000-000000000000';

      const response = await request(app)
        .post(`/api/v1/rooms/${fakeId}/join`)
        .set('Authorization', `Bearer ${token}`)
        .expect(404);

      expect(response.body.success).toBe(false);
    });

    it('should require authentication', async () => {
      const room = await createTestRoom(user.id);

      await request(app)
        .post(`/api/v1/rooms/${room.id}/join`)
        .expect(401);
    });
  });

  describe('POST /api/v1/rooms/:id/leave', () => {
    it('should leave a room successfully', async () => {
      const room = await createTestRoom(user.id, {
        name: 'Leave Test Room',
        category: 'Test',
      });

      const response = await request(app)
        .post(`/api/v1/rooms/${room.id}/leave`)
        .set('Authorization', `Bearer ${token}`)
        .expect(200);

      expect(response.body.success).toBe(true);
      expect(response.body.data.success).toBe(true);
    });

    it('should return 404 if user is not in room', async () => {
      const room = await createTestRoom(user.id);
      const user2 = await createTestUser({
        email: 'user2@test.com',
        name: 'User 2',
        password: 'password123',
        gender: 'female',
      });
      const token2 = generateTestToken(user2.id);

      const response = await request(app)
        .post(`/api/v1/rooms/${room.id}/leave`)
        .set('Authorization', `Bearer ${token2}`)
        .expect(404);

      expect(response.body.success).toBe(false);
    });

    it('should require authentication', async () => {
      const room = await createTestRoom(user.id);

      await request(app)
        .post(`/api/v1/rooms/${room.id}/leave`)
        .expect(401);
    });
  });
});
