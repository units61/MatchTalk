import {Router, Response} from 'express';
import {notificationService} from '../services/notificationService';
import {HttpError} from '../errors';
import {authMiddleware, AuthRequest} from '../middleware/auth';

const router = Router();

// Tüm route'lar authentication gerektirir
router.use(authMiddleware);

/**
 * GET /notifications
 * Get user notifications
 */
router.get('/', async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.userId!;
    const limit = parseInt(req.query.limit as string) || 50;
    const offset = parseInt(req.query.offset as string) || 0;

    const notifications = await notificationService.getUserNotifications(userId, limit, offset);

    res.status(200).json({
      success: true,
      data: notifications,
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
 * GET /notifications/unread-count
 * Get unread notification count
 */
router.get('/unread-count', async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.userId!;
    const result = await notificationService.getUnreadCount(userId);

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
 * PUT /notifications/:id/read
 * Mark notification as read
 */
router.put('/:id/read', async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.userId!;
    const {id} = req.params;

    const notification = await notificationService.markAsRead(id, userId);

    res.status(200).json({
      success: true,
      data: {
        ...notification,
        data: notification.data ? JSON.parse(notification.data) : {},
      },
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
 * PUT /notifications/read-all
 * Mark all notifications as read
 */
router.put('/read-all', async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.userId!;
    const result = await notificationService.markAllAsRead(userId);

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
 * DELETE /notifications/:id
 * Delete notification
 */
router.delete('/:id', async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.userId!;
    const {id} = req.params;

    await notificationService.deleteNotification(id, userId);

    res.status(200).json({
      success: true,
      message: 'Notification deleted',
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

export const notificationsRouter = router;

