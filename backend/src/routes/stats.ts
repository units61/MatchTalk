import {Router, Response} from 'express';
import {statsService} from '../services/statsService';
import {authMiddleware, AuthRequest} from '../middleware/auth';

const router = Router();

// Tüm route'lar authentication gerektirir
router.use(authMiddleware);

/**
 * GET /stats
 * Kullanıcı istatistiklerini getir
 */
router.get('/', async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.userId!;
    const stats = await statsService.getUserStats(userId);

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

export const statsRouter = router;

