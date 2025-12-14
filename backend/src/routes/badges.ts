import {Router, Response} from 'express';
import {badgeService} from '../services/badgeService';
import {getLeaderboardSchema} from '../schemas/badges';
import {HttpError} from '../errors';
import {authMiddleware, AuthRequest} from '../middleware/auth';

const router = Router();

// Tüm route'lar authentication gerektirir
router.use(authMiddleware);

/**
 * GET /badges
 * Tüm badge'leri getir
 */
router.get('/', async (_req: AuthRequest, res: Response) => {
  try {
    const badges = await badgeService.getAllBadges();

    res.status(200).json({
      success: true,
      data: badges,
    });
  } catch (error) {
    if (error instanceof HttpError) {
      res.status(error.status).json({
        success: false,
        error: error.message,
      });
    } else {
      res.status(500).json({
        success: false,
        error: 'Bir hata oluştu',
      });
    }
  }
});

/**
 * GET /badges/stats
 * Kullanıcının badge istatistiklerini getir
 */
router.get('/stats', async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.userId!;
    const stats = await badgeService.getUserStats(userId);

    res.status(200).json({
      success: true,
      data: stats,
    });
  } catch (error) {
    if (error instanceof HttpError) {
      res.status(error.status).json({
        success: false,
        error: error.message,
      });
    } else {
      res.status(500).json({
        success: false,
        error: 'Bir hata oluştu',
      });
    }
  }
});

/**
 * GET /badges/me
 * Kullanıcının badge'lerini getir
 */
router.get('/me', async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.userId!;
    const badges = await badgeService.getUserBadges(userId);

    res.status(200).json({
      success: true,
      data: badges,
    });
  } catch (error) {
    if (error instanceof HttpError) {
      res.status(error.status).json({
        success: false,
        error: error.message,
      });
    } else {
      res.status(500).json({
        success: false,
        error: 'Bir hata oluştu',
      });
    }
  }
});

/**
 * GET /badges/users/:id
 * Belirli bir kullanıcının badge'lerini getir
 */
router.get('/users/:id', async (req: AuthRequest, res: Response) => {
  try {
    const {id} = req.params;
    const badges = await badgeService.getUserBadges(id);

    res.status(200).json({
      success: true,
      data: badges,
    });
  } catch (error) {
    if (error instanceof HttpError) {
      res.status(error.status).json({
        success: false,
        error: error.message,
      });
    } else {
      res.status(500).json({
        success: false,
        error: 'Bir hata oluştu',
      });
    }
  }
});

/**
 * GET /badges/leaderboard
 * Leaderboard getir
 */
router.get('/leaderboard', async (req: AuthRequest, res: Response) => {
  try {
    const validatedData = getLeaderboardSchema.parse(req.query);
    const leaderboard = await badgeService.getLeaderboard(validatedData.limit);

    res.status(200).json({
      success: true,
      data: leaderboard,
    });
  } catch (error) {
    if (error instanceof HttpError) {
      res.status(error.status).json({
        success: false,
        error: error.message,
      });
    } else if (error instanceof Error) {
      res.status(400).json({
        success: false,
        error: error.message,
      });
    } else {
      res.status(500).json({
        success: false,
        error: 'Bir hata oluştu',
      });
    }
  }
});

export const badgesRouter = router;
