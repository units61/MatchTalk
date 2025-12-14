"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InternalError = exports.ConflictError = exports.NotFoundError = exports.ForbiddenError = exports.UnauthorizedError = exports.ValidationError = exports.HttpError = exports.ErrorCode = void 0;
/**
 * Error codes enum
 */
var ErrorCode;
(function (ErrorCode) {
    // Validation errors (400)
    ErrorCode["VALIDATION_ERROR"] = "VALIDATION_ERROR";
    ErrorCode["INVALID_INPUT"] = "INVALID_INPUT";
    // Authentication errors (401)
    ErrorCode["UNAUTHORIZED"] = "UNAUTHORIZED";
    ErrorCode["INVALID_TOKEN"] = "INVALID_TOKEN";
    ErrorCode["TOKEN_EXPIRED"] = "TOKEN_EXPIRED";
    // Authorization errors (403)
    ErrorCode["FORBIDDEN"] = "FORBIDDEN";
    ErrorCode["INSUFFICIENT_PERMISSIONS"] = "INSUFFICIENT_PERMISSIONS";
    // Not found errors (404)
    ErrorCode["NOT_FOUND"] = "NOT_FOUND";
    ErrorCode["USER_NOT_FOUND"] = "USER_NOT_FOUND";
    ErrorCode["ROOM_NOT_FOUND"] = "ROOM_NOT_FOUND";
    // Conflict errors (409)
    ErrorCode["CONFLICT"] = "CONFLICT";
    ErrorCode["ALREADY_EXISTS"] = "ALREADY_EXISTS";
    // Server errors (500)
    ErrorCode["INTERNAL_ERROR"] = "INTERNAL_ERROR";
    ErrorCode["DATABASE_ERROR"] = "DATABASE_ERROR";
    ErrorCode["EXTERNAL_SERVICE_ERROR"] = "EXTERNAL_SERVICE_ERROR";
})(ErrorCode || (exports.ErrorCode = ErrorCode = {}));
/**
 * Base HTTP Error class
 */
class HttpError extends Error {
    constructor(status, message, code, details) {
        super(message);
        this.status = status;
        this.code = code;
        this.details = details;
        this.name = 'HttpError';
        Object.setPrototypeOf(this, HttpError.prototype);
    }
}
exports.HttpError = HttpError;
/**
 * Validation Error (400)
 */
class ValidationError extends HttpError {
    constructor(message, details) {
        super(400, message, ErrorCode.VALIDATION_ERROR, details);
        this.name = 'ValidationError';
    }
}
exports.ValidationError = ValidationError;
/**
 * Unauthorized Error (401)
 */
class UnauthorizedError extends HttpError {
    constructor(message = 'Unauthorized') {
        super(401, message, ErrorCode.UNAUTHORIZED);
        this.name = 'UnauthorizedError';
    }
}
exports.UnauthorizedError = UnauthorizedError;
/**
 * Forbidden Error (403)
 */
class ForbiddenError extends HttpError {
    constructor(message = 'Forbidden') {
        super(403, message, ErrorCode.FORBIDDEN);
        this.name = 'ForbiddenError';
    }
}
exports.ForbiddenError = ForbiddenError;
/**
 * Not Found Error (404)
 */
class NotFoundError extends HttpError {
    constructor(message = 'Not found', code) {
        super(404, message, code || ErrorCode.NOT_FOUND);
        this.name = 'NotFoundError';
    }
}
exports.NotFoundError = NotFoundError;
/**
 * Conflict Error (409)
 */
class ConflictError extends HttpError {
    constructor(message, details) {
        super(409, message, ErrorCode.CONFLICT, details);
        this.name = 'ConflictError';
    }
}
exports.ConflictError = ConflictError;
/**
 * Internal Server Error (500)
 */
class InternalError extends HttpError {
    constructor(message = 'Internal server error', details) {
        super(500, message, ErrorCode.INTERNAL_ERROR, details);
        this.name = 'InternalError';
    }
}
exports.InternalError = InternalError;
//# sourceMappingURL=errors.js.map