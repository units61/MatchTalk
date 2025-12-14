import {prisma} from '../lib/prisma';
import {HttpError} from '../errors';
import {AddFriendInput} from '../schemas/friends';
import {badgeService, XP_REWARDS} from './badgeService';

export class FriendsService {
  /**
   * Kullanıcının arkadaş listesini getirme
   */
  async getFriends(userId: string) {
    const friendships = await prisma.friendship.findMany({
      where: {
        userId,
      },
      include: {
        friend: {
          select: {
            id: true,
            name: true,
            email: true,
            gender: true,
            createdAt: true,
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    return friendships.map(f => ({
      id: f.id,
      friend: f.friend,
      createdAt: f.createdAt,
    }));
  }

  /**
   * Arkadaş ekleme
   */
  async addFriend(userId: string, input: AddFriendInput) {
    // Kendini ekleyemez
    if (userId === input.friendId) {
      throw new HttpError(400, 'Kendinizi arkadaş olarak ekleyemezsiniz');
    }

    // Arkadaş kullanıcıyı kontrol et
    const friendUser = await prisma.user.findUnique({
      where: {id: input.friendId},
    });

    if (!friendUser) {
      throw new HttpError(404, 'Kullanıcı bulunamadı');
    }

    // Zaten arkadaş mı kontrol et
    const existingFriendship = await prisma.friendship.findFirst({
      where: {
        OR: [
          {userId, friendId: input.friendId},
          {userId: input.friendId, friendId: userId},
        ],
      },
    });

    if (existingFriendship) {
      throw new HttpError(409, 'Zaten arkadaşsınız');
    }

    // Arkadaşlık oluştur (çift yönlü)
    await prisma.friendship.createMany({
      data: [
        {
          userId,
          friendId: input.friendId,
        },
        {
          userId: input.friendId,
          friendId: userId,
        },
      ],
    });

    // XP ver (arkadaş eklendi)
    try {
      await badgeService.addXP(userId, XP_REWARDS.FRIEND_ADDED, 'friend-added');
    } catch (error) {
      // XP hatası olsa bile devam et
      console.error('Error adding XP for friend added:', error);
    }

    return {
      success: true,
      friend: {
        id: friendUser.id,
        name: friendUser.name,
        email: friendUser.email,
        gender: friendUser.gender,
      },
    };
  }

  /**
   * Arkadaşlığı kaldırma
   */
  async removeFriend(userId: string, friendId: string) {
    // Arkadaşlık kontrolü
    const friendship = await prisma.friendship.findFirst({
      where: {
        OR: [
          {userId, friendId},
          {userId: friendId, friendId: userId},
        ],
      },
    });

    if (!friendship) {
      throw new HttpError(404, 'Arkadaşlık bulunamadı');
    }

    // Çift yönlü arkadaşlığı sil
    await prisma.friendship.deleteMany({
      where: {
        OR: [
          {userId, friendId},
          {userId: friendId, friendId: userId},
        ],
      },
    });

    return {success: true};
  }

  /**
   * Kullanıcı arama (arkadaş olmayanlar)
   */
  async searchUsers(userId: string, query: string) {
    // Mevcut arkadaşları al
    const friendships = await prisma.friendship.findMany({
      where: {userId},
      select: {friendId: true},
    });

    const friendIds = friendships.map(f => f.friendId);

    // Kullanıcıları ara (kendisi ve arkadaşları hariç)
    const users = await prisma.user.findMany({
      where: {
        AND: [
          {
            OR: [
              {name: {contains: query, mode: 'insensitive'}},
              {email: {contains: query, mode: 'insensitive'}},
            ],
          },
          {
            id: {
              notIn: [userId, ...friendIds],
            },
          },
        ],
      },
      select: {
        id: true,
        name: true,
        email: true,
        gender: true,
        createdAt: true,
      },
      take: 20,
    });

    return users;
  }
}

export const friendsService = new FriendsService();

