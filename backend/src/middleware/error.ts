import {Request, Response, NextFunction} from 'express';
import {ZodError} from 'zod';
import {logger} from '../logger';
import {HttpError, ErrorCode} from '../errors';
import {config} from '../config';

/**
 * Standardized error response format
 */
interface ErrorResponse {
  success: false;
  error: string;
  code?: string;
  details?: any;
  stack?: string;
}

/**
 * Error handler middleware
 */
export const errorHandler = (
  err: unknown,
  req: Request,
  res: Response,
  _next: NextFunction,
) => {
  // Zod validation errors
  if (err instanceof ZodError) {
    const firstError = err.errors[0];
    const errorMessage = firstError 
      ? `${firstError.path.join('.')}: ${firstError.message}`
      : 'Geçersiz giriş bilgileri';
    
    const response: ErrorResponse = {
      success: false,
      error: errorMessage,
      code: ErrorCode.VALIDATION_ERROR,
      details: config.nodeEnv === 'development' ? err.errors : undefined,
    };

    logger.warn(`Validation error: ${errorMessage}`, {
      path: req.path,
      method: req.method,
      errors: err.errors,
    });

    return res.status(400).json(response);
  }

  // HttpError instances
  if (err instanceof HttpError) {
    const response: ErrorResponse = {
      success: false,
      error: err.message,
      code: err.code,
      details: err.details,
    };

    // Include stack trace in development
    if (config.nodeEnv === 'development' && err.stack) {
      response.stack = err.stack;
    }

    // Log based on status code
    if (err.status >= 500) {
      logger.error(`Server error (${err.status}): ${err.message}`, {
        path: req.path,
        method: req.method,
        code: err.code,
        stack: err.stack,
      });
    } else {
      logger.warn(`Client error (${err.status}): ${err.message}`, {
        path: req.path,
        method: req.method,
        code: err.code,
      });
    }

    return res.status(err.status).json(response);
  }

  // Unknown errors
  const status =
    typeof err === 'object' && err !== null && 'status' in err
      ? Number((err as any).status)
      : 500;
  const message =
    typeof err === 'object' && err !== null && 'message' in err
      ? (err as any).message
      : 'Beklenmeyen bir hata oluştu';

  const response: ErrorResponse = {
    success: false,
    error: message || 'Sunucu hatası',
    code: ErrorCode.INTERNAL_ERROR,
  };

  // Include stack trace in development
  if (config.nodeEnv === 'development' && err instanceof Error && err.stack) {
    response.stack = err.stack;
  }

  logger.error('Unhandled error', {
    path: req.path,
    method: req.method,
    status,
    error: err,
    stack: err instanceof Error ? err.stack : undefined,
  });

  res.status(status || 500).json(response);
};

