import {Request, Response} from 'express';
import {prisma} from '../../lib/prisma';

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

