import {matchingService} from '../../services/matchingService';
import {createTestUser, cleanupTestData, createTestUsers, getMockSocketIOServer} from '../utils/testHelpers';
import {prisma} from '../../lib/prisma';
import {HttpError} from '../../errors';
import {roomsService} from '../../services/roomsService';
import {redis} from '../../lib/redis';
import {emitToUser} from '../../websocket/server';

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
    createRoom: jest.fn(),
    joinRoom: jest.fn(),
  },
}));

// Mock WebSocket
jest.mock('../../websocket/server', () => ({
  emitToUser: jest.fn(),
}));

describe('MatchingService', () => {
  let maleUsers: any[];
  let femaleUsers: any[];

  beforeEach(async () => {
    await cleanupTestData();
    
    // Create 8 male and 8 female users for matching tests
    maleUsers = await createTestUsers(8, 'male');
    femaleUsers = await createTestUsers(8, 'female');
    
    // Reset Redis mock
    const mockRedis = require('../../lib/redis').redis;
    mockRedis.clear();
    
    // Set up WebSocket mock
    const mockIO = getMockSocketIOServer();
    matchingService.setIO(mockIO as any);
    
    jest.clearAllMocks();
  });

  afterAll(async () => {
    await cleanupTestData();
    await prisma.$disconnect();
  });

  describe('joinQueue', () => {
    it('should join male queue successfully', async () => {
      const user = maleUsers[0];
      const result = await matchingService.joinQueue(user.id);

      expect(result.success).toBe(true);
      expect(result.status).toBe('WAITING');
      
      // Verify user is in Redis queue
      const mockRedis = require('../../lib/redis').redis;
      const position = await mockRedis.lpos('queue:male', user.id);
      expect(position).not.toBeNull();
    });

    it('should join female queue successfully', async () => {
      const user = femaleUsers[0];
      const result = await matchingService.joinQueue(user.id);

      expect(result.success).toBe(true);
      expect(result.status).toBe('WAITING');
      
      // Verify user is in Redis queue
      const mockRedis = require('../../lib/redis').redis;
      const position = await mockRedis.lpos('queue:female', user.id);
      expect(position).not.toBeNull();
    });

    it('should throw error if user does not exist', async () => {
      const fakeUserId = '00000000-0000-0000-0000-000000000000';

      await expect(matchingService.joinQueue(fakeUserId)).rejects.toThrow(HttpError);
      await expect(matchingService.joinQueue(fakeUserId)).rejects.toThrow('Kullanıcı bulunamadı');
    });

    it('should throw error if user is already in queue', async () => {
      const user = maleUsers[0];
      
      // Join queue first time
      await matchingService.joinQueue(user.id);
      
      // Try to join again
      await expect(matchingService.joinQueue(user.id)).rejects.toThrow(HttpError);
      await expect(matchingService.joinQueue(user.id)).rejects.toThrow('Zaten eşleştirme kuyruğundasınız');
    });

    it('should throw error if user is already in an active room', async () => {
      const user = maleUsers[0];
      
      // Create an active room for user
      const room = await prisma.room.create({
        data: {
          name: 'Active Room',
          category: 'Test',
          maxParticipants: 8,
          durationSec: 300,
          timeLeftSec: 300, // Active
          participants: {
            create: {
              userId: user.id,
            },
          },
        },
      });

      await expect(matchingService.joinQueue(user.id)).rejects.toThrow(HttpError);
      await expect(matchingService.joinQueue(user.id)).rejects.toThrow('Zaten bir odadasınız');
      
      // Cleanup
      await prisma.room.delete({where: {id: room.id}});
    });

    it('should trigger matching when 4 males and 4 females are in queue', async () => {
      const mockRedis = require('../../lib/redis').redis;
      const mockRoomsService = require('../../services/roomsService').roomsService;
      
      // Mock room creation
      const mockRoom = {
        id: 'room-123',
        name: 'Eşleştirme Oda',
        category: 'Eşleştirme',
        maxParticipants: 8,
        durationSec: 300,
        timeLeftSec: 0,
      };
      mockRoomsService.createRoom.mockResolvedValue(mockRoom);
      mockRoomsService.joinRoom.mockResolvedValue({});

      // Add 4 males to queue
      for (let i = 0; i < 4; i++) {
        await matchingService.joinQueue(maleUsers[i].id);
      }

      // Add 4 females to queue (last one should trigger matching)
      for (let i = 0; i < 4; i++) {
        await matchingService.joinQueue(femaleUsers[i].id);
      }

      // Verify room was created
      expect(mockRoomsService.createRoom).toHaveBeenCalled();
      expect(mockRoomsService.joinRoom).toHaveBeenCalledTimes(7); // 7 remaining users (1 already in room)
      
      // Verify queues are empty after matching
      const maleCount = await mockRedis.llen('queue:male');
      const femaleCount = await mockRedis.llen('queue:female');
      expect(maleCount).toBe(0);
      expect(femaleCount).toBe(0);
    });

    it('should not trigger matching with insufficient users', async () => {
      const mockRedis = require('../../lib/redis').redis;
      const mockRoomsService = require('../../services/roomsService').roomsService;

      // Add only 3 males
      for (let i = 0; i < 3; i++) {
        await matchingService.joinQueue(maleUsers[i].id);
      }

      // Add 4 females
      for (let i = 0; i < 4; i++) {
        await matchingService.joinQueue(femaleUsers[i].id);
      }

      // Verify room was NOT created
      expect(mockRoomsService.createRoom).not.toHaveBeenCalled();
      
      // Verify users are still in queue
      const maleCount = await mockRedis.llen('queue:male');
      const femaleCount = await mockRedis.llen('queue:female');
      expect(maleCount).toBe(3);
      expect(femaleCount).toBe(4);
    });
  });

  describe('leaveQueue', () => {
    it('should leave male queue successfully', async () => {
      const user = maleUsers[0];
      const mockRedis = require('../../lib/redis').redis;
      
      // Join queue
      await matchingService.joinQueue(user.id);
      expect(await mockRedis.lpos('queue:male', user.id)).not.toBeNull();
      
      // Leave queue
      const result = await matchingService.leaveQueue(user.id);
      expect(result.success).toBe(true);
      expect(await mockRedis.lpos('queue:male', user.id)).toBeNull();
    });

    it('should leave female queue successfully', async () => {
      const user = femaleUsers[0];
      const mockRedis = require('../../lib/redis').redis;
      
      // Join queue
      await matchingService.joinQueue(user.id);
      expect(await mockRedis.lpos('queue:female', user.id)).not.toBeNull();
      
      // Leave queue
      const result = await matchingService.leaveQueue(user.id);
      expect(result.success).toBe(true);
      expect(await mockRedis.lpos('queue:female', user.id)).toBeNull();
    });

    it('should handle leaving when not in queue (silent success)', async () => {
      const user = maleUsers[0];
      const result = await matchingService.leaveQueue(user.id);
      expect(result.success).toBe(true);
    });
  });

  describe('getQueueStatus', () => {
    it('should return queue status when user is in male queue', async () => {
      const user = maleUsers[0];
      const mockRedis = require('../../lib/redis').redis;
      
      // Add user to queue
      await mockRedis.rpush('queue:male', user.id);
      await mockRedis.rpush('queue:male', maleUsers[1].id); // Add another user
      
      const status = await matchingService.getQueueStatus(user.id);
      
      expect(status.inQueue).toBe(true);
      expect(status.position).toBe(1); // First in queue (1-based)
      expect(status.totalWaiting).toBe(2);
    });

    it('should return queue status when user is in female queue', async () => {
      const user = femaleUsers[0];
      const mockRedis = require('../../lib/redis').redis;
      
      // Add user to queue
      await mockRedis.rpush('queue:female', user.id);
      
      const status = await matchingService.getQueueStatus(user.id);
      
      expect(status.inQueue).toBe(true);
      expect(status.position).toBe(1);
      expect(status.totalWaiting).toBe(1);
    });

    it('should return not in queue when user is not in any queue', async () => {
      const user = maleUsers[0];
      const status = await matchingService.getQueueStatus(user.id);
      
      expect(status.inQueue).toBe(false);
      expect(status.position).toBeNull();
      expect(status.totalWaiting).toBe(0);
    });
  });

  describe('getQueueUsers', () => {
    it('should return users in both queues', async () => {
      const mockRedis = require('../../lib/redis').redis;
      
      // Add users to queues
      await mockRedis.rpush('queue:male', maleUsers[0].id);
      await mockRedis.rpush('queue:male', maleUsers[1].id);
      await mockRedis.rpush('queue:female', femaleUsers[0].id);
      
      const users = await matchingService.getQueueUsers();
      
      expect(users.length).toBeGreaterThan(0);
      const userIds = users.map(u => u.id);
      expect(userIds).toContain(maleUsers[0].id);
      expect(userIds).toContain(maleUsers[1].id);
      expect(userIds).toContain(femaleUsers[0].id);
    });

    it('should return empty array when queues are empty', async () => {
      const users = await matchingService.getQueueUsers();
      expect(users).toEqual([]);
    });
  });
});
