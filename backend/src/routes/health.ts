import {Router, Response} from 'express';
import {prisma} from '../lib/prisma';
import {redis} from '../lib/redis';
import {logger} from '../logger';

const router = Router();

/**
 * GET /health
 * Basic health check
 */
router.get('/', (_req, res: Response) => {
  res.json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
  });
});

/**
 * GET /health/detailed
 * Detailed health check with database and Redis status
 */
router.get('/detailed', async (_req, res: Response) => {
  const health: {
    status: string;
    timestamp: string;
    uptime: number;
    services: {
      database: {status: string; responseTime?: number; error?: string};
      redis: {status: string; responseTime?: number; error?: string};
    };
    memory: {
      used: number;
      total: number;
      percentage: number;
    };
  } = {
    status: 'ok',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    services: {
      database: {status: 'unknown'},
      redis: {status: 'unknown'},
    },
    memory: {
      used: 0,
      total: 0,
      percentage: 0,
    },
  };

  // Database health check
  try {
    const dbStart = Date.now();
    await prisma.$queryRaw`SELECT 1`;
    const dbResponseTime = Date.now() - dbStart;
    health.services.database = {
      status: 'healthy',
      responseTime: dbResponseTime,
    };
  } catch (error) {
    health.services.database = {
      status: 'unhealthy',
      error: error instanceof Error ? error.message : String(error),
    };
    health.status = 'degraded';
    logger.error('Database health check failed', {error});
  }

  // Redis health check
  try {
    const redisStart = Date.now();
    await redis.ping();
    const redisResponseTime = Date.now() - redisStart;
    health.services.redis = {
      status: 'healthy',
      responseTime: redisResponseTime,
    };
  } catch (error) {
    health.services.redis = {
      status: 'unhealthy',
      error: error instanceof Error ? error.message : String(error),
    };
    // Redis failure doesn't make the service unhealthy, just degraded
    if (health.status === 'ok') {
      health.status = 'degraded';
    }
    logger.warn('Redis health check failed', {error});
  }

  // Memory usage
  const memoryUsage = process.memoryUsage();
  health.memory = {
    used: Math.round(memoryUsage.heapUsed / 1024 / 1024), // MB
    total: Math.round(memoryUsage.heapTotal / 1024 / 1024), // MB
    percentage: Math.round((memoryUsage.heapUsed / memoryUsage.heapTotal) * 100),
  };

  // If database is unhealthy, service is unhealthy
  if (health.services.database.status === 'unhealthy') {
    health.status = 'unhealthy';
    return res.status(503).json(health);
  }

  // If degraded, return 200 but with degraded status
  if (health.status === 'degraded') {
    return res.status(200).json(health);
  }

  res.status(200).json(health);
});

export const healthRouter = router;

