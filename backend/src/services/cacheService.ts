import {redis} from '../lib/redis';
import {logger} from '../logger';
import {config} from '../config';

// Cache key prefixes
const CACHE_PREFIXES = {
  USER: 'user:',
  ROOM: 'room:',
  ROOMS_LIST: 'rooms:list',
  USER_BADGES: 'user:badges:',
  LEADERBOARD: 'leaderboard:',
} as const;

// Default TTL (Time To Live) in seconds
const DEFAULT_TTL = {
  USER: 3600, // 1 hour
  ROOM: 300, // 5 minutes
  ROOMS_LIST: 60, // 1 minute
  USER_BADGES: 1800, // 30 minutes
  LEADERBOARD: 300, // 5 minutes
} as const;

class CacheService {
  private enabled: boolean;

  constructor() {
    // Cache'i sadece Redis varsa etkinleştir
    this.enabled = config.nodeEnv === 'production' || process.env.ENABLE_CACHE === 'true';
  }

  /**
   * Cache'den değer al
   */
  async get<T>(key: string): Promise<T | null> {
    if (!this.enabled) {
      return null;
    }

    try {
      const value = await redis.get(key);
      if (value) {
        return JSON.parse(value) as T;
      }
      return null;
    } catch (error) {
      logger.warn('Cache get error', {key, error: error instanceof Error ? error.message : String(error)});
      return null;
    }
  }

  /**
   * Cache'e değer kaydet
   */
  async set(key: string, value: any, ttlSeconds?: number): Promise<void> {
    if (!this.enabled) {
      return;
    }

    try {
      const serialized = JSON.stringify(value);
      if (ttlSeconds) {
        await redis.setex(key, ttlSeconds, serialized);
      } else {
        await redis.set(key, serialized);
      }
    } catch (error) {
      logger.warn('Cache set error', {key, error: error instanceof Error ? error.message : String(error)});
    }
  }

  /**
   * Cache'den değer sil
   */
  async delete(key: string): Promise<void> {
    if (!this.enabled) {
      return;
    }

    try {
      await redis.del(key);
    } catch (error) {
      logger.warn('Cache delete error', {key, error: error instanceof Error ? error.message : String(error)});
    }
  }

  /**
   * Pattern'e göre cache'leri sil
   */
  async deletePattern(pattern: string): Promise<void> {
    if (!this.enabled) {
      return;
    }

    try {
      const keys = await redis.keys(pattern);
      if (keys.length > 0) {
        await redis.del(...keys);
      }
    } catch (error) {
      logger.warn('Cache deletePattern error', {pattern, error: error instanceof Error ? error.message : String(error)});
    }
  }

  /**
   * User cache operations
   */
  async getUser(userId: string) {
    const key = `${CACHE_PREFIXES.USER}${userId}`;
    return this.get(key);
  }

  async setUser(userId: string, userData: any) {
    const key = `${CACHE_PREFIXES.USER}${userId}`;
    await this.set(key, userData, DEFAULT_TTL.USER);
  }

  async deleteUser(userId: string) {
    const key = `${CACHE_PREFIXES.USER}${userId}`;
    await this.delete(key);
  }

  /**
   * Room cache operations
   */
  async getRoom(roomId: string) {
    const key = `${CACHE_PREFIXES.ROOM}${roomId}`;
    return this.get(key);
  }

  async setRoom(roomId: string, roomData: any) {
    const key = `${CACHE_PREFIXES.ROOM}${roomId}`;
    await this.set(key, roomData, DEFAULT_TTL.ROOM);
  }

  async deleteRoom(roomId: string) {
    const key = `${CACHE_PREFIXES.ROOM}${roomId}`;
    await this.delete(key);
  }

  /**
   * Rooms list cache operations
   */
  async getRoomsList() {
    return this.get(CACHE_PREFIXES.ROOMS_LIST);
  }

  async setRoomsList(rooms: any[]) {
    await this.set(CACHE_PREFIXES.ROOMS_LIST, rooms, DEFAULT_TTL.ROOMS_LIST);
  }

  async deleteRoomsList() {
    await this.delete(CACHE_PREFIXES.ROOMS_LIST);
  }

  /**
   * User badges cache operations
   */
  async getUserBadges(userId: string) {
    const key = `${CACHE_PREFIXES.USER_BADGES}${userId}`;
    return this.get(key);
  }

  async setUserBadges(userId: string, badges: any[]) {
    const key = `${CACHE_PREFIXES.USER_BADGES}${userId}`;
    await this.set(key, badges, DEFAULT_TTL.USER_BADGES);
  }

  async deleteUserBadges(userId: string) {
    const key = `${CACHE_PREFIXES.USER_BADGES}${userId}`;
    await this.delete(key);
  }

  /**
   * Leaderboard cache operations
   */
  async getLeaderboard(limit: number) {
    const key = `${CACHE_PREFIXES.LEADERBOARD}${limit}`;
    return this.get(key);
  }

  async setLeaderboard(limit: number, leaderboard: any[]) {
    const key = `${CACHE_PREFIXES.LEADERBOARD}${limit}`;
    await this.set(key, leaderboard, DEFAULT_TTL.LEADERBOARD);
  }

  async deleteLeaderboard(limit?: number) {
    if (limit) {
      const key = `${CACHE_PREFIXES.LEADERBOARD}${limit}`;
      await this.delete(key);
    } else {
      // Delete all leaderboard caches
      await this.deletePattern(`${CACHE_PREFIXES.LEADERBOARD}*`);
    }
  }

  /**
   * Cache'i temizle (tüm cache'leri sil)
   */
  async clearAll(): Promise<void> {
    if (!this.enabled) {
      return;
    }

    try {
      await redis.flushdb();
      logger.info('Cache cleared');
    } catch (error) {
      logger.error('Cache clearAll error', {error: error instanceof Error ? error.message : String(error)});
    }
  }
}

export const cacheService = new CacheService();
