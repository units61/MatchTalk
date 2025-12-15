import {authService} from '../../services/authService';
import {createTestUser, cleanupTestData} from '../utils/testHelpers';
import {prisma} from '../../lib/prisma';

describe('AuthService', () => {
  beforeEach(async () => {
    await cleanupTestData();
  });

  afterAll(async () => {
    await cleanupTestData();
    await prisma.$disconnect();
  });

  describe('register', () => {
    it('should register a new user', async () => {
      const result = await authService.register({
        email: 'test@example.com',
        name: 'Test User',
        password: 'password123',
        gender: 'male',
      });

      expect(result.user).toBeDefined();
      expect(result.user.email).toBe('test@example.com');
      expect(result.token).toBeDefined();
    });

    it('should throw error if email already exists', async () => {
      await createTestUser({
        email: 'test@example.com',
        name: 'Existing User',
        password: 'password123',
        gender: 'male',
      });

      await expect(
        authService.register({
          email: 'test@example.com',
          name: 'New User',
          password: 'password123',
          gender: 'female',
        }),
      ).rejects.toThrow();
    });
  });

  describe('login', () => {
    it('should login with correct credentials', async () => {
      await createTestUser({
        email: 'test@example.com',
        name: 'Test User',
        password: 'password123',
        gender: 'male',
      });

      const result = await authService.login({
        email: 'test@example.com',
        password: 'password123',
      });

      expect(result.user).toBeDefined();
      expect(result.token).toBeDefined();
    });

    it('should throw error with incorrect password', async () => {
      await createTestUser({
        email: 'test@example.com',
        name: 'Test User',
        password: 'password123',
        gender: 'male',
      });

      await expect(
        authService.login({
          email: 'test@example.com',
          password: 'wrongpassword',
        }),
      ).rejects.toThrow();
    });
  });
});


