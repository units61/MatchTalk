import {Router, Response} from 'express';
import {metricsService} from '../services/metricsService';
import {HttpError} from '../errors';
import {adminAuth, AuthRequest} from '../middleware/adminAuth';

const router = Router();

// All routes require admin authentication
router.use(adminAuth);

/**
 * GET /metrics
 * Get metrics in Prometheus format (admin only)
 */
router.get('/', async (_req: AuthRequest, res: Response) => {
  try {
    const metrics = await metricsService.getPrometheusMetrics();
    res.setHeader('Content-Type', 'text/plain; version=0.0.4');
    res.status(200).send(metrics);
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
 * GET /metrics/stats
 * Get all endpoint statistics (admin only)
 */
router.get('/stats', async (_req: AuthRequest, res: Response) => {
  try {
    const stats = await metricsService.getAllStats();

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
 * DELETE /metrics
 * Clear all metrics (admin only)
 */
router.delete('/', async (_req: AuthRequest, res: Response) => {
  try {
    await metricsService.clearMetrics();

    res.status(200).json({
      success: true,
      message: 'Metrics cleared',
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

export const metricsRouter = router;
