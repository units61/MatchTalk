import {Router, Response} from 'express';
import {analyticsService} from '../services/analyticsService';
import {HttpError} from '../errors';
import {AuthRequest} from '../middleware/auth';
import {adminAuth} from '../middleware/adminAuth';
import {z} from 'zod';

const router = Router();

// Track event schema
const trackEventSchema = z.object({
  eventType: z.string().min(1, 'Event type is required'),
  eventData: z.record(z.any()).optional().default({}),
  metadata: z.record(z.any()).optional(),
});

/**
 * POST /analytics/track
 * Track an event (public, rate limited)
 */
router.post('/track', async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.userId || null; // Optional - can track anonymous events
    const validatedData = trackEventSchema.parse(req.body);

    await analyticsService.trackEvent(
      userId,
      validatedData.eventType,
      validatedData.eventData,
      validatedData.metadata,
    );

    res.status(200).json({
      success: true,
      message: 'Event tracked',
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

// Admin routes
router.use(adminAuth);

/**
 * GET /analytics/stats
 * Get platform statistics (admin only)
 */
router.get('/stats', async (req: AuthRequest, res: Response) => {
  try {
    const startDate = req.query.start ? new Date(req.query.start as string) : undefined;
    const endDate = req.query.end ? new Date(req.query.end as string) : undefined;

    const dateRange = startDate && endDate ? {start: startDate, end: endDate} : undefined;
    const stats = await analyticsService.getPlatformStats(dateRange);

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
 * GET /analytics/users/:id
 * Get user statistics (admin only)
 */
router.get('/users/:id', async (req: AuthRequest, res: Response) => {
  try {
    const {id} = req.params;
    const startDate = req.query.start ? new Date(req.query.start as string) : undefined;
    const endDate = req.query.end ? new Date(req.query.end as string) : undefined;

    const dateRange = startDate && endDate ? {start: startDate, end: endDate} : undefined;
    const stats = await analyticsService.getUserStats(id, dateRange);

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
 * GET /analytics/daily-active-users
 * Get daily active users (admin only)
 */
router.get('/daily-active-users', async (req: AuthRequest, res: Response) => {
  try {
    const startDate = req.query.start ? new Date(req.query.start as string) : new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);
    const endDate = req.query.end ? new Date(req.query.end as string) : new Date();

    const stats = await analyticsService.getDailyActiveUsers({
      start: startDate,
      end: endDate,
    });

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
 * GET /analytics/retention
 * Get retention rate (admin only)
 */
router.get('/retention', async (req: AuthRequest, res: Response) => {
  try {
    const startDate = req.query.start ? new Date(req.query.start as string) : new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);
    const endDate = req.query.end ? new Date(req.query.end as string) : new Date();

    const stats = await analyticsService.getRetentionRate({
      start: startDate,
      end: endDate,
    });

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

export const analyticsRouter = router;



