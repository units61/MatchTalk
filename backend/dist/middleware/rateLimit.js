"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.strictLimiter = exports.userLimiter = exports.apiLimiter = exports.authLimiter = void 0;
const express_rate_limit_1 = __importDefault(require("express-rate-limit"));
const rate_limit_redis_1 = require("rate-limit-redis");
const redis_1 = require("../lib/redis");
const config_1 = require("../config");
// Development için daha yüksek limit, production için daha düşük
const isDevelopment = config_1.config.nodeEnv !== 'production';
// Redis store (production için)
const createRedisStore = () => {
    try {
        return new rate_limit_redis_1.RedisStore({
            // @ts-expect-error - ioredis call signature mismatch with redis-rate-limit expectations but works
            sendCommand: (...args) => redis_1.redis.call(...args),
        });
    }
    catch (error) {
        // Redis yoksa memory store kullan
        return undefined;
    }
};
// Key generator for user-based rate limiting
const userKeyGenerator = (req) => {
    const authReq = req;
    if (authReq.userId) {
        return `user:${authReq.userId}`;
    }
    // Fallback to IP if not authenticated
    return req.ip || req.socket.remoteAddress || 'unknown';
};
// Key generator for IP-based rate limiting
const ipKeyGenerator = (req) => {
    return req.ip || req.socket.remoteAddress || 'unknown';
};
/**
 * Auth endpoints rate limiter (stricter)
 */
exports.authLimiter = (0, express_rate_limit_1.default)({
    windowMs: 60 * 1000, // 1 dakika
    max: isDevelopment ? 100 : 20,
    standardHeaders: 'draft-7',
    legacyHeaders: false,
    store: isDevelopment ? undefined : createRedisStore(), // Memory store in dev, Redis in prod
    keyGenerator: ipKeyGenerator,
    message: 'Çok fazla istek gönderildi. Lütfen bir dakika sonra tekrar deneyin.',
    skip: (req) => {
        return req.path === '/health';
    },
});
/**
 * General API rate limiter (moderate)
 */
exports.apiLimiter = (0, express_rate_limit_1.default)({
    windowMs: 60 * 1000, // 1 dakika
    max: isDevelopment ? 200 : 100,
    standardHeaders: 'draft-7',
    legacyHeaders: false,
    store: isDevelopment ? undefined : createRedisStore(),
    keyGenerator: ipKeyGenerator,
    message: 'Çok fazla istek gönderildi. Lütfen bir dakika sonra tekrar deneyin.',
    skip: (req) => {
        return req.path === '/health';
    },
});
/**
 * User-based rate limiter (for authenticated endpoints)
 */
exports.userLimiter = (0, express_rate_limit_1.default)({
    windowMs: 60 * 1000, // 1 dakika
    max: isDevelopment ? 300 : 150,
    standardHeaders: 'draft-7',
    legacyHeaders: false,
    store: isDevelopment ? undefined : createRedisStore(),
    keyGenerator: userKeyGenerator,
    message: 'Çok fazla istek gönderildi. Lütfen bir dakika sonra tekrar deneyin.',
    skip: (req) => {
        return req.path === '/health';
    },
});
/**
 * Strict rate limiter (for sensitive operations)
 */
exports.strictLimiter = (0, express_rate_limit_1.default)({
    windowMs: 60 * 1000, // 1 dakika
    max: isDevelopment ? 50 : 10,
    standardHeaders: 'draft-7',
    legacyHeaders: false,
    store: isDevelopment ? undefined : createRedisStore(),
    keyGenerator: userKeyGenerator,
    message: 'Çok fazla istek gönderildi. Lütfen bir dakika sonra tekrar deneyin.',
});
//# sourceMappingURL=rateLimit.js.map