/**
 * Error codes enum
 */
export enum ErrorCode {
  // Validation errors (400)
  VALIDATION_ERROR = 'VALIDATION_ERROR',
  INVALID_INPUT = 'INVALID_INPUT',
  
  // Authentication errors (401)
  UNAUTHORIZED = 'UNAUTHORIZED',
  INVALID_TOKEN = 'INVALID_TOKEN',
  TOKEN_EXPIRED = 'TOKEN_EXPIRED',
  
  // Authorization errors (403)
  FORBIDDEN = 'FORBIDDEN',
  INSUFFICIENT_PERMISSIONS = 'INSUFFICIENT_PERMISSIONS',
  
  // Not found errors (404)
  NOT_FOUND = 'NOT_FOUND',
  USER_NOT_FOUND = 'USER_NOT_FOUND',
  ROOM_NOT_FOUND = 'ROOM_NOT_FOUND',
  
  // Conflict errors (409)
  CONFLICT = 'CONFLICT',
  ALREADY_EXISTS = 'ALREADY_EXISTS',
  
  // Server errors (500)
  INTERNAL_ERROR = 'INTERNAL_ERROR',
  DATABASE_ERROR = 'DATABASE_ERROR',
  EXTERNAL_SERVICE_ERROR = 'EXTERNAL_SERVICE_ERROR',
}

/**
 * Base HTTP Error class
 */
export class HttpError extends Error {
  constructor(
    public status: number,
    message: string,
    public code?: ErrorCode,
    public details?: any,
  ) {
    super(message);
    this.name = 'HttpError';
    Object.setPrototypeOf(this, HttpError.prototype);
  }
}

/**
 * Validation Error (400)
 */
export class ValidationError extends HttpError {
  constructor(message: string, details?: any) {
    super(400, message, ErrorCode.VALIDATION_ERROR, details);
    this.name = 'ValidationError';
  }
}

/**
 * Unauthorized Error (401)
 */
export class UnauthorizedError extends HttpError {
  constructor(message: string = 'Unauthorized') {
    super(401, message, ErrorCode.UNAUTHORIZED);
    this.name = 'UnauthorizedError';
  }
}

/**
 * Forbidden Error (403)
 */
export class ForbiddenError extends HttpError {
  constructor(message: string = 'Forbidden') {
    super(403, message, ErrorCode.FORBIDDEN);
    this.name = 'ForbiddenError';
  }
}

/**
 * Not Found Error (404)
 */
export class NotFoundError extends HttpError {
  constructor(message: string = 'Not found', code?: ErrorCode) {
    super(404, message, code || ErrorCode.NOT_FOUND);
    this.name = 'NotFoundError';
  }
}

/**
 * Conflict Error (409)
 */
export class ConflictError extends HttpError {
  constructor(message: string, details?: any) {
    super(409, message, ErrorCode.CONFLICT, details);
    this.name = 'ConflictError';
  }
}

/**
 * Internal Server Error (500)
 */
export class InternalError extends HttpError {
  constructor(message: string = 'Internal server error', details?: any) {
    super(500, message, ErrorCode.INTERNAL_ERROR, details);
    this.name = 'InternalError';
  }
}

