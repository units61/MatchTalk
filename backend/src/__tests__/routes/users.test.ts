import request from 'supertest';
import {createApp} from '../../app';
import {createTestUser, cleanupTestData, generateTestToken} from '../utils/testHelpers';
import {prisma} from '../../lib/prisma';

// Mock fileService
jest.mock('../../services/fileService', () => ({
  fileService: {
    saveAvatar: jest.fn().mockResolvedValue('/uploads/avatar.jpg'),
    deleteAvatar: jest.fn().mockResolvedValue(undefined),
  },
}));

describe('Users Routes', () => {
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

  describe('GET /api/v1/users/me', () => {
    it('should return current user profile', async () => {
      const response = await request(app)
        .get('/api/v1/users/me')
        .set('Authorization', `Bearer ${token}`)
        .expect(200);

      expect(response.body.success).toBe(true);
      expect(response.body.data.id).toBe(user.id);
      expect(response.body.data.email).toBe(user.email);
    });

    it('should require authentication', async () => {
      await request(app)
        .get('/api/v1/users/me')
        .expect(401);
    });
  });

  describe('PUT /api/v1/users/profile', () => {
    it('should update user profile', async () => {
      const response = await request(app)
        .put('/api/v1/users/profile')
        .set('Authorization', `Bearer ${token}`)
        .send({
          name: 'Updated Name',
        })
        .expect(200);

      expect(response.body.success).toBe(true);
      expect(response.body.data.name).toBe('Updated Name');
    });

    it('should require authentication', async () => {
      await request(app)
        .put('/api/v1/users/profile')
        .send({name: 'New Name'})
        .expect(401);
    });
  });

  describe('PUT /api/v1/users/password', () => {
    it('should change password successfully', async () => {
      const response = await request(app)
        .put('/api/v1/users/password')
        .set('Authorization', `Bearer ${token}`)
        .send({
          oldPassword: 'password123',
          newPassword: 'newpassword123',
        })
        .expect(200);

      expect(response.body.success).toBe(true);
    });

    it('should validate password requirements', async () => {
      const response = await request(app)
        .put('/api/v1/users/password')
        .set('Authorization', `Bearer ${token}`)
        .send({
          oldPassword: 'password123',
          newPassword: 'short',
        })
        .expect(400);

      expect(response.body.success).toBe(false);
    });
  });

  describe('PUT /api/v1/users/email', () => {
    it('should change email successfully', async () => {
      const response = await request(app)
        .put('/api/v1/users/email')
        .set('Authorization', `Bearer ${token}`)
        .send({
          newEmail: 'newemail@test.com',
          password: 'password123',
        })
        .expect(200);

      expect(response.body.success).toBe(true);
    });

    it('should validate email format', async () => {
      const response = await request(app)
        .put('/api/v1/users/email')
        .set('Authorization', `Bearer ${token}`)
        .send({
          newEmail: 'invalid-email',
          password: 'password123',
        })
        .expect(400);

      expect(response.body.success).toBe(false);
    });
  });
});
