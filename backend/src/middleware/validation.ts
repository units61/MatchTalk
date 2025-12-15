import {Request, Response, NextFunction} from 'express';
import {ZodSchema, ZodError} from 'zod';
import {ValidationError, ErrorCode} from '../errors';
import {logger} from '../logger';

/**
 * Validation middleware factory
 * Creates a middleware that validates request data against a Zod schema
 */
export function validate(schema: ZodSchema, source: 'body' | 'query' | 'params' = 'body') {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      const data = source === 'body' ? req.body : source === 'query' ? req.query : req.params;
      const validated = schema.parse(data);
      
      // Replace original data with validated data
      if (source === 'body') {
        req.body = validated;
      } else if (source === 'query') {
        req.query = validated as any;
      } else {
        req.params = validated as any;
      }
      
      next();
    } catch (error) {
      if (error instanceof ZodError) {
        // Format validation errors
        const errors = error.errors.map(err => ({
          path: err.path.join('.'),
          message: err.message,
          code: err.code,
        }));

        // Get first error for user-friendly message
        const firstError = errors[0];
        const errorMessage = firstError
          ? `${firstError.path}: ${firstError.message}`
          : 'Geçersiz giriş bilgileri';

        logger.warn('Validation error', {
          path: req.path,
          method: req.method,
          source,
          errors,
        });

        return res.status(400).json({
          success: false,
          error: errorMessage,
          code: ErrorCode.VALIDATION_ERROR,
          details: process.env.NODE_ENV === 'development' ? errors : undefined,
        });
      }

      // Unknown error
      logger.error('Unexpected validation error', {
        path: req.path,
        method: req.method,
        error,
      });

      next(new ValidationError('Validation failed'));
    }
  };
}

/**
 * Validate request body
 */
export function validateBody(schema: ZodSchema) {
  return validate(schema, 'body');
}

/**
 * Validate request query parameters
 */
export function validateQuery(schema: ZodSchema) {
  return validate(schema, 'query');
}

/**
 * Validate request path parameters
 */
export function validateParams(schema: ZodSchema) {
  return validate(schema, 'params');
}



