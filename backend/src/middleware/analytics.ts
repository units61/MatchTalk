import {Request, Response, NextFunction} from 'express';
import {analyticsService} from '../services/analyticsService';
import {AuthRequest} from './auth';

/**
 * Analytics tracking middleware
 * Tracks request events automatically
 */
export const analyticsMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  // Track request (non-blocking)
  const authReq = req as AuthRequest;
  const userId = authReq.userId || null;

  // Track API request
  analyticsService.trackEvent(
    userId,
    'api_request',
    {
      method: req.method,
      path: req.path,
      statusCode: res.statusCode,
    },
    {
      ip: req.ip,
      userAgent: req.get('user-agent'),
    },
  ).catch(() => {
    // Ignore errors - analytics should not break the main flow
  });

  next();
};
