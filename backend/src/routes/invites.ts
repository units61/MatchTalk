import {Router, Response} from 'express';
import {prisma} from '../lib/prisma';
import {HttpError} from '../errors';
import {authMiddleware, AuthRequest} from '../middleware/auth';

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
    // Note: Invite model doesn't have roomId, so we check by inviterId, inviteeId, and status
    const existingInvite = await prisma.invite.findFirst({
      where: {
        inviterId: userId,
        inviteeId: friendId,
        inviteeEmail: friend.email,
        status: 'PENDING',
      },
    });

    if (existingInvite) {
      return res.status(400).json({
        success: false,
        error: 'Zaten davet gönderilmiş',
      });
    }

    // Davet oluştur (Invite model'de roomId yok, sadece email ve userId var)
    const invite = await prisma.invite.create({
      data: {
        inviterId: userId,
        inviteeEmail: friend.email,
        inviteeId: friendId,
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

    // Note: Invite model doesn't have roomId field, we'll add it to response
    const inviteWithRoom = {
      ...invite,
      roomId: roomId,
    };

    res.status(201).json({
      success: true,
      data: inviteWithRoom,
    });
  } catch (error) {
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
  } catch (error) {
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

    // Note: Invite model doesn't have roomId field
    // We need to get roomId from request body or add it to Invite model
    // For now, we'll require roomId in request body
    const {roomId} = req.body;

    if (!roomId) {
      return res.status(400).json({
        success: false,
        error: 'roomId gerekli',
      });
    }

    // Odaya katıl
    try {
      await prisma.roomParticipant.create({
        data: {
          userId,
          roomId: roomId,
        },
      });
    } catch (error) {
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
      data: {roomId: roomId},
    });
  } catch (error) {
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
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Bir hata oluştu',
    });
  }
});

export const invitesRouter = router;

