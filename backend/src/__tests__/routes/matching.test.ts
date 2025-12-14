import request from 'supertest';
import {createApp} from '../../app';
import {createTestUser, cleanupTestData, generateTestToken} from '../utils/testHelpers';
import {prisma} from '../../lib/prisma';

// Mock Redis
jest.mock('../../lib/redis', () => {
  const {createMockRedis} = require('../mocks/redis.mock');
  return {
    redis: createMockRedis(),
  };
});

// Mock roomsService
jest.mock('../../services/roomsService', () => ({
  roomsService: {
    createRoom: jest.fn().mockResolvedValue({
      id: 'room-123',
      name: 'Matched Room',
      category: 'Eşleştirme',
      maxParticipants: 8,
      currentParticipants: 1,
      timeLeftSec: 0,
      durationSec: 300,
    }),
    joinRoom: jest.fn().mockResolvedValue({}),
  },
}));

// Mock WebSocket
jest.mock('../../websocket/server', () => ({
  emitToUser: jest.fn(),
}));

describe('Matching Routes', () => {
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
    
    // Reset Redis mock
    const mockRedis = require('../../lib/redis').redis;
    mockRedis.clear();
    
    jest.clearAllMocks();
  });

  afterAll(async () => {
    await cleanupTestData();
    await prisma.$disconnect();
  });

  describe('POST /api/v1/matching/join', () => {
    it('should join matching queue successfully', async () => {
      const response = await request(app)
        .post('/api/v1/matching/join')
        .set('Authorization', `Bearer ${token}`)
        .expect(200);

      expect(response.body.success).toBe(true);
      expect(response.body.data.success).toBe(true);
      expect(response.body.data.status).toBe('WAITING');
    });

    it('should require authentication', async () => {
      await request(app)
        .post('/api/v1/matching/join')
        .expect(401);
    });
  });

  describe('POST /api/v1/matching/leave', () => {
    it('should leave matching queue successfully', async () => {
      // Join first
      await request(app)
        .post('/api/v1/matching/join')
        .set('Authorization', `Bearer ${token}`)
        .expect(200);

      // Then leave
      const response = await request(app)
        .post('/api/v1/matching/leave')
        .set('Authorization', `Bearer ${token}`)
        .expect(200);

      expect(response.body.success).toBe(true);
      expect(response.body.data.success).toBe(true);
    });

    it('should require authentication', async () => {
      await request(app)
        .post('/api/v1/matching/leave')
        .expect(401);
    });
  });

  describe('GET /api/v1/matching/status', () => {
    it('should return queue status when in queue', async () => {
      // Join queue first
      await request(app)
        .post('/api/v1/matching/join')
        .set('Authorization', `Bearer ${token}`)
        .expect(200);

      const response = await request(app)
        .get('/api/v1/matching/status')
        .set('Authorization', `Bearer ${token}`)
        .expect(200);

      expect(response.body.success).toBe(true);
      expect(response.body.data.inQueue).toBe(true);
    });

    it('should return not in queue when not in queue', async () => {
      const response = await request(app)
        .get('/api/v1/matching/status')
        .set('Authorization', `Bearer ${token}`)
        .expect(200);

      expect(response.body.success).toBe(true);
      expect(response.body.data.inQueue).toBe(false);
    });

    it('should require authentication', async () => {
      await request(app)
        .get('/api/v1/matching/status')
        .expect(401);
    });
  });

  describe('GET /api/v1/matching/users', () => {
    it('should return queue users', async () => {
      const response = await request(app)
        .get('/api/v1/matching/users')
        .set('Authorization', `Bearer ${token}`)
        .expect(200);

      expect(response.body.success).toBe(true);
      expect(response.body.data).toBeInstanceOf(Array);
    });

    it('should require authentication', async () => {
      await request(app)
        .get('/api/v1/matching/users')
        .expect(401);
    });
  });
});
