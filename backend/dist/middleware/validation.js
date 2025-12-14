"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validate = validate;
exports.validateBody = validateBody;
exports.validateQuery = validateQuery;
exports.validateParams = validateParams;
const zod_1 = require("zod");
const errors_1 = require("../errors");
const logger_1 = require("../logger");
/**
 * Validation middleware factory
 * Creates a middleware that validates request data against a Zod schema
 */
function validate(schema, source = 'body') {
    return (req, res, next) => {
        try {
            const data = source === 'body' ? req.body : source === 'query' ? req.query : req.params;
            const validated = schema.parse(data);
            // Replace original data with validated data
            if (source === 'body') {
                req.body = validated;
            }
            else if (source === 'query') {
                req.query = validated;
            }
            else {
                req.params = validated;
            }
            next();
        }
        catch (error) {
            if (error instanceof zod_1.ZodError) {
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
                logger_1.logger.warn('Validation error', {
                    path: req.path,
                    method: req.method,
                    source,
                    errors,
                });
                return res.status(400).json({
                    success: false,
                    error: errorMessage,
                    code: errors_1.ErrorCode.VALIDATION_ERROR,
                    details: process.env.NODE_ENV === 'development' ? errors : undefined,
                });
            }
            // Unknown error
            logger_1.logger.error('Unexpected validation error', {
                path: req.path,
                method: req.method,
                error,
            });
            next(new errors_1.ValidationError('Validation failed'));
        }
    };
}
/**
 * Validate request body
 */
function validateBody(schema) {
    return validate(schema, 'body');
}
/**
 * Validate request query parameters
 */
function validateQuery(schema) {
    return validate(schema, 'query');
}
/**
 * Validate request path parameters
 */
function validateParams(schema) {
    return validate(schema, 'params');
}
//# sourceMappingURL=validation.js.map