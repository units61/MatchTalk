// Test setup file
import dotenv from 'dotenv';
import { PrismaClient } from '@prisma/client';
import { resetMockRedis, resetMockSocketIOServer, resetMockTimer } from './utils/testHelpers';

// Load test environment variables
dotenv.config({path: '.env.test'});

// Mock environment variables for tests
process.env.NODE_ENV = 'test';
process.env.JWT_SECRET = process.env.JWT_SECRET || 'test-secret-key-for-testing-only';
process.env.DATABASE_URL = process.env.TEST_DATABASE_URL || process.env.DATABASE_URL || 'postgresql://test:test@localhost:5432/test_matchtalk';
process.env.REDIS_URL = process.env.TEST_REDIS_URL || 'redis://localhost:6379';

// Test database connection pooling
let testPrisma: PrismaClient | null = null;

export function getTestPrisma(): PrismaClient {
  if (!testPrisma) {
    testPrisma = new PrismaClient({
      datasources: {
        db: {
          url: process.env.DATABASE_URL,
        },
      },
      log: process.env.DEBUG ? ['query', 'error', 'warn'] : ['error'],
    });
  }
  return testPrisma;
}

// Global test setup
beforeAll(async () => {
  // Test database connection
  try {
    const prisma = getTestPrisma();
    await prisma.$connect();
  } catch (error) {
    console.warn('⚠️ Test database connection failed. Some tests may fail.');
    console.warn('Make sure TEST_DATABASE_URL is set correctly.');
  }
});

// Global test teardown
afterAll(async () => {
  // Cleanup mocks
  resetMockRedis();
  resetMockSocketIOServer();
  resetMockTimer();

  // Disconnect from test database
  if (testPrisma) {
    await testPrisma.$disconnect();
    testPrisma = null;
  }
});

// Reset mocks before each test
beforeEach(() => {
  resetMockRedis();
  resetMockSocketIOServer();
  resetMockTimer();
});
