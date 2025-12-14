import {friendsService} from '../../services/friendsService';
import {createTestUser, cleanupTestData} from '../utils/testHelpers';
import {prisma} from '../../lib/prisma';
import {HttpError} from '../../errors';
import {badgeService} from '../../services/badgeService';

// Mock badgeService
jest.mock('../../services/badgeService', () => ({
  badgeService: {
    addXP: jest.fn().mockResolvedValue({xp: 25, level: 1, leveledUp: false}),
  },
  XP_REWARDS: {
    FRIEND_ADDED: 25,
  },
}));

describe('FriendsService', () => {
  let user1: any;
  let user2: any;
  let user3: any;

  beforeEach(async () => {
    await cleanupTestData();
    user1 = await createTestUser({
      email: 'user1@test.com',
      name: 'User 1',
      password: 'password123',
      gender: 'male',
    });
    user2 = await createTestUser({
      email: 'user2@test.com',
      name: 'User 2',
      password: 'password123',
      gender: 'female',
    });
    user3 = await createTestUser({
      email: 'user3@test.com',
      name: 'User 3',
      password: 'password123',
      gender: 'male',
    });
    jest.clearAllMocks();
  });

  afterAll(async () => {
    await cleanupTestData();
    await prisma.$disconnect();
  });

  describe('addFriend', () => {
    it('should add friend successfully', async () => {
      const result = await friendsService.addFriend(user1.id, {friendId: user2.id});

      expect(result.success).toBe(true);
      expect(result.friend.id).toBe(user2.id);

      // Verify bidirectional friendship was created
      const friendship1 = await prisma.friendship.findUnique({
        where: {
          userId_friendId: {
            userId: user1.id,
            friendId: user2.id,
          },
        },
      });
      const friendship2 = await prisma.friendship.findUnique({
        where: {
          userId_friendId: {
            userId: user2.id,
            friendId: user1.id,
          },
        },
      });

      expect(friendship1).not.toBeNull();
      expect(friendship2).not.toBeNull();

      // Verify XP was awarded
      expect(badgeService.addXP).toHaveBeenCalledWith(user1.id, 25, 'friend-added');
    });

    it('should throw error if trying to add self as friend', async () => {
      await expect(friendsService.addFriend(user1.id, {friendId: user1.id})).rejects.toThrow(HttpError);
      await expect(friendsService.addFriend(user1.id, {friendId: user1.id})).rejects.toThrow('Kendinizi arkadaş olarak ekleyemezsiniz');
    });

    it('should throw error if friend does not exist', async () => {
      const fakeUserId = '00000000-0000-0000-0000-000000000000';

      await expect(friendsService.addFriend(user1.id, {friendId: fakeUserId})).rejects.toThrow(HttpError);
      await expect(friendsService.addFriend(user1.id, {friendId: fakeUserId})).rejects.toThrow('Kullanıcı bulunamadı');
    });

    it('should throw error if already friends', async () => {
      await friendsService.addFriend(user1.id, {friendId: user2.id});

      await expect(friendsService.addFriend(user1.id, {friendId: user2.id})).rejects.toThrow(HttpError);
      await expect(friendsService.addFriend(user1.id, {friendId: user2.id})).rejects.toThrow('Zaten arkadaşsınız');
    });
  });

  describe('getFriends', () => {
    it('should return empty array when user has no friends', async () => {
      const friends = await friendsService.getFriends(user1.id);
      expect(friends).toEqual([]);
    });

    it('should return list of friends', async () => {
      await friendsService.addFriend(user1.id, {friendId: user2.id});
      await friendsService.addFriend(user1.id, {friendId: user3.id});

      const friends = await friendsService.getFriends(user1.id);
      expect(friends).toHaveLength(2);
      expect(friends.map(f => f.friend.id)).toContain(user2.id);
      expect(friends.map(f => f.friend.id)).toContain(user3.id);
    });
  });

  describe('removeFriend', () => {
    it('should remove friend successfully', async () => {
      await friendsService.addFriend(user1.id, {friendId: user2.id});

      const result = await friendsService.removeFriend(user1.id, user2.id);

      expect(result.success).toBe(true);

      // Verify bidirectional friendship was removed
      const friendship1 = await prisma.friendship.findUnique({
        where: {
          userId_friendId: {
            userId: user1.id,
            friendId: user2.id,
          },
        },
      });
      const friendship2 = await prisma.friendship.findUnique({
        where: {
          userId_friendId: {
            userId: user2.id,
            friendId: user1.id,
          },
        },
      });

      expect(friendship1).toBeNull();
      expect(friendship2).toBeNull();
    });

    it('should throw error if friendship does not exist', async () => {
      await expect(friendsService.removeFriend(user1.id, user2.id)).rejects.toThrow(HttpError);
      await expect(friendsService.removeFriend(user1.id, user2.id)).rejects.toThrow('Arkadaşlık bulunamadı');
    });
  });

  describe('searchUsers', () => {
    it('should return users matching query', async () => {
      const results = await friendsService.searchUsers(user1.id, 'User');
      expect(results.length).toBeGreaterThan(0);
      expect(results.some(u => u.id === user2.id)).toBe(true);
    });

    it('should exclude self and friends from results', async () => {
      await friendsService.addFriend(user1.id, {friendId: user2.id});

      const results = await friendsService.searchUsers(user1.id, 'User');
      expect(results.some(u => u.id === user1.id)).toBe(false); // Self excluded
      expect(results.some(u => u.id === user2.id)).toBe(false); // Friend excluded
    });

    it('should return empty array if no matches', async () => {
      const results = await friendsService.searchUsers(user1.id, 'NonExistentUser12345');
      expect(results).toEqual([]);
    });
  });
});
