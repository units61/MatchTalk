"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = void 0;
const zod_1 = require("zod");
const logger_1 = require("../logger");
const errors_1 = require("../errors");
const config_1 = require("../config");
/**
 * Error handler middleware
 */
const errorHandler = (err, req, res, _next) => {
    // Zod validation errors
    if (err instanceof zod_1.ZodError) {
        const firstError = err.errors[0];
        const errorMessage = firstError
            ? `${firstError.path.join('.')}: ${firstError.message}`
            : 'Geçersiz giriş bilgileri';
        const response = {
            success: false,
            error: errorMessage,
            code: errors_1.ErrorCode.VALIDATION_ERROR,
            details: config_1.config.nodeEnv === 'development' ? err.errors : undefined,
        };
        logger_1.logger.warn(`Validation error: ${errorMessage}`, {
            path: req.path,
            method: req.method,
            errors: err.errors,
        });
        return res.status(400).json(response);
    }
    // HttpError instances
    if (err instanceof errors_1.HttpError) {
        const response = {
            success: false,
            error: err.message,
            code: err.code,
            details: err.details,
        };
        // Include stack trace in development
        if (config_1.config.nodeEnv === 'development' && err.stack) {
            response.stack = err.stack;
        }
        // Log based on status code
        if (err.status >= 500) {
            logger_1.logger.error(`Server error (${err.status}): ${err.message}`, {
                path: req.path,
                method: req.method,
                code: err.code,
                stack: err.stack,
            });
        }
        else {
            logger_1.logger.warn(`Client error (${err.status}): ${err.message}`, {
                path: req.path,
                method: req.method,
                code: err.code,
            });
        }
        return res.status(err.status).json(response);
    }
    // Unknown errors
    const status = typeof err === 'object' && err !== null && 'status' in err
        ? Number(err.status)
        : 500;
    const message = typeof err === 'object' && err !== null && 'message' in err
        ? err.message
        : 'Beklenmeyen bir hata oluştu';
    const response = {
        success: false,
        error: message || 'Sunucu hatası',
        code: errors_1.ErrorCode.INTERNAL_ERROR,
    };
    // Include stack trace in development
    if (config_1.config.nodeEnv === 'development' && err instanceof Error && err.stack) {
        response.stack = err.stack;
    }
    logger_1.logger.error('Unhandled error', {
        path: req.path,
        method: req.method,
        status,
        error: err,
        stack: err instanceof Error ? err.stack : undefined,
    });
    res.status(status || 500).json(response);
};
exports.errorHandler = errorHandler;
//# sourceMappingURL=error.js.map