import {Server as HttpServer} from 'http';
import {Server as SocketIOServer, Socket} from 'socket.io';
import {verify} from 'jsonwebtoken';
import {config} from '../config';
import {roomHandlers} from './handlers/roomHandlers';
import {matchingHandlers} from './handlers/matchingHandlers';

interface SocketUser {
  userId: string;
  socketId: string;
}

// Kullanıcı-socket mapping
const userSockets = new Map<string, Set<string>>(); // userId -> Set<socketId>
const socketUsers = new Map<string, string>(); // socketId -> userId

export const initializeWebSocket = (httpServer: HttpServer) => {
  const io = new SocketIOServer(httpServer, {
    cors: {
      origin: config.corsOrigins.length ? config.corsOrigins : true,
      credentials: true,
    },
    transports: ['websocket', 'polling'],
  });

  // Authentication middleware
  io.use(async (socket: Socket, next) => {
    try {
      const token = socket.handshake.auth.token || socket.handshake.headers.authorization?.replace('Bearer ', '');

      if (!token) {
        return next(new Error('Authentication token required'));
      }

      const decoded = verify(token, config.jwtSecret) as {userId: string};
      (socket as any).userId = decoded.userId;
      next();
    } catch (error) {
      next(new Error('Invalid authentication token'));
    }
  });

  io.on('connection', (socket: Socket) => {
    const userId = (socket as any).userId as string;

    // Kullanıcı-socket mapping'i güncelle
    if (!userSockets.has(userId)) {
      userSockets.set(userId, new Set());
    }
    userSockets.get(userId)!.add(socket.id);
    socketUsers.set(socket.id, userId);

    console.log(`User ${userId} connected (socket: ${socket.id})`);

    // Room handlers
    roomHandlers(socket, io, userId);

    // Matching handlers
    matchingHandlers(socket, io, userId);

    // Disconnect handler
    socket.on('disconnect', () => {
      console.log(`User ${userId} disconnected (socket: ${socket.id})`);
      
      // Mapping'den kaldır
      const userSocketSet = userSockets.get(userId);
      if (userSocketSet) {
        userSocketSet.delete(socket.id);
        if (userSocketSet.size === 0) {
          userSockets.delete(userId);
        }
      }
      socketUsers.delete(socket.id);
    });
  });

  return io;
};

// Helper functions
export const getUserSockets = (userId: string): string[] => {
  const socketSet = userSockets.get(userId);
  return socketSet ? Array.from(socketSet) : [];
};

export const getSocketUser = (socketId: string): string | undefined => {
  return socketUsers.get(socketId);
};

export const emitToUser = (io: SocketIOServer, userId: string, event: string, data: any) => {
  const socketIds = getUserSockets(userId);
  socketIds.forEach((socketId) => {
    io.to(socketId).emit(event, data);
  });
};

export const emitToRoom = (io: SocketIOServer, roomId: string, event: string, data: any) => {
  io.to(`room:${roomId}`).emit(event, data);
};

