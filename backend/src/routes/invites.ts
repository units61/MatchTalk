import {Router, Response} from 'express';
import {prisma} from '../lib/prisma';
import {authMiddleware, AuthRequest} from '../middleware/auth';
import {badgeService, XP_REWARDS} from '../services/badgeService';
import {logger} from '../logger';

const router = Router();

// Tüm route'lar authentication gerektirir
router.use(authMiddleware);

/**
 * POST /invites
 * Davet gönder
 */
router.post('/', async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.userId!;
    const {roomId, friendId} = req.body;

    if (!roomId || !friendId) {
      return res.status(400).json({
        success: false,
        error: 'roomId ve friendId gerekli',
      });
    }

    // Oda kontrolü
    const room = await prisma.room.findUnique({
      where: {id: roomId},
      include: {participants: true},
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
    const friendship = await prisma.friendship.findFirst({
      where: {
        OR: [
          {userId, friendId},
          {userId: friendId, friendId: userId},
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
    const friend = await prisma.user.findUnique({
      where: {id: friendId},
      select: {email: true},
    });

    if (!friend) {
      return res.status(404).json({
        success: false,
        error: 'Arkadaş bulunamadı',
      });
    }

    // Davet kontrolü (zaten davet gönderilmiş mi)
    const existingInvite = await prisma.invite.findFirst({
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
    const invite = await prisma.invite.create({
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
      await badgeService.addXP(userId, XP_REWARDS.INVITE_SENT, 'invite-sent');
    } catch (error) {
      // XP hatası olsa bile devam et
      logger.error('Error adding XP for invite sent:', error);
    }

    res.status(201).json({
      success: true,
      data: invite,
    });
  } catch (_error) {
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
router.get('/', async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.userId!;

    // Gelen davetler
    const receivedInvites = await prisma.invite.findMany({
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
  } catch (_error) {
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
router.post('/:id/accept', async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.userId!;
    const inviteId = req.params.id;

    const invite = await prisma.invite.findUnique({
      where: {id: inviteId},
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
      await prisma.roomParticipant.create({
        data: {
          userId,
          roomId: invite.roomId,
        },
      });
    } catch (_error) {
      // Zaten odada olabilir
      return res.status(400).json({
        success: false,
        error: 'Zaten bu odadasınız',
      });
    }

    // Daveti kabul et olarak işaretle
    await prisma.invite.update({
      where: {id: inviteId},
      data: {
        status: 'ACCEPTED',
        respondedAt: new Date(),
      },
    });

    res.status(200).json({
      success: true,
      data: {roomId: invite.roomId},
    });
  } catch (_error) {
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
router.post('/:id/reject', async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.userId!;
    const inviteId = req.params.id;

    const invite = await prisma.invite.findUnique({
      where: {id: inviteId},
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
    await prisma.invite.update({
      where: {id: inviteId},
      data: {
        status: 'REJECTED',
        respondedAt: new Date(),
      },
    });

    res.status(200).json({
      success: true,
    });
  } catch (_error) {
    res.status(500).json({
      success: false,
      error: 'Bir hata oluştu',
    });
  }
});

export const invitesRouter = router;

