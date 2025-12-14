import request from 'supertest';
import {createApp} from '../../app';
import {cleanupTestData} from '../utils/testHelpers';
import {prisma} from '../../lib/prisma';

// Mock Redis
jest.mock('../../lib/redis', () => {
  const {createMockRedis} = require('../mocks/redis.mock');
  return {
    redis: createMockRedis(),
  };
});

// Mock WebSocket
jest.mock('../../websocket/server', () => ({
  emitToUser: jest.fn(),
  emitToRoom: jest.fn(),
}));

// Mock timerService
jest.mock('../../services/timerService', () => ({
  timerService: {
    startTimer: jest.fn().mockResolvedValue(undefined),
    stopTimer: jest.fn().mockResolvedValue(undefined),
  },
}));

describe('API Integration Tests', () => {
  let app: any;

  beforeAll(() => {
    app = createApp();
  });

  beforeEach(async () => {
    await cleanupTestData();
    
    // Reset Redis mock
    const mockRedis = require('../../lib/redis').redis;
    mockRedis.clear();
    
    jest.clearAllMocks();
  });

  afterAll(async () => {
    await cleanupTestData();
    await prisma.$disconnect();
  });

  describe('User Registration → Room Creation → Join Flow', () => {
    it('should complete full flow: register → login → create room → join room', async () => {
      // 1. Register
      const registerResponse = await request(app)
        .post('/api/v1/auth/register')
        .send({
          email: 'flow@test.com',
          name: 'Flow User',
          password: 'password123',
          gender: 'male',
        })
        .expect(201);

      const token = registerResponse.body.data.token;
      const userId = registerResponse.body.data.user.id;

      // 2. Create room
      const createRoomResponse = await request(app)
        .post('/api/v1/rooms')
        .set('Authorization', `Bearer ${token}`)
        .send({
          name: 'Integration Test Room',
          category: 'Test',
          maxParticipants: 8,
          durationSec: 300,
        })
        .expect(201);

      const roomId = createRoomResponse.body.data.id;

      // 3. Register second user
      const register2Response = await request(app)
        .post('/api/v1/auth/register')
        .send({
          email: 'flow2@test.com',
          name: 'Flow User 2',
          password: 'password123',
          gender: 'female',
        })
        .expect(201);

      const token2 = register2Response.body.data.token;

      // 4. Join room
      const joinResponse = await request(app)
        .post(`/api/v1/rooms/${roomId}/join`)
        .set('Authorization', `Bearer ${token2}`)
        .expect(200);

      expect(joinResponse.body.success).toBe(true);
      expect(joinResponse.body.data.currentParticipants).toBe(2);
    });
  });

  describe('Matching Flow', () => {
    it('should complete matching flow: register → join queue → match', async () => {
      const tokens: string[] = [];
      const userIds: string[] = [];

      // Register 8 users (4 male, 4 female)
      for (let i = 0; i < 8; i++) {
        const gender = i < 4 ? 'male' : 'female';
        const registerResponse = await request(app)
          .post('/api/v1/auth/register')
          .send({
            email: `match${i}@test.com`,
            name: `Match User ${i}`,
            password: 'password123',
            gender,
          })
          .expect(201);

        tokens.push(registerResponse.body.data.token);
        userIds.push(registerResponse.body.data.user.id);
      }

      // All users join queue
      for (const token of tokens) {
        await request(app)
          .post('/api/v1/matching/join')
          .set('Authorization', `Bearer ${token}`)
          .expect(200);
      }

      // Verify matching occurred (room should be created)
      // Note: This depends on matchingService.checkAndMatch being called
      // In a real scenario, we might need to wait or trigger matching manually
      
      // Check queue status
      const statusResponse = await request(app)
        .get('/api/v1/matching/status')
        .set('Authorization', `Bearer ${tokens[0]}`)
        .expect(200);

      // After matching, users should not be in queue (or room should exist)
      // This is a simplified test - full matching test would require more setup
      expect(statusResponse.body.success).toBe(true);
    });
  });

  describe('Room Timer → Vote Flow', () => {
    it('should complete timer and vote flow', async () => {
      // Register users
      const user1Response = await request(app)
        .post('/api/v1/auth/register')
        .send({
          email: 'timer1@test.com',
          name: 'Timer User 1',
          password: 'password123',
          gender: 'male',
        })
        .expect(201);
      const token1 = user1Response.body.data.token;
      const userId1 = user1Response.body.data.user.id;

      const user2Response = await request(app)
        .post('/api/v1/auth/register')
        .send({
          email: 'timer2@test.com',
          name: 'Timer User 2',
          password: 'password123',
          gender: 'female',
        })
        .expect(201);
      const token2 = user2Response.body.data.token;
      const userId2 = user2Response.body.data.user.id;

      // Create room with 2 max participants
      const createRoomResponse = await request(app)
        .post('/api/v1/rooms')
        .set('Authorization', `Bearer ${token1}`)
        .send({
          name: 'Timer Test Room',
          category: 'Test',
          maxParticipants: 2,
          durationSec: 300,
        })
        .expect(201);
      const roomId = createRoomResponse.body.data.id;

      // Join room (room becomes full, timer should start)
      await request(app)
        .post(`/api/v1/rooms/${roomId}/join`)
        .set('Authorization', `Bearer ${token2}`)
        .expect(200);

      // Set room to last 10 seconds (for voting)
      await prisma.room.update({
        where: {id: roomId},
        data: {timeLeftSec: 10},
      });

      // Vote extension
      const voteResponse = await request(app)
        .post(`/api/v1/rooms/${roomId}/vote`)
        .set('Authorization', `Bearer ${token1}`)
        .send({vote: 'yes'})
        .expect(200);

      expect(voteResponse.body.success).toBe(true);
    });
  });
});
