import {adminService} from '../../services/adminService';
import {createTestUser, cleanupTestData} from '../utils/testHelpers';
import {prisma} from '../../lib/prisma';
import {HttpError} from '../../errors';
import {cacheService} from '../../services/cacheService';

// Mock cacheService
jest.mock('../../services/cacheService', () => ({
  cacheService: {
    deleteUser: jest.fn().mockResolvedValue(undefined),
    clearAll: jest.fn().mockResolvedValue(undefined),
  },
}));

// Mock WebSocket
jest.mock('../../websocket/server', () => ({
  getIO: jest.fn().mockReturnValue({
    fetchSockets: jest.fn().mockResolvedValue([]),
  }),
  connectionStates: new Map(),
}));

describe('AdminService', () => {
  let adminUser: any;
  let regularUser: any;

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
  });

  afterAll(async () => {
    await cleanupTestData();
    await prisma.$disconnect();
  });

  describe('getAllUsers', () => {
    it('should return all users', async () => {
      const result = await adminService.getAllUsers({});

      expect(result.users).toBeInstanceOf(Array);
      expect(result.users.length).toBeGreaterThan(0);
      expect(result.pagination).toBeDefined();
    });

    it('should filter by search query', async () => {
      const result = await adminService.getAllUsers({search: 'Admin'});

      expect(result.users.some(u => u.name.includes('Admin'))).toBe(true);
    });

    it('should filter by role', async () => {
      const result = await adminService.getAllUsers({role: 'admin'});

      expect(result.users.every(u => u.role === 'admin')).toBe(true);
    });

    it('should respect pagination', async () => {
      const result = await adminService.getAllUsers({limit: 1, offset: 0});

      expect(result.users.length).toBeLessThanOrEqual(1);
      expect(result.pagination.limit).toBe(1);
    });
  });

  describe('getUserById', () => {
    it('should return user details', async () => {
      const user = await adminService.getUserById(regularUser.id);

      expect(user.id).toBe(regularUser.id);
      expect(user.email).toBe(regularUser.email);
      expect(user._count).toBeDefined();
    });

    it('should throw error if user does not exist', async () => {
      const fakeId = '00000000-0000-0000-0000-000000000000';
      await expect(adminService.getUserById(fakeId)).rejects.toThrow(HttpError);
    });
  });

  describe('updateUserRole', () => {
    it('should update user role', async () => {
      const updated = await adminService.updateUserRole(regularUser.id, 'moderator');

      expect(updated.role).toBe('moderator');
      expect(cacheService.deleteUser).toHaveBeenCalledWith(regularUser.id);
    });

    it('should validate role', async () => {
      await expect(adminService.updateUserRole(regularUser.id, 'invalid-role')).rejects.toThrow(HttpError);
    });
  });

  describe('getSystemStats', () => {
    it('should return system statistics', async () => {
      const stats = await adminService.getSystemStats();

      expect(stats).toHaveProperty('users');
      expect(stats).toHaveProperty('rooms');
      expect(stats).toHaveProperty('connections');
      expect(stats).toHaveProperty('uptime');
      expect(stats).toHaveProperty('memory');
    });
  });

  describe('getDatabaseStats', () => {
    it('should return database statistics', async () => {
      const stats = await adminService.getDatabaseStats();

      expect(stats).toHaveProperty('users');
      expect(stats).toHaveProperty('rooms');
      expect(stats).toHaveProperty('friendships');
    });
  });

  describe('clearCache', () => {
    it('should clear cache', async () => {
      const result = await adminService.clearCache();

      expect(result.success).toBe(true);
      expect(cacheService.clearAll).toHaveBeenCalled();
    });
  });
});
