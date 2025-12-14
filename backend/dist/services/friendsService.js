"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.friendsService = exports.FriendsService = void 0;
const prisma_1 = require("../lib/prisma");
const errors_1 = require("../errors");
const badgeService_1 = require("./badgeService");
class FriendsService {
    /**
     * Kullanıcının arkadaş listesini getirme
     */
    async getFriends(userId) {
        const friendships = await prisma_1.prisma.friendship.findMany({
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
    async addFriend(userId, input) {
        // Kendini ekleyemez
        if (userId === input.friendId) {
            throw new errors_1.HttpError(400, 'Kendinizi arkadaş olarak ekleyemezsiniz');
        }
        // Arkadaş kullanıcıyı kontrol et
        const friendUser = await prisma_1.prisma.user.findUnique({
            where: { id: input.friendId },
        });
        if (!friendUser) {
            throw new errors_1.HttpError(404, 'Kullanıcı bulunamadı');
        }
        // Zaten arkadaş mı kontrol et
        const existingFriendship = await prisma_1.prisma.friendship.findFirst({
            where: {
                OR: [
                    { userId, friendId: input.friendId },
                    { userId: input.friendId, friendId: userId },
                ],
            },
        });
        if (existingFriendship) {
            throw new errors_1.HttpError(409, 'Zaten arkadaşsınız');
        }
        // Arkadaşlık oluştur (çift yönlü)
        await prisma_1.prisma.friendship.createMany({
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
            await badgeService_1.badgeService.addXP(userId, badgeService_1.XP_REWARDS.FRIEND_ADDED, 'friend-added');
        }
        catch (error) {
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
    async removeFriend(userId, friendId) {
        // Arkadaşlık kontrolü
        const friendship = await prisma_1.prisma.friendship.findFirst({
            where: {
                OR: [
                    { userId, friendId },
                    { userId: friendId, friendId: userId },
                ],
            },
        });
        if (!friendship) {
            throw new errors_1.HttpError(404, 'Arkadaşlık bulunamadı');
        }
        // Çift yönlü arkadaşlığı sil
        await prisma_1.prisma.friendship.deleteMany({
            where: {
                OR: [
                    { userId, friendId },
                    { userId: friendId, friendId: userId },
                ],
            },
        });
        return { success: true };
    }
    /**
     * Kullanıcı arama (arkadaş olmayanlar)
     */
    async searchUsers(userId, query) {
        // Mevcut arkadaşları al
        const friendships = await prisma_1.prisma.friendship.findMany({
            where: { userId },
            select: { friendId: true },
        });
        const friendIds = friendships.map(f => f.friendId);
        // Kullanıcıları ara (kendisi ve arkadaşları hariç)
        const users = await prisma_1.prisma.user.findMany({
            where: {
                AND: [
                    {
                        OR: [
                            { name: { contains: query, mode: 'insensitive' } },
                            { email: { contains: query, mode: 'insensitive' } },
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
exports.FriendsService = FriendsService;
exports.friendsService = new FriendsService();
//# sourceMappingURL=friendsService.js.map