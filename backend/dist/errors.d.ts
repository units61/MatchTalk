/**
 * Error codes enum
 */
export declare enum ErrorCode {
    VALIDATION_ERROR = "VALIDATION_ERROR",
    INVALID_INPUT = "INVALID_INPUT",
    UNAUTHORIZED = "UNAUTHORIZED",
    INVALID_TOKEN = "INVALID_TOKEN",
    TOKEN_EXPIRED = "TOKEN_EXPIRED",
    FORBIDDEN = "FORBIDDEN",
    INSUFFICIENT_PERMISSIONS = "INSUFFICIENT_PERMISSIONS",
    NOT_FOUND = "NOT_FOUND",
    USER_NOT_FOUND = "USER_NOT_FOUND",
    ROOM_NOT_FOUND = "ROOM_NOT_FOUND",
    CONFLICT = "CONFLICT",
    ALREADY_EXISTS = "ALREADY_EXISTS",
    INTERNAL_ERROR = "INTERNAL_ERROR",
    DATABASE_ERROR = "DATABASE_ERROR",
    EXTERNAL_SERVICE_ERROR = "EXTERNAL_SERVICE_ERROR"
}
/**
 * Base HTTP Error class
 */
export declare class HttpError extends Error {
    status: number;
    code?: ErrorCode | undefined;
    details?: any | undefined;
    constructor(status: number, message: string, code?: ErrorCode | undefined, details?: any | undefined);
}
/**
 * Validation Error (400)
 */
export declare class ValidationError extends HttpError {
    constructor(message: string, details?: any);
}
/**
 * Unauthorized Error (401)
 */
export declare class UnauthorizedError extends HttpError {
    constructor(message?: string);
}
/**
 * Forbidden Error (403)
 */
export declare class ForbiddenError extends HttpError {
    constructor(message?: string);
}
/**
 * Not Found Error (404)
 */
export declare class NotFoundError extends HttpError {
    constructor(message?: string, code?: ErrorCode);
}
/**
 * Conflict Error (409)
 */
export declare class ConflictError extends HttpError {
    constructor(message: string, details?: any);
}
/**
 * Internal Server Error (500)
 */
export declare class InternalError extends HttpError {
    constructor(message?: string, details?: any);
}
//# sourceMappingURL=errors.d.ts.map