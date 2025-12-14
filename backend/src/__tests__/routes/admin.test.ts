import request from 'supertest';
import {createApp} from '../../app';
import {createTestUser, cleanupTestData, generateTestToken} from '../utils/testHelpers';
import {prisma} from '../../lib/prisma';

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

describe('Admin Routes', () => {
  let app: any;
  let adminUser: any;
  let regularUser: any;
  let adminToken: string;
  let regularToken: string;

  beforeAll(() => {
    app = createApp();
  });

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

    adminToken = generateTestToken(adminUser.id);
    regularToken = generateTestToken(regularUser.id);
  });

  afterAll(async () => {
    await cleanupTestData();
    await prisma.$disconnect();
  });

  describe('GET /api/v1/admin/users', () => {
    it('should return users for admin', async () => {
      const response = await request(app)
        .get('/api/v1/admin/users')
        .set('Authorization', `Bearer ${adminToken}`)
        .expect(200);

      expect(response.body.success).toBe(true);
      expect(response.body.data.users).toBeInstanceOf(Array);
      expect(response.body.data.pagination).toBeDefined();
    });

    it('should require admin role', async () => {
      await request(app)
        .get('/api/v1/admin/users')
        .set('Authorization', `Bearer ${regularToken}`)
        .expect(403);
    });
  });

  describe('GET /api/v1/admin/system/stats', () => {
    it('should return system stats for admin', async () => {
      const response = await request(app)
        .get('/api/v1/admin/system/stats')
        .set('Authorization', `Bearer ${adminToken}`)
        .expect(200);

      expect(response.body.success).toBe(true);
      expect(response.body.data).toHaveProperty('users');
      expect(response.body.data).toHaveProperty('rooms');
    });
  });

  describe('POST /api/v1/admin/system/cache/clear', () => {
    it('should clear cache for admin', async () => {
      const response = await request(app)
        .post('/api/v1/admin/system/cache/clear')
        .set('Authorization', `Bearer ${adminToken}`)
        .expect(200);

      expect(response.body.success).toBe(true);
    });
  });
});
