import {redis} from '../lib/redis';
import {logger} from '../logger';
import {config} from '../config';

interface RequestMetrics {
  method: string;
  path: string;
  statusCode: number;
  responseTime: number;
  timestamp: number;
}

interface EndpointStats {
  count: number;
  totalResponseTime: number;
  minResponseTime: number;
  maxResponseTime: number;
  errorCount: number;
}

class MetricsService {
  private enabled: boolean;
  private readonly METRICS_KEY_PREFIX = 'metrics:';
  private readonly METRICS_TTL = 3600; // 1 hour

  constructor() {
    this.enabled = config.nodeEnv === 'production' || process.env.ENABLE_METRICS === 'true';
  }

  /**
   * Record request metrics
   */
  async recordRequest(metrics: RequestMetrics): Promise<void> {
    if (!this.enabled) {
      return;
    }

    try {
      const key = `${this.METRICS_KEY_PREFIX}${metrics.method}:${metrics.path}`;
      const timestamp = Math.floor(metrics.timestamp / 1000); // Unix timestamp

      // Store individual metric
      await redis.zadd(`${key}:requests`, timestamp, JSON.stringify(metrics));

      // Update aggregated stats
      const statsKey = `${key}:stats`;
      const stats = await this.getEndpointStats(metrics.method, metrics.path);
      
      stats.count += 1;
      stats.totalResponseTime += metrics.responseTime;
      stats.minResponseTime = Math.min(stats.minResponseTime, metrics.responseTime);
      stats.maxResponseTime = Math.max(stats.maxResponseTime, metrics.responseTime);
      
      if (metrics.statusCode >= 400) {
        stats.errorCount += 1;
      }

      await redis.setex(statsKey, this.METRICS_TTL, JSON.stringify(stats));

      // Cleanup old requests (keep last 1000)
      await redis.zremrangebyrank(`${key}:requests`, 0, -1001);
    } catch (error) {
      logger.warn('Error recording metrics:', error);
      // Don't throw - metrics should not break the main flow
    }
  }

  /**
   * Get endpoint statistics
   */
  async getEndpointStats(method: string, path: string): Promise<EndpointStats> {
    try {
      const key = `${this.METRICS_KEY_PREFIX}${method}:${path}:stats`;
      const statsJson = await redis.get(key);
      
      if (statsJson) {
        return JSON.parse(statsJson);
      }

      return {
        count: 0,
        totalResponseTime: 0,
        minResponseTime: Infinity,
        maxResponseTime: 0,
        errorCount: 0,
      };
    } catch (error) {
      logger.warn('Error getting endpoint stats:', error);
      return {
        count: 0,
        totalResponseTime: 0,
        minResponseTime: Infinity,
        maxResponseTime: 0,
        errorCount: 0,
      };
    }
  }

  /**
   * Get all endpoint statistics
   */
  async getAllStats(): Promise<Record<string, EndpointStats & {method: string; path: string; avgResponseTime: number}>> {
    try {
      const keys = await redis.keys(`${this.METRICS_KEY_PREFIX}*:stats`);
      const stats: Record<string, any> = {};

      for (const key of keys) {
        const statsJson = await redis.get(key);
        if (statsJson) {
          const endpointStats = JSON.parse(statsJson);
          const match = key.match(/metrics:(.+?):(.+?):stats/);
          if (match) {
            const [, method, path] = match;
            const fullPath = `${method} ${path}`;
            stats[fullPath] = {
              ...endpointStats,
              method,
              path,
              avgResponseTime: endpointStats.count > 0 
                ? endpointStats.totalResponseTime / endpointStats.count 
                : 0,
            };
          }
        }
      }

      return stats;
    } catch (error) {
      logger.warn('Error getting all stats:', error);
      return {};
    }
  }

  /**
   * Get Prometheus format metrics
   */
  async getPrometheusMetrics(): Promise<string> {
    try {
      const stats = await this.getAllStats();
      const lines: string[] = [];

      // HTTP request count
      for (const [, data] of Object.entries(stats)) {
        lines.push(`http_requests_total{method="${data.method}",path="${data.path}",status="all"} ${data.count}`);
        lines.push(`http_requests_total{method="${data.method}",path="${data.path}",status="error"} ${data.errorCount}`);
      }

      // Response time metrics
      for (const [, data] of Object.entries(stats)) {
        if (data.count > 0) {
          lines.push(`http_request_duration_seconds{method="${data.method}",path="${data.path}",quantile="0.5"} ${data.avgResponseTime / 1000}`);
          lines.push(`http_request_duration_seconds{method="${data.method}",path="${data.path}",quantile="0.95"} ${data.maxResponseTime / 1000}`);
          lines.push(`http_request_duration_seconds{method="${data.method}",path="${data.path}",quantile="0.99"} ${data.maxResponseTime / 1000}`);
        }
      }

      return lines.join('\n') + '\n';
    } catch (error) {
      logger.warn('Error generating Prometheus metrics:', error);
      return '# Error generating metrics\n';
    }
  }

  /**
   * Clear all metrics
   */
  async clearMetrics(): Promise<void> {
    try {
      const keys = await redis.keys(`${this.METRICS_KEY_PREFIX}*`);
      if (keys.length > 0) {
        await redis.del(...keys);
      }
    } catch (error) {
      logger.warn('Error clearing metrics:', error);
    }
  }
}

export const metricsService = new MetricsService();




