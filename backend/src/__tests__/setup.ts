// Test setup file
import dotenv from 'dotenv';

// Load test environment variables
dotenv.config({path: '.env.test'});

// Mock environment variables for tests
process.env.NODE_ENV = 'test';
process.env.JWT_SECRET = 'test-secret-key';
process.env.DATABASE_URL = process.env.TEST_DATABASE_URL || 'postgresql://test:test@localhost:5432/test_matchtalk';
