"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.invitesRouter = void 0;
const express_1 = require("express");
const prisma_1 = require("../lib/prisma");
const auth_1 = require("../middleware/auth");
const badgeService_1 = require("../services/badgeService");
const router = (0, express_1.Router)();
// Tüm route'lar authentication gerektirir
router.use(auth_1.authMiddleware);
/**
 * POST /invites
 * Davet gönder
 */
router.post('/', async (req, res) => {
    try {
        const userId = req.userId;
        const { roomId, friendId } = req.body;
        if (!roomId || !friendId) {
            return res.status(400).json({
                success: false,
                error: 'roomId ve friendId gerekli',
            });
        }
        // Oda kontrolü
        const room = await prisma_1.prisma.room.findUnique({
            where: { id: roomId },
            include: { participants: true },
        });
        if (!room) {
            return res.status(404).json({
                success: false,
                error: 'Oda bulunamadı',
            });
        }
        // Kullanıcı odada mı kontrol et
        const isParticipant = room.participants.some((p) => p.userId === userId);
        if (!isParticipant) {
            return res.status(403).json({
                success: false,
                error: 'Bu odada değilsiniz',
            });
        }
        // Arkadaş kontrolü
        const friendship = await prisma_1.prisma.friendship.findFirst({
            where: {
                OR: [
                    { userId, friendId },
                    { userId: friendId, friendId: userId },
                ],
            },
        });
        if (!friendship) {
            return res.status(400).json({
                success: false,
                error: 'Bu kullanıcı arkadaşınız değil',
            });
        }
        // Friend'den email al (önce alalım çünkü invite kontrolünde kullanacağız)
        const friend = await prisma_1.prisma.user.findUnique({
            where: { id: friendId },
            select: { email: true },
        });
        if (!friend) {
            return res.status(404).json({
                success: false,
                error: 'Arkadaş bulunamadı',
            });
        }
        // Davet kontrolü (zaten davet gönderilmiş mi)
        const existingInvite = await prisma_1.prisma.invite.findFirst({
            where: {
                inviterId: userId,
                inviteeId: friendId,
                roomId: roomId,
                status: 'PENDING',
            },
        });
        if (existingInvite) {
            return res.status(400).json({
                success: false,
                error: 'Zaten davet gönderilmiş',
            });
        }
        // Davet oluştur
        const invite = await prisma_1.prisma.invite.create({
            data: {
                inviterId: userId,
                inviteeEmail: friend.email,
                inviteeId: friendId,
                roomId: roomId,
                status: 'PENDING',
            },
            include: {
                inviter: {
                    select: {
                        id: true,
                        name: true,
                        email: true,
                    },
                },
                invitee: {
                    select: {
                        id: true,
                        name: true,
                        email: true,
                    },
                },
            },
        });
        // XP ver (davet gönderildi)
        try {
            await badgeService_1.badgeService.addXP(userId, badgeService_1.XP_REWARDS.INVITE_SENT, 'invite-sent');
        }
        catch (error) {
            // XP hatası olsa bile devam et
            console.error('Error adding XP for invite sent:', error);
        }
        res.status(201).json({
            success: true,
            data: invite,
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            error: 'Bir hata oluştu',
        });
    }
});
/**
 * GET /invites
 * Davetleri listele
 */
router.get('/', async (req, res) => {
    try {
        const userId = req.userId;
        // Gelen davetler
        const receivedInvites = await prisma_1.prisma.invite.findMany({
            where: {
                inviteeId: userId,
                status: 'PENDING',
            },
            include: {
                inviter: {
                    select: {
                        id: true,
                        name: true,
                        email: true,
                    },
                },
            },
            orderBy: {
                createdAt: 'desc',
            },
        });
        res.status(200).json({
            success: true,
            data: receivedInvites,
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            error: 'Bir hata oluştu',
        });
    }
});
/**
 * POST /invites/:id/accept
 * Daveti kabul et
 */
router.post('/:id/accept', async (req, res) => {
    try {
        const userId = req.userId;
        const inviteId = req.params.id;
        const invite = await prisma_1.prisma.invite.findUnique({
            where: { id: inviteId },
        });
        if (!invite) {
            return res.status(404).json({
                success: false,
                error: 'Davet bulunamadı',
            });
        }
        if (invite.inviteeId !== userId) {
            return res.status(403).json({
                success: false,
                error: 'Bu davet size ait değil',
            });
        }
        if (invite.status !== 'PENDING') {
            return res.status(400).json({
                success: false,
                error: 'Davet zaten yanıtlanmış',
            });
        }
        // roomId'yi invite'den al
        if (!invite.roomId) {
            return res.status(400).json({
                success: false,
                error: 'Davet geçersiz: roomId bulunamadı',
            });
        }
        // Odaya katıl
        try {
            await prisma_1.prisma.roomParticipant.create({
                data: {
                    userId,
                    roomId: invite.roomId,
                },
            });
        }
        catch (error) {
            // Zaten odada olabilir
            return res.status(400).json({
                success: false,
                error: 'Zaten bu odadasınız',
            });
        }
        // Daveti kabul et olarak işaretle
        await prisma_1.prisma.invite.update({
            where: { id: inviteId },
            data: {
                status: 'ACCEPTED',
                respondedAt: new Date(),
            },
        });
        res.status(200).json({
            success: true,
            data: { roomId: invite.roomId },
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            error: 'Bir hata oluştu',
        });
    }
});
/**
 * POST /invites/:id/reject
 * Daveti reddet
 */
router.post('/:id/reject', async (req, res) => {
    try {
        const userId = req.userId;
        const inviteId = req.params.id;
        const invite = await prisma_1.prisma.invite.findUnique({
            where: { id: inviteId },
        });
        if (!invite) {
            return res.status(404).json({
                success: false,
                error: 'Davet bulunamadı',
            });
        }
        if (invite.inviteeId !== userId) {
            return res.status(403).json({
                success: false,
                error: 'Bu davet size ait değil',
            });
        }
        if (invite.status !== 'PENDING') {
            return res.status(400).json({
                success: false,
                error: 'Davet zaten yanıtlanmış',
            });
        }
        // Daveti reddet olarak işaretle
        await prisma_1.prisma.invite.update({
            where: { id: inviteId },
            data: {
                status: 'REJECTED',
                respondedAt: new Date(),
            },
        });
        res.status(200).json({
            success: true,
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            error: 'Bir hata oluştu',
        });
    }
});
exports.invitesRouter = router;
//# sourceMappingURL=invites.js.map