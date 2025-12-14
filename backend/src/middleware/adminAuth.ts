import {Request, Response, NextFunction} from 'express';
import {ForbiddenError} from '../errors';
import {authMiddleware, AuthRequest} from './auth';
import {prisma} from '../lib/prisma';

/**
 * Admin authentication middleware
 * Requires user to be authenticated AND have admin or moderator role
 */
export const adminAuth = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  // First check regular authentication
  await new Promise<void>((resolve, reject) => {
    authMiddleware(req, res, (err) => {
      if (err) {
        reject(err);
      } else {
        resolve();
      }
    });
  });

  const authReq = req as AuthRequest;
  const userId = authReq.userId;

  if (!userId) {
    throw new ForbiddenError('Authentication required');
  }

  try {
    // Get user role
    const user = await prisma.user.findUnique({
      where: {id: userId},
      select: {role: true},
    });

    if (!user) {
      throw new ForbiddenError('User not found');
    }

    // Check if user is admin or moderator
    if (user.role !== 'admin' && user.role !== 'moderator') {
      throw new ForbiddenError('Admin or moderator access required');
    }

    // Add role to request
    (authReq as any).userRole = user.role;

    next();
  } catch (error) {
    if (error instanceof ForbiddenError) {
      return res.status(403).json({
        success: false,
        error: error.message,
        code: 'FORBIDDEN',
      });
    }
    next(error);
  }
};

/**
 * Admin-only middleware (not moderator)
 */
export const adminOnly = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  await adminAuth(req, res, () => {
    const authReq = req as AuthRequest & {userRole?: string};
    if (authReq.userRole !== 'admin') {
      return res.status(403).json({
        success: false,
        error: 'Admin access required',
        code: 'FORBIDDEN',
      });
    }
    next();
  });
};
