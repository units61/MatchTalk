import rateLimit from 'express-rate-limit';
import {RedisStore} from 'rate-limit-redis';
import {redis} from '../lib/redis';
import {Request} from 'express';
import {AuthRequest} from './auth';
import {config} from '../config';

// Development için daha yüksek limit, production için daha düşük
const isDevelopment = config.nodeEnv !== 'production';

// Redis store (production için)
const createRedisStore = () => {
  try {
    return new RedisStore({
      // @ts-expect-error - ioredis call signature mismatch with redis-rate-limit expectations but works
      sendCommand: (...args: string[]) => redis.call(...args),
    });
  } catch (_error) {
    // Redis yoksa memory store kullan
    return undefined;
  }
};

// Key generator for user-based rate limiting
const userKeyGenerator = (req: Request) => {
  const authReq = req as AuthRequest;
  if (authReq.userId) {
    return `user:${authReq.userId}`;
  }
  // Fallback to IP if not authenticated
  return req.ip || req.socket.remoteAddress || 'unknown';
};

// Key generator for IP-based rate limiting
const ipKeyGenerator = (req: Request) => {
  return req.ip || req.socket.remoteAddress || 'unknown';
};

/**
 * Auth endpoints rate limiter (stricter)
 */
export const authLimiter = rateLimit({
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
export const apiLimiter = rateLimit({
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
export const userLimiter = rateLimit({
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
export const strictLimiter = rateLimit({
  windowMs: 60 * 1000, // 1 dakika
  max: isDevelopment ? 50 : 10,
  standardHeaders: 'draft-7',
  legacyHeaders: false,
  store: isDevelopment ? undefined : createRedisStore(),
  keyGenerator: userKeyGenerator,
  message: 'Çok fazla istek gönderildi. Lütfen bir dakika sonra tekrar deneyin.',
});
