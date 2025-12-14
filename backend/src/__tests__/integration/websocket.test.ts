import {Server as HttpServer} from 'http';
import {Server as SocketIOServer} from 'socket.io';
import {createApp} from '../../app';
import {initializeWebSocket} from '../../websocket/server';
import {createTestUser, cleanupTestData, generateTestToken} from '../utils/testHelpers';
import {prisma} from '../../lib/prisma';
import {io as ClientIO, Socket as ClientSocket} from 'socket.io-client';

// Mock Redis
jest.mock('../../lib/redis', () => {
  const {createMockRedis} = require('../mocks/redis.mock');
  return {
    redis: createMockRedis(),
    redisPub: createMockRedis(),
    redisSub: createMockRedis(),
  };
});

// Mock timerService
jest.mock('../../services/timerService', () => ({
  timerService: {
    startTimer: jest.fn().mockResolvedValue(undefined),
    stopTimer: jest.fn().mockResolvedValue(undefined),
  },
}));

describe('WebSocket Integration Tests', () => {
  let httpServer: HttpServer;
  let io: SocketIOServer;
  let app: any;
  let user: any;
  let token: string;
  let clientSocket: ClientSocket;

  beforeAll(async () => {
    app = createApp();
    httpServer = new HttpServer(app);
    io = initializeWebSocket(httpServer);
    
    await new Promise<void>((resolve) => {
      httpServer.listen(0, () => {
        resolve();
      });
    });
  });

  beforeEach(async () => {
    await cleanupTestData();
    user = await createTestUser({
      email: 'ws@test.com',
      name: 'WS User',
      password: 'password123',
      gender: 'male',
    });
    token = generateTestToken(user.id);
  });

  afterEach((done) => {
    if (clientSocket && clientSocket.connected) {
      clientSocket.disconnect();
    }
    done();
  });

  afterAll(async () => {
    await new Promise<void>((resolve) => {
      httpServer.close(() => {
        resolve();
      });
    });
    await cleanupTestData();
    await prisma.$disconnect();
  });

  describe('Connection', () => {
    it('should connect with valid token', (done) => {
      const port = (httpServer.address() as any)?.port || 4000;
      clientSocket = ClientIO(`http://localhost:${port}`, {
        auth: {token},
        transports: ['websocket'],
      });

      clientSocket.on('connect', () => {
        expect(clientSocket.connected).toBe(true);
        done();
      });

      clientSocket.on('connect_error', (error) => {
        done(error);
      });
    });

    it('should reject connection without token', (done) => {
      const port = (httpServer.address() as any)?.port || 4000;
      clientSocket = ClientIO(`http://localhost:${port}`, {
        transports: ['websocket'],
      });

      clientSocket.on('connect_error', (error) => {
        expect(error.message).toContain('Authentication');
        done();
      });
    });
  });

  describe('Room Events', () => {
    let room: any;

    beforeEach(async () => {
      room = await prisma.room.create({
        data: {
          name: 'WS Test Room',
          category: 'Test',
          maxParticipants: 8,
          durationSec: 300,
          timeLeftSec: 0,
          participants: {
            create: {
              userId: user.id,
            },
          },
        },
      });
    });

    it('should handle join-room event', (done) => {
      const port = (httpServer.address() as any)?.port || 4000;
      clientSocket = ClientIO(`http://localhost:${port}`, {
        auth: {token},
        transports: ['websocket'],
      });

      clientSocket.on('connect', () => {
        clientSocket.on('room-joined', (data) => {
          expect(data.room).toBeDefined();
          expect(data.room.id).toBe(room.id);
          done();
        });

        clientSocket.emit('join-room', {roomId: room.id});
      });
    });

    it('should handle leave-room event', (done) => {
      const port = (httpServer.address() as any)?.port || 4000;
      clientSocket = ClientIO(`http://localhost:${port}`, {
        auth: {token},
        transports: ['websocket'],
      });

      clientSocket.on('connect', () => {
        clientSocket.on('room-left', (data) => {
          expect(data.roomId).toBe(room.id);
          done();
        });

        // Join first, then leave
        clientSocket.emit('join-room', {roomId: room.id});
        setTimeout(() => {
          clientSocket.emit('leave-room', {roomId: room.id});
        }, 100);
      });
    });

    it('should receive timer-update events', (done) => {
      const port = (httpServer.address() as any)?.port || 4000;
      clientSocket = ClientIO(`http://localhost:${port}`, {
        auth: {token},
        transports: ['websocket'],
      });

      clientSocket.on('connect', () => {
        clientSocket.on('timer-update', (data) => {
          expect(data.roomId).toBe(room.id);
          expect(data.timeLeft).toBeDefined();
          done();
        });

        clientSocket.emit('join-room', {roomId: room.id});
        // Simulate timer update
        setTimeout(() => {
          clientSocket.emit('timer-update', {roomId: room.id, timeLeft: 299});
        }, 100);
      });
    });
  });

  describe('Matching Events', () => {
    it('should handle matching-join event', (done) => {
      const port = (httpServer.address() as any)?.port || 4000;
      clientSocket = ClientIO(`http://localhost:${port}`, {
        auth: {token},
        transports: ['websocket'],
      });

      clientSocket.on('connect', () => {
        clientSocket.on('matching-joined', (data) => {
          expect(data.status).toBe('WAITING');
          done();
        });

        clientSocket.emit('matching-join');
      });
    });

    it('should handle matching-leave event', (done) => {
      const port = (httpServer.address() as any)?.port || 4000;
      clientSocket = ClientIO(`http://localhost:${port}`, {
        auth: {token},
        transports: ['websocket'],
      });

      clientSocket.on('connect', () => {
        clientSocket.on('matching-left', (data) => {
          expect(data.success).toBe(true);
          done();
        });

        // Join first, then leave
        clientSocket.emit('matching-join');
        setTimeout(() => {
          clientSocket.emit('matching-leave');
        }, 100);
      });
    });

    it('should handle matching-status event', (done) => {
      const port = (httpServer.address() as any)?.port || 4000;
      clientSocket = ClientIO(`http://localhost:${port}`, {
        auth: {token},
        transports: ['websocket'],
      });

      clientSocket.on('connect', () => {
        clientSocket.on('matching-status', (data) => {
          expect(data).toHaveProperty('inQueue');
          done();
        });

        clientSocket.emit('matching-status');
      });
    });
  });
});
