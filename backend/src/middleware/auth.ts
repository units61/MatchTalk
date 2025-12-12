import {Request, Response, NextFunction} from 'express';
import jwt from 'jsonwebtoken';
import {config} from '../config';
import {HttpError} from '../errors';

export interface AuthRequest extends Request {
  userId?: string;
}

export const authMiddleware = (
  req: AuthRequest,
  _res: Response,
  next: NextFunction,
) => {
  const token = req.headers.authorization?.replace('Bearer ', '');

  if (!token) {
    throw new HttpError(401, 'No token provided');
  }

  try {
    const decoded = jwt.verify(token, config.jwtSecret) as {userId: string};
    req.userId = decoded.userId;
    next();
  } catch (error) {
    throw new HttpError(401, 'Invalid token');
  }
};

