import rateLimit from 'express-rate-limit';

export const authLimiter = rateLimit({
  windowMs: 60 * 1000, // 1 dakika
  limit: 20,
  standardHeaders: 'draft-7',
  legacyHeaders: false,
});

