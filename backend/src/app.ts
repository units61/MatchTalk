import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import morgan from 'morgan';
import path from 'path';
import fs from 'fs';
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
            'chrome-extension://*',
          ],
          scriptSrc: ["'self'", "'unsafe-inline'", "'unsafe-eval'"],
          styleSrc: ["'self'", "'unsafe-inline'"],
          imgSrc: ["'self'", 'data:', 'https:'],
          fontSrc: ["'self'", 'https://fonts.gstatic.com'],
        },
      },
      crossOriginEmbedderPolicy: false,
    }),
  );
  
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
  app.use(express.json());
  app.use(morgan('dev'));

  app.use('/health', healthRouter);
  app.use('/auth', authLimiter, authRouter);
  app.use('/rooms', roomsRouter);
  app.use('/friends', friendsRouter);
  app.use('/matching', matchingRouter);
  app.use('/invites', invitesRouter);
  app.use('/stats', statsRouter);

  // Frontend statik servis (prod build kopyası varsa)
  const clientBuildPath = path.join(__dirname, '..', '..', 'frontend-dist');
  if (fs.existsSync(clientBuildPath)) {
    app.use(express.static(clientBuildPath));
    app.get('*', (_req, res) => {
      res.sendFile(path.join(clientBuildPath, 'index.html'));
    });
  }

  app.use(errorHandler);

  return app;
};

