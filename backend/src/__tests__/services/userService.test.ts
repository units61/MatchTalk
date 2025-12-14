import {userService} from '../../services/userService';
import {createTestUser, cleanupTestData} from '../utils/testHelpers';
import {prisma} from '../../lib/prisma';
import {HttpError} from '../../errors';

describe('UserService', () => {
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

  describe('updateProfile', () => {
    it('should update user name successfully', async () => {
      const updated = await userService.updateProfile(user.id, {
        name: 'Updated Name',
      });

      expect(updated.name).toBe('Updated Name');
    });

    it('should update user avatar successfully', async () => {
      const updated = await userService.updateProfile(user.id, {
        avatar: 'https://example.com/avatar.jpg',
      });

      expect(updated.avatar).toBe('https://example.com/avatar.jpg');
    });

    it('should validate name length', async () => {
      await expect(userService.updateProfile(user.id, {name: 'A'})).rejects.toThrow(HttpError);
      await expect(userService.updateProfile(user.id, {name: 'A'.repeat(51)})).rejects.toThrow(HttpError);
    });

    it('should throw error if no fields to update', async () => {
      await expect(userService.updateProfile(user.id, {})).rejects.toThrow(HttpError);
    });
  });

  describe('changePassword', () => {
    it('should change password successfully', async () => {
      const result = await userService.changePassword(user.id, 'password123', 'newpassword123');

      expect(result.success).toBe(true);

      // Verify new password works
      const updatedUser = await prisma.user.findUnique({
        where: {id: user.id},
        select: {hashedPassword: true},
      });
      const bcrypt = require('bcryptjs');
      const isValid = await bcrypt.compare('newpassword123', updatedUser!.hashedPassword);
      expect(isValid).toBe(true);
    });

    it('should validate new password length', async () => {
      await expect(userService.changePassword(user.id, 'password123', 'short')).rejects.toThrow(HttpError);
      await expect(userService.changePassword(user.id, 'password123', 'a'.repeat(101))).rejects.toThrow(HttpError);
    });

    it('should throw error if old password is incorrect', async () => {
      await expect(userService.changePassword(user.id, 'wrongpassword', 'newpassword123')).rejects.toThrow(HttpError);
    });
  });

  describe('changeEmail', () => {
    it('should change email successfully', async () => {
      const result = await userService.changeEmail(user.id, 'newemail@test.com', 'password123');

      expect(result.success).toBe(true);

      const updatedUser = await prisma.user.findUnique({
        where: {id: user.id},
        select: {email: true},
      });
      expect(updatedUser?.email).toBe('newemail@test.com');
    });

    it('should validate email format', async () => {
      await expect(userService.changeEmail(user.id, 'invalid-email', 'password123')).rejects.toThrow(HttpError);
    });

    it('should throw error if email already exists', async () => {
      const otherUser = await createTestUser({
        email: 'existing@test.com',
        name: 'Other User',
        password: 'password123',
        gender: 'female',
      });

      await expect(userService.changeEmail(user.id, 'existing@test.com', 'password123')).rejects.toThrow(HttpError);
    });

    it('should throw error if password is incorrect', async () => {
      await expect(userService.changeEmail(user.id, 'newemail@test.com', 'wrongpassword')).rejects.toThrow(HttpError);
    });

    it('should throw error if new email is same as current', async () => {
      await expect(userService.changeEmail(user.id, user.email, 'password123')).rejects.toThrow(HttpError);
    });
  });

  describe('getUserProfile', () => {
    it('should return user profile', async () => {
      const profile = await userService.getUserProfile(user.id);

      expect(profile.id).toBe(user.id);
      expect(profile.email).toBe(user.email);
      expect(profile.name).toBe(user.name);
    });

    it('should throw error if user does not exist', async () => {
      const fakeId = '00000000-0000-0000-0000-000000000000';
      await expect(userService.getUserProfile(fakeId)).rejects.toThrow(HttpError);
    });
  });

  describe('getPublicProfile', () => {
    it('should return public profile', async () => {
      const profile = await userService.getPublicProfile(user.id);

      expect(profile.id).toBe(user.id);
      expect(profile.name).toBe(user.name);
      expect(profile).not.toHaveProperty('email'); // Email should not be in public profile
    });
  });
});
