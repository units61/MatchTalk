/**
 * Auth endpoints rate limiter (stricter)
 */
export declare const authLimiter: import("express-rate-limit").RateLimitRequestHandler;
/**
 * General API rate limiter (moderate)
 */
export declare const apiLimiter: import("express-rate-limit").RateLimitRequestHandler;
/**
 * User-based rate limiter (for authenticated endpoints)
 */
export declare const userLimiter: import("express-rate-limit").RateLimitRequestHandler;
/**
 * Strict rate limiter (for sensitive operations)
 */
export declare const strictLimiter: import("express-rate-limit").RateLimitRequestHandler;
//# sourceMappingURL=rateLimit.d.ts.map