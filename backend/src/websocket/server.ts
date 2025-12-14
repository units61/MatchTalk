import { Server as HttpServer } from 'http';
import { Server as SocketIOServer, Socket } from 'socket.io';
import { createAdapter } from '@socket.io/redis-adapter';
import { verify } from 'jsonwebtoken';
import { config } from '../config';
import { roomHandlers } from './handlers/roomHandlers';
import { matchingHandlers } from './handlers/matchingHandlers';
import { redisPub, redisSub } from '../lib/redis';
import { logger } from '../logger';

// Connection state tracking
export const connectionStates = new Map<string, {
  userId: string;
  connectedAt: Date;
  lastPing: Date;
  rooms: Set<string>;
}>();

// Global IO instance (for admin access)
let globalIO: SocketIOServer | null = null;

export function getIO(): SocketIOServer | null {
  return globalIO;
}

export const initializeWebSocket = (httpServer: HttpServer) => {
  const io = new SocketIOServer(httpServer, {
    cors: {
      origin: config.corsOrigins.length ? config.corsOrigins : true,
      credentials: true,
    },
    transports: ['websocket', 'polling'],
    pingTimeout: 60000, // 60 seconds
    pingInterval: 25000, // 25 seconds (heartbeat)
  });

  // Redis Adapter Entegrasyonu
  try {
    // @ts-expect-error - adapter types might complain about mismatch but this is correct for io.adapter()
    io.adapter(createAdapter(redisPub, redisSub));
    logger.info('Redis adapter initialized for WebSocket');
  } catch (error) {
    logger.warn('Redis adapter initialization failed, using default adapter:', error);
  }

  // Authentication middleware
  io.use(async (socket: Socket, next) => {
    try {
      const token = socket.handshake.auth.token || socket.handshake.headers.authorization?.replace('Bearer ', '');

      if (!token) {
        logger.warn('WebSocket connection attempt without token', {
          socketId: socket.id,
          ip: socket.handshake.address,
        });
        return next(new Error('Authentication token required'));
      }

      const decoded = verify(token, config.jwtSecret) as { userId: string };
      (socket as any).userId = decoded.userId;
      next();
    } catch (error) {
      logger.warn('WebSocket authentication failed', {
        socketId: socket.id,
        ip: socket.handshake.address,
        error: error instanceof Error ? error.message : String(error),
      });
      next(new Error('Invalid authentication token'));
    }
  });

  io.on('connection', async (socket: Socket) => {
    const userId = (socket as any).userId as string;

    try {
      // Kullanıcı kendi ID'si ile bir odaya katılır (Private Messaging & Notifications için)
      await socket.join(userId);

      // Connection state tracking
      connectionStates.set(socket.id, {
        userId,
        connectedAt: new Date(),
        lastPing: new Date(),
        rooms: new Set([userId]),
      });

      logger.info(`WebSocket user connected`, {
        userId,
        socketId: socket.id,
        ip: socket.handshake.address,
      });

      // Room handlers
      roomHandlers(socket, io, userId);

      // Matching handlers
      matchingHandlers(socket, io, userId);

      // Heartbeat/ping handler
      socket.on('ping', () => {
        const state = connectionStates.get(socket.id);
        if (state) {
          state.lastPing = new Date();
        }
        socket.emit('pong');
      });

      // Error handler
      socket.on('error', (error) => {
        logger.error('WebSocket error', {
          userId,
          socketId: socket.id,
          error: error instanceof Error ? error.message : String(error),
        });
      });

      // Disconnect handler
      socket.on('disconnect', (reason) => {
        const state = connectionStates.get(socket.id);
        logger.info(`WebSocket user disconnected`, {
          userId,
          socketId: socket.id,
          reason,
          duration: state ? Date.now() - state.connectedAt.getTime() : 0,
        });
        connectionStates.delete(socket.id);
      });
    } catch (error) {
      logger.error('Error handling WebSocket connection', {
        userId,
        socketId: socket.id,
        error: error instanceof Error ? error.message : String(error),
      });
      socket.disconnect();
    }
  });

  // Connection health check (every 30 seconds)
  setInterval(() => {
    const now = new Date();
    const timeout = 60000; // 60 seconds

    for (const [socketId, state] of connectionStates.entries()) {
      const timeSinceLastPing = now.getTime() - state.lastPing.getTime();
      if (timeSinceLastPing > timeout) {
        logger.warn('WebSocket connection timeout, disconnecting', {
          userId: state.userId,
          socketId,
          timeSinceLastPing,
        });
        const socket = io.sockets.sockets.get(socketId);
        if (socket) {
          socket.disconnect(true);
        }
        connectionStates.delete(socketId);
      }
    }
  }, 30000);

  // Store global IO instance
  globalIO = io;

  return io;
};

// Helper functions

// Artık Redis adapter olduğu için bellekten user socket aramıyoruz.
// Direkt userId'ye emit atıyoruz.
export const emitToUser = (io: SocketIOServer, userId: string, event: string, data: any) => {
  io.to(userId).emit(event, data);
};

export const emitToRoom = (io: SocketIOServer, roomId: string, event: string, data: any) => {
  io.to(`room:${roomId}`).emit(event, data);
};
