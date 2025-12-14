import {Request, Response, NextFunction} from 'express';
import {metricsService} from '../services/metricsService';

/**
 * Metrics middleware
 * Tracks request/response metrics
 */
export const metricsMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const startTime = Date.now();

  // Override res.end to capture response time
  const originalEnd = res.end;
  res.end = function(chunk?: any, encoding?: any) {
    res.end = originalEnd;
    res.end(chunk, encoding);

    const responseTime = Date.now() - startTime;

    // Record metrics (non-blocking)
    metricsService.recordRequest({
      method: req.method,
      path: req.path,
      statusCode: res.statusCode,
      responseTime,
      timestamp: startTime,
    }).catch(() => {
      // Ignore errors - metrics should not break the main flow
    });
  };

  next();
};
