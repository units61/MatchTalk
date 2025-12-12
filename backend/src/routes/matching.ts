import {Router, Response} from 'express';
import {matchingService} from '../services/matchingService';
import {HttpError} from '../errors';
import {authMiddleware, AuthRequest} from '../middleware/auth';

const router = Router();

// Tüm route'lar authentication gerektirir
router.use(authMiddleware);

/**
 * POST /matching/join
 * Eşleştirme kuyruğuna katılma
 */
router.post('/join', async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.userId!;
    const result = await matchingService.joinQueue(userId);

    res.status(200).json({
      success: true,
      data: result,
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
 * POST /matching/leave
 * Kuyruktan ayrılma
 */
router.post('/leave', async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.userId!;
    const result = await matchingService.leaveQueue(userId);

    res.status(200).json({
      success: true,
      data: result,
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
 * GET /matching/status
 * Kuyruk durumu
 */
router.get('/status', async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.userId!;
    const status = await matchingService.getQueueStatus(userId);

    res.status(200).json({
      success: true,
      data: status,
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
 * GET /matching/users
 * Kuyruktaki kullanıcıları getir (matching progress için)
 */
router.get('/users', async (req: AuthRequest, res: Response) => {
  try {
    const users = await matchingService.getQueueUsers();

    res.status(200).json({
      success: true,
      data: users,
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

export const matchingRouter = router;

