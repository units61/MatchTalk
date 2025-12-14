import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import morgan from 'morgan';
import path from 'path';
import compression from 'compression';
import swaggerUi from 'swagger-ui-express';
import {swaggerSpec} from './swagger';
import {authRouter} from './routes/auth';
import {healthRouter} from './routes/health';
import {errorHandler} from './middleware/error';
import {authLimiter} from './middleware/rateLimit';
import {config} from './config';
import {roomsRouter} from './routes/rooms';
import {friendsRouter} from './routes/friends';
import {matchingRouter} from './routes/matching';
import {invitesRouter} from './routes/invites';
import {statsRouter} from './routes/stats';
import {agoraRouter} from './routes/agora';
import {usersRouter} from './routes/users';
import {badgesRouter} from './routes/badges';
import {notificationsRouter} from './routes/notifications';
import {adminUsersRouter} from './routes/admin/users';
import {adminSystemRouter} from './routes/admin/system';
import {analyticsRouter} from './routes/analytics';
import {analyticsMiddleware} from './middleware/analytics';
import {versioningMiddleware} from './middleware/versioning';
import {metricsMiddleware} from './middleware/metrics';
import {metricsRouter} from './routes/metrics';

export const createApp = () => {
  const app = express();

  app.use(
    helmet({
      contentSecurityPolicy: {
        directives: {
          defaultSrc: ["'self'"],
          connectSrc: [
            "'self'",
            'http://localhost:*',
            'ws://localhost:*',
            'wss://localhost:*',
            'chrome-extension://*',
          ],
          scriptSrc: ["'self'", "'unsafe-inline'", "'unsafe-eval'"],
          styleSrc: ["'self'", "'unsafe-inline'"],
          imgSrc: ["'self'", 'data:', 'https:', 'http:'],
          fontSrc: ["'self'", 'https://fonts.gstatic.com'],
        },
      },
      crossOriginEmbedderPolicy: false,
      // XSS protection
      xssFilter: true,
      // Prevent clickjacking
      frameguard: {
        action: 'deny',
      },
      // Hide powered-by header
      hidePoweredBy: true,
      // HSTS (if using HTTPS)
      hsts: {
        maxAge: 31536000,
        includeSubDomains: true,
        preload: true,
      },
    }),
  );
  
  // Additional security headers
  app.use((req, res, next) => {
    // X-Content-Type-Options
    res.setHeader('X-Content-Type-Options', 'nosniff');
    // X-Frame-Options (redundant with helmet but explicit)
    res.setHeader('X-Frame-Options', 'DENY');
    // Referrer-Policy
    res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');
    next();
  });
  
  // Chrome DevTools endpoint için özel route
  app.get('/.well-known/appspecific/com.chrome.devtools.json', (_req, res) => {
    res.status(404).json({error: 'Not found'});
  });
  app.use(
    cors({
      origin: config.corsOrigins.length ? config.corsOrigins : true,
      credentials: true,
    }),
  );
  // Response compression
  app.use(compression({
    filter: (req, res) => {
      // Don't compress if client doesn't support it
      if (req.headers['x-no-compression']) {
        return false;
      }
      // Use compression for all other requests
      return compression.filter(req, res);
    },
    level: 6, // Compression level (0-9)
    threshold: 1024, // Only compress responses larger than 1KB
  }));

  // Body parser with size limit
  app.use(express.json({limit: '10mb'}));
  app.use(express.urlencoded({extended: true, limit: '10mb'}));
  app.use(morgan('dev'));

  // Analytics tracking middleware
  app.use(analyticsMiddleware);

  // Metrics middleware
  app.use(metricsMiddleware);

  // API versioning middleware
  app.use(versioningMiddleware);

  // Static file serving for uploads (local storage)
  if (config.storage.type === 'local') {
    const uploadDir = path.join(process.cwd(), config.storage.uploadDir);
    app.use('/uploads', express.static(uploadDir));
  }

  // API Documentation (Swagger)
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec, {
    customCss: '.swagger-ui .topbar { display: none }',
    customSiteTitle: 'MatchTalk API Documentation',
  }));

  // Health check (no versioning)
  app.use('/health', healthRouter);

  // Metrics endpoint (no versioning, admin only)
  app.use('/metrics', metricsRouter);

  // API routes with versioning
  // v1 API (current)
  app.use('/api/v1/auth', authLimiter, authRouter);
  app.use('/api/v1/rooms', roomsRouter);
  app.use('/api/v1/friends', friendsRouter);
  app.use('/api/v1/matching', matchingRouter);
  app.use('/api/v1/invites', invitesRouter);
  app.use('/api/v1/stats', statsRouter);
  app.use('/api/v1/agora', agoraRouter);
  app.use('/api/v1/users', usersRouter);
  app.use('/api/v1/badges', badgesRouter);
  app.use('/api/v1/notifications', notificationsRouter);
  app.use('/api/v1/admin/users', adminUsersRouter);
  app.use('/api/v1/admin/system', adminSystemRouter);
  app.use('/api/v1/analytics', analyticsRouter);

  // Backward compatibility - redirect old routes to v1
  app.use('/auth', authLimiter, authRouter);
  app.use('/rooms', roomsRouter);
  app.use('/friends', friendsRouter);
  app.use('/matching', matchingRouter);
  app.use('/invites', invitesRouter);
  app.use('/stats', statsRouter);
  app.use('/agora', agoraRouter);
  app.use('/users', usersRouter);
  app.use('/badges', badgesRouter);
  app.use('/notifications', notificationsRouter);
  app.use('/admin/users', adminUsersRouter);
  app.use('/admin/system', adminSystemRouter);
  app.use('/analytics', analyticsRouter);

  app.use(errorHandler);

  return app;
};

