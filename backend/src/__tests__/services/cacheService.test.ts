import {cacheService} from '../../services/cacheService';
import {createTestUser, cleanupTestData} from '../utils/testHelpers';
import {prisma} from '../../lib/prisma';

// Mock Redis
jest.mock('../../lib/redis', () => {
  const {createMockRedis} = require('../mocks/redis.mock');
  const mockRedis = createMockRedis();
  // Add setex method
  mockRedis.setex = jest.fn().mockImplementation(async (key: string, seconds: number, value: string) => {
    await mockRedis.set(key, value);
    return 'OK';
  });
  // Add keys method
  mockRedis.keys = jest.fn().mockResolvedValue([]);
  // Add flushdb method
  mockRedis.flushdb = jest.fn().mockResolvedValue('OK');
  // Add zadd, zremrangebyrank for metrics
  mockRedis.zadd = jest.fn().mockResolvedValue(1);
  mockRedis.zremrangebyrank = jest.fn().mockResolvedValue(0);
  return {
    redis: mockRedis,
  };
});

describe('CacheService', () => {
  let user: any;

  beforeEach(async () => {
    await cleanupTestData();
    user = await createTestUser({
      email: 'user@test.com',
      name: 'Test User',
      password: 'password123',
      gender: 'male',
    });
  });

  afterAll(async () => {
    await cleanupTestData();
    await prisma.$disconnect();
  });

  describe('get and set', () => {
    it('should set and get value', async () => {
      const testData = {key: 'value'};
      await cacheService.set('test:key', testData);

      const result = await cacheService.get('test:key');
      expect(result).toEqual(testData);
    });

    it('should return null for non-existent key', async () => {
      const result = await cacheService.get('test:nonexistent');
      expect(result).toBeNull();
    });
  });

  describe('User cache', () => {
    it('should cache user data', async () => {
      const userData = {id: user.id, name: user.name};
      await cacheService.setUser(user.id, userData);

      const cached = await cacheService.getUser(user.id);
      expect(cached).toEqual(userData);
    });

    it('should delete user cache', async () => {
      await cacheService.setUser(user.id, {id: user.id});
      await cacheService.deleteUser(user.id);

      const cached = await cacheService.getUser(user.id);
      expect(cached).toBeNull();
    });
  });

  describe('Room cache', () => {
    it('should cache room data', async () => {
      const roomData = {id: 'room-123', name: 'Test Room'};
      await cacheService.setRoom('room-123', roomData);

      const cached = await cacheService.getRoom('room-123');
      expect(cached).toEqual(roomData);
    });
  });

  describe('clearAll', () => {
    it('should clear all cache', async () => {
      await cacheService.set('test:key1', {value: 1});
      await cacheService.set('test:key2', {value: 2});

      await cacheService.clearAll();

      // After clearAll, cache should be empty
      const mockRedis = require('../../lib/redis').redis;
      expect(mockRedis.flushdb).toHaveBeenCalled();
    });
  });
});
