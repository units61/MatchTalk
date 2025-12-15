import {Router, Response} from 'express';
import {adminService} from '../../services/adminService';
import {HttpError} from '../../errors';
import {adminAuth, AuthRequest} from '../../middleware/adminAuth';

const router = Router();

// All routes require admin authentication
router.use(adminAuth);

/**
 * GET /admin/system/stats
 * Get system statistics
 */
router.get('/stats', async (_req: AuthRequest, res: Response) => {
  try {
    const stats = await adminService.getSystemStats();

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
 * GET /admin/system/database
 * Get database statistics
 */
router.get('/database', async (_req: AuthRequest, res: Response) => {
  try {
    const stats = await adminService.getDatabaseStats();

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
 * POST /admin/system/cache/clear
 * Clear cache
 */
router.post('/cache/clear', async (_req: AuthRequest, res: Response) => {
  try {
    const result = await adminService.clearCache();

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
 * GET /admin/system/info
 * Get server information
 */
router.get('/info', async (_req: AuthRequest, res: Response) => {
  try {
    const info = await adminService.getServerInfo();

    res.status(200).json({
      success: true,
      data: info,
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
 * GET /admin/system/connections
 * Get active WebSocket connections
 */
router.get('/connections', async (_req: AuthRequest, res: Response) => {
  try {
    const connections = await adminService.getActiveConnections();

    res.status(200).json({
      success: true,
      data: connections,
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

export const adminSystemRouter = router;



