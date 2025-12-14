import {Request, Response} from 'express';
import {prisma} from '../../lib/prisma';
import jwt from 'jsonwebtoken';
import {config} from '../../config';
import {createMockRedis, MockRedis} from '../mocks/redis.mock';
import {createMockSocketIOServer, createMockSocket, MockSocketIOServer, MockSocket} from '../mocks/websocket.mock';
import {createMockTimer, MockTimer} from '../mocks/timer.mock';

/**
 * Create a mock request object
 */
export function createMockRequest(overrides: Partial<Request> = {}): Partial<Request> {
  return {
    body: {},
    query: {},
    params: {},
    headers: {},
    ...overrides,
  };
}

/**
 * Create a mock response object
 */
export function createMockResponse(): Partial<Response> {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const res: any = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn().mockReturnThis(),
    send: jest.fn().mockReturnThis(),
  };
  return res;
}

/**
 * Create a test user
 */
export async function createTestUser(data: {
  email: string;
  name: string;
  password: string;
  gender: string;
}) {
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  const bcrypt = require('bcryptjs');
  const hashedPassword = await bcrypt.hash(data.password, 10);
  
  return prisma.user.create({
    data: {
      email: data.email,
      name: data.name,
      hashedPassword,
      gender: data.gender,
    },
  });
}

/**
 * Clean up test data
 */
export async function cleanupTestData() {
  // Delete in reverse order of dependencies
  await prisma.userBadge.deleteMany();
  await prisma.badge.deleteMany();
  await prisma.matchQueue.deleteMany();
  await prisma.invite.deleteMany();
  await prisma.friendship.deleteMany();
  await prisma.roomParticipant.deleteMany();
  await prisma.room.deleteMany();
  await prisma.user.deleteMany();
}

/**
 * Generate a JWT token for testing
 */
export function generateTestToken(userId: string): string {
  return jwt.sign({ userId }, config.jwtSecret, {
    expiresIn: config.jwtExpiresIn as jwt.SignOptions['expiresIn'],
  });
}

/**
 * Create a mock request with authentication
 */
export function createAuthenticatedRequest(userId: string, overrides: Partial<Request> = {}): Partial<Request> {
  const token = generateTestToken(userId);
  return createMockRequest({
    headers: {
      authorization: `Bearer ${token}`,
      ...overrides.headers,
    },
    ...overrides,
  });
}

/**
 * Redis Mock Helper
 */
let mockRedisInstance: MockRedis | null = null;

export function getMockRedis(): MockRedis {
  if (!mockRedisInstance) {
    mockRedisInstance = createMockRedis();
  }
  return mockRedisInstance;
}

export function resetMockRedis(): void {
  if (mockRedisInstance) {
    mockRedisInstance.clear();
  }
}

export function createMockRedisHelper(): MockRedis {
  return createMockRedis();
}

/**
 * WebSocket Mock Helper
 */
let mockSocketIOServerInstance: MockSocketIOServer | null = null;

export function getMockSocketIOServer(): MockSocketIOServer {
  if (!mockSocketIOServerInstance) {
    mockSocketIOServerInstance = createMockSocketIOServer();
  }
  return mockSocketIOServerInstance;
}

export function resetMockSocketIOServer(): void {
  if (mockSocketIOServerInstance) {
    mockSocketIOServerInstance.clear();
  }
}

export function createMockSocketHelper(userId?: string): MockSocket {
  const socket = createMockSocket();
  if (userId) {
    socket.userId = userId;
  }
  return socket;
}

/**
 * Timer Mock Helper
 */
let mockTimerInstance: MockTimer | null = null;

export function getMockTimer(): MockTimer {
  if (!mockTimerInstance) {
    mockTimerInstance = createMockTimer();
  }
  return mockTimerInstance;
}

export function resetMockTimer(): void {
  if (mockTimerInstance) {
    mockTimerInstance.clearAll();
    mockTimerInstance.resetTime();
  }
}

export function createMockTimerHelper(): MockTimer {
  return createMockTimer();
}

/**
 * Database Transaction Helper
 * Wraps a test in a transaction that will be rolled back
 */
export async function withTransaction<T>(
  testFn: () => Promise<T>
): Promise<T> {
  return await prisma.$transaction(async (tx) => {
    try {
      const result = await testFn();
      // Force rollback by throwing
      throw new Error('ROLLBACK');
    } catch (error) {
      if (error instanceof Error && error.message === 'ROLLBACK') {
        // Expected rollback
        throw error;
      }
      throw error;
    }
  }).catch((error) => {
    if (error instanceof Error && error.message === 'ROLLBACK') {
      // Transaction rolled back successfully
      return null as T;
    }
    throw error;
  });
}

/**
 * Create multiple test users
 */
export async function createTestUsers(count: number, prefix: string = 'test'): Promise<any[]> {
  const users = [];
  for (let i = 0; i < count; i++) {
    const gender = i % 2 === 0 ? 'male' : 'female';
    const user = await createTestUser({
      email: `${prefix}${i}@example.com`,
      name: `${prefix} User ${i}`,
      password: 'password123',
      gender,
    });
    users.push(user);
  }
  return users;
}

/**
 * Create a test room
 */
export async function createTestRoom(creatorId: string, data?: {
  name?: string;
  category?: string;
  maxParticipants?: number;
  durationSec?: number;
}) {
  return prisma.room.create({
    data: {
      name: data?.name || 'Test Room',
      category: data?.category || 'Test',
      maxParticipants: data?.maxParticipants || 8,
      durationSec: data?.durationSec || 300,
      timeLeftSec: 0,
      participants: {
        create: {
          userId: creatorId,
        },
      },
    },
    include: {
      participants: {
        include: {
          user: {
            select: {
              id: true,
              name: true,
              gender: true,
            },
          },
        },
      },
    },
  });
}

