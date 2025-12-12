import {Request, Response, NextFunction} from 'express';
import {ZodError} from 'zod';
import {logger} from '../logger';
import {HttpError} from '../errors';

export const errorHandler = (
  err: unknown,
  _req: Request,
  res: Response,
  _next: NextFunction,
) => {
  if (err instanceof ZodError) {
    return res
      .status(400)
      .json({error: 'Validation failed', details: err.flatten()});
  }

  if (err instanceof HttpError) {
    return res.status(err.status).json({error: err.message});
  }

  const status =
    typeof err === 'object' && err !== null && 'status' in err
      ? Number((err as any).status)
      : 500;
  const message =
    typeof err === 'object' && err !== null && 'message' in err
      ? (err as any).message
      : 'Unexpected error';

  if (status >= 500) {
    logger.error('Unhandled error', err);
  } else {
    logger.warn(`Handled error ${status}`, err);
  }

  res.status(status || 500).json({error: message || 'Server error'});
};

