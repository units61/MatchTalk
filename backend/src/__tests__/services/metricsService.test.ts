import {metricsService} from '../../services/metricsService';

// Mock Redis
jest.mock('../../lib/redis', () => {
  const {createMockRedis} = require('../mocks/redis.mock');
  const mockRedis = createMockRedis();
  // Add zadd method
  mockRedis.zadd = jest.fn().mockResolvedValue(1);
  // Add zremrangebyrank method
  mockRedis.zremrangebyrank = jest.fn().mockResolvedValue(0);
  // Add keys method
  mockRedis.keys = jest.fn().mockResolvedValue([]);
  return {
    redis: mockRedis,
  };
});

describe('MetricsService', () => {
  beforeEach(() => {
    // Enable metrics for tests
    process.env.ENABLE_METRICS = 'true';
    jest.clearAllMocks();
  });

  afterEach(() => {
    delete process.env.ENABLE_METRICS;
  });

  describe('recordRequest', () => {
    it('should record request metrics', async () => {
      await metricsService.recordRequest({
        method: 'GET',
        path: '/api/v1/rooms',
        statusCode: 200,
        responseTime: 50,
        timestamp: Date.now(),
      });

      const mockRedis = require('../../lib/redis').redis;
      expect(mockRedis.zadd).toHaveBeenCalled();
    });

    it('should not record if metrics disabled', async () => {
      delete process.env.ENABLE_METRICS;
      process.env.NODE_ENV = 'development';

      await metricsService.recordRequest({
        method: 'GET',
        path: '/test',
        statusCode: 200,
        responseTime: 50,
        timestamp: Date.now(),
      });

      const mockRedis = require('../../lib/redis').redis;
      expect(mockRedis.zadd).not.toHaveBeenCalled();
    });
  });

  describe('getEndpointStats', () => {
    it('should return endpoint statistics', async () => {
      const stats = await metricsService.getEndpointStats('GET', '/api/v1/rooms');

      expect(stats).toHaveProperty('count');
      expect(stats).toHaveProperty('totalResponseTime');
      expect(stats).toHaveProperty('minResponseTime');
      expect(stats).toHaveProperty('maxResponseTime');
      expect(stats).toHaveProperty('errorCount');
    });
  });

  describe('getAllStats', () => {
    it('should return all statistics', async () => {
      const stats = await metricsService.getAllStats();

      expect(stats).toBeInstanceOf(Object);
    });
  });

  describe('getPrometheusMetrics', () => {
    it('should return Prometheus format metrics', async () => {
      const metrics = await metricsService.getPrometheusMetrics();

      expect(typeof metrics).toBe('string');
      expect(metrics).toContain('http_requests_total');
    });
  });
});
