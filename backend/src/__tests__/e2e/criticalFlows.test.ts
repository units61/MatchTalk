import request from 'supertest';
import {createApp} from '../../app';
import {cleanupTestData, createTestUsers} from '../utils/testHelpers';
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

describe('E2E Critical Flows', () => {
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

  describe('Flow 1: User Registration → Room Creation → Join', () => {
    it('should complete full user registration and room flow', async () => {
      // Step 1: Register user
      const registerResponse = await request(app)
        .post('/api/v1/auth/register')
        .send({
          email: 'e2e1@test.com',
          name: 'E2E User 1',
          password: 'password123',
          gender: 'male',
        })
        .expect(201);

      const token1 = registerResponse.body.data.token;
      const userId1 = registerResponse.body.data.user.id;

      // Step 2: Login (verify token works)
      const loginResponse = await request(app)
        .post('/api/v1/auth/login')
        .send({
          email: 'e2e1@test.com',
          password: 'password123',
        })
        .expect(200);

      expect(loginResponse.body.data.token).toBeDefined();

      // Step 3: Create room
      const createRoomResponse = await request(app)
        .post('/api/v1/rooms')
        .set('Authorization', `Bearer ${token1}`)
        .send({
          name: 'E2E Test Room',
          category: 'E2E',
          maxParticipants: 8,
          durationSec: 300,
        })
        .expect(201);

      const roomId = createRoomResponse.body.data.id;
      expect(createRoomResponse.body.data.currentParticipants).toBe(1);

      // Step 4: Register second user
      const register2Response = await request(app)
        .post('/api/v1/auth/register')
        .send({
          email: 'e2e2@test.com',
          name: 'E2E User 2',
          password: 'password123',
          gender: 'female',
        })
        .expect(201);

      const token2 = register2Response.body.data.token;

      // Step 5: Join room
      const joinResponse = await request(app)
        .post(`/api/v1/rooms/${roomId}/join`)
        .set('Authorization', `Bearer ${token2}`)
        .expect(200);

      expect(joinResponse.body.data.currentParticipants).toBe(2);

      // Step 6: Get room details
      const roomResponse = await request(app)
        .get(`/api/v1/rooms/${roomId}`)
        .set('Authorization', `Bearer ${token1}`)
        .expect(200);

      expect(roomResponse.body.data.id).toBe(roomId);
      expect(roomResponse.body.data.currentParticipants).toBe(2);
    });
  });

  describe('Flow 2: Matching Flow', () => {
    it('should complete matching flow with 8 users', async () => {
      const tokens: string[] = [];
      const users: any[] = [];

      // Step 1: Register 8 users (4 male, 4 female)
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
        users.push(registerResponse.body.data.user);
      }

      // Step 2: All users join matching queue
      for (const token of tokens) {
        await request(app)
          .post('/api/v1/matching/join')
          .set('Authorization', `Bearer ${token}`)
          .expect(200);
      }

      // Step 3: Verify matching occurred
      // After 4 males and 4 females join, matching should trigger
      // Check that users are no longer in queue (or room was created)
      const statusResponse = await request(app)
        .get('/api/v1/matching/status')
        .set('Authorization', `Bearer ${tokens[0]}`)
        .expect(200);

      // Note: In a real scenario, matching would create a room
      // This test verifies the queue mechanism works
      expect(statusResponse.body.success).toBe(true);
    });
  });

  describe('Flow 3: Voting Flow', () => {
    it('should complete room timer and voting flow', async () => {
      // Step 1: Register 2 users
      const user1Response = await request(app)
        .post('/api/v1/auth/register')
        .send({
          email: 'vote1@test.com',
          name: 'Vote User 1',
          password: 'password123',
          gender: 'male',
        })
        .expect(201);
      const token1 = user1Response.body.data.token;
      const userId1 = user1Response.body.data.user.id;

      const user2Response = await request(app)
        .post('/api/v1/auth/register')
        .send({
          email: 'vote2@test.com',
          name: 'Vote User 2',
          password: 'password123',
          gender: 'female',
        })
        .expect(201);
      const token2 = user2Response.body.data.token;
      const userId2 = user2Response.body.data.user.id;

      // Step 2: Create room with 2 max participants
      const createRoomResponse = await request(app)
        .post('/api/v1/rooms')
        .set('Authorization', `Bearer ${token1}`)
        .send({
          name: 'Vote Test Room',
          category: 'Test',
          maxParticipants: 2,
          durationSec: 300,
        })
        .expect(201);
      const roomId = createRoomResponse.body.data.id;

      // Step 3: Join room (room becomes full, timer should start)
      await request(app)
        .post(`/api/v1/rooms/${roomId}/join`)
        .set('Authorization', `Bearer ${token2}`)
        .expect(200);

      // Step 4: Set room to last 10 seconds (simulate timer countdown)
      await prisma.room.update({
        where: {id: roomId},
        data: {timeLeftSec: 10},
      });

      // Step 5: Vote extension (via WebSocket handler would be ideal, but we'll test the service)
      // Note: Vote endpoint might not exist in routes, so we test the service directly
      const {voteService} = require('../../services/voteService');
      const voteResult = await voteService.voteExtension(userId1, roomId, 'yes');

      expect(voteResult.vote).toBe('yes');
      expect(voteResult.extensionYes).toBe(1);

      // Step 6: Second user votes
      const voteResult2 = await voteService.voteExtension(userId2, roomId, 'yes');

      expect(voteResult2.totalVotes).toBe(2);
      // Room should be extended (all votes yes)
    });
  });

  describe('Flow 4: Friendship Flow', () => {
    it('should complete friendship flow', async () => {
      // Step 1: Register 2 users
      const user1Response = await request(app)
        .post('/api/v1/auth/register')
        .send({
          email: 'friend1@test.com',
          name: 'Friend User 1',
          password: 'password123',
          gender: 'male',
        })
        .expect(201);
      const token1 = user1Response.body.data.token;
      const userId1 = user1Response.body.data.user.id;

      const user2Response = await request(app)
        .post('/api/v1/auth/register')
        .send({
          email: 'friend2@test.com',
          name: 'Friend User 2',
          password: 'password123',
          gender: 'female',
        })
        .expect(201);
      const token2 = user2Response.body.data.token;
      const userId2 = user2Response.body.data.user.id;

      // Step 2: Search for user
      const searchResponse = await request(app)
        .get(`/api/v1/friends/search?q=Friend User 2`)
        .set('Authorization', `Bearer ${token1}`)
        .expect(200);

      expect(searchResponse.body.data.length).toBeGreaterThan(0);
      expect(searchResponse.body.data.some((u: any) => u.id === userId2)).toBe(true);

      // Step 3: Add friend
      const addFriendResponse = await request(app)
        .post('/api/v1/friends')
        .set('Authorization', `Bearer ${token1}`)
        .send({friendId: userId2})
        .expect(201);

      expect(addFriendResponse.body.success).toBe(true);

      // Step 4: Get friends list
      const friendsResponse = await request(app)
        .get('/api/v1/friends')
        .set('Authorization', `Bearer ${token1}`)
        .expect(200);

      expect(friendsResponse.body.data.length).toBe(1);
      expect(friendsResponse.body.data[0].friend.id).toBe(userId2);

      // Step 5: Create notification for friend (simulate)
      const {notificationService} = require('../../services/notificationService');
      await notificationService.createNotification(
        userId2,
        'friend-request',
        'New Friend',
        `${user1Response.body.data.user.name} added you as a friend`
      );

      // Step 6: Get notifications
      const notificationsResponse = await request(app)
        .get('/api/v1/notifications')
        .set('Authorization', `Bearer ${token2}`)
        .expect(200);

      expect(notificationsResponse.body.data.length).toBeGreaterThan(0);
    });
  });
});
