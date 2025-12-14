/**
 * Redis Mock for Testing
 * Provides a mock Redis instance that can be used in tests
 */

export interface MockRedisCommand {
  command: string;
  args: any[];
  result?: any;
}

export class MockRedis {
  private data: Map<string, string> = new Map();
  private lists: Map<string, string[]> = new Map();
  private sets: Map<string, Set<string>> = new Map();
  private commands: MockRedisCommand[] = [];

  // String operations
  async get(key: string): Promise<string | null> {
    this.commands.push({ command: 'get', args: [key] });
    return this.data.get(key) || null;
  }

  async set(key: string, value: string): Promise<'OK'> {
    this.commands.push({ command: 'set', args: [key, value] });
    this.data.set(key, value);
    return 'OK';
  }

  async del(key: string): Promise<number> {
    this.commands.push({ command: 'del', args: [key] });
    const existed = this.data.has(key);
    if (existed) {
      this.data.delete(key);
      return 1;
    }
    return 0;
  }

  // List operations
  async lpush(key: string, ...values: string[]): Promise<number> {
    this.commands.push({ command: 'lpush', args: [key, ...values] });
    if (!this.lists.has(key)) {
      this.lists.set(key, []);
    }
    const list = this.lists.get(key)!;
    list.unshift(...values);
    return list.length;
  }

  async rpush(key: string, ...values: string[]): Promise<number> {
    this.commands.push({ command: 'rpush', args: [key, ...values] });
    if (!this.lists.has(key)) {
      this.lists.set(key, []);
    }
    const list = this.lists.get(key)!;
    list.push(...values);
    return list.length;
  }

  async lpop(key: string, count?: number): Promise<string | string[] | null> {
    this.commands.push({ command: 'lpop', args: [key, count] });
    const list = this.lists.get(key);
    if (!list || list.length === 0) {
      return null;
    }

    if (count && count > 1) {
      const items = list.splice(0, count);
      return items.length > 0 ? items : null;
    }

    const item = list.shift();
    return item || null;
  }

  async rpop(key: string): Promise<string | null> {
    this.commands.push({ command: 'rpop', args: [key] });
    const list = this.lists.get(key);
    if (!list || list.length === 0) {
      return null;
    }
    const item = list.pop();
    return item || null;
  }

  async llen(key: string): Promise<number> {
    this.commands.push({ command: 'llen', args: [key] });
    const list = this.lists.get(key);
    return list ? list.length : 0;
  }

  async lpos(key: string, element: string): Promise<number | null> {
    this.commands.push({ command: 'lpos', args: [key, element] });
    const list = this.lists.get(key);
    if (!list) {
      return null;
    }
    const index = list.indexOf(element);
    return index >= 0 ? index : null;
  }

  async lrem(key: string, count: number, value: string): Promise<number> {
    this.commands.push({ command: 'lrem', args: [key, count, value] });
    const list = this.lists.get(key);
    if (!list) {
      return 0;
    }

    if (count === 0) {
      // Remove all occurrences
      const originalLength = list.length;
      const filtered = list.filter(item => item !== value);
      this.lists.set(key, filtered);
      return originalLength - filtered.length;
    }

    let removed = 0;
    if (count > 0) {
      // Remove from left
      for (let i = 0; i < list.length && removed < count; i++) {
        if (list[i] === value) {
          list.splice(i, 1);
          removed++;
          i--; // Adjust index after removal
        }
      }
    } else {
      // Remove from right
      for (let i = list.length - 1; i >= 0 && removed < Math.abs(count); i--) {
        if (list[i] === value) {
          list.splice(i, 1);
          removed++;
        }
      }
    }

    return removed;
  }

  async lrange(key: string, start: number, stop: number): Promise<string[]> {
    this.commands.push({ command: 'lrange', args: [key, start, stop] });
    const list = this.lists.get(key);
    if (!list) {
      return [];
    }
    const end = stop >= 0 ? stop + 1 : list.length + stop + 1;
    return list.slice(start, end);
  }

  // Set operations
  async sadd(key: string, ...members: string[]): Promise<number> {
    this.commands.push({ command: 'sadd', args: [key, ...members] });
    if (!this.sets.has(key)) {
      this.sets.set(key, new Set());
    }
    const set = this.sets.get(key)!;
    let added = 0;
    for (const member of members) {
      if (!set.has(member)) {
        set.add(member);
        added++;
      }
    }
    return added;
  }

  async srem(key: string, ...members: string[]): Promise<number> {
    this.commands.push({ command: 'srem', args: [key, ...members] });
    const set = this.sets.get(key);
    if (!set) {
      return 0;
    }
    let removed = 0;
    for (const member of members) {
      if (set.has(member)) {
        set.delete(member);
        removed++;
      }
    }
    return removed;
  }

  async smembers(key: string): Promise<string[]> {
    this.commands.push({ command: 'smembers', args: [key] });
    const set = this.sets.get(key);
    return set ? Array.from(set) : [];
  }

  // Utility methods
  clear(): void {
    this.data.clear();
    this.lists.clear();
    this.sets.clear();
    this.commands = [];
  }

  getCommands(): MockRedisCommand[] {
    return [...this.commands];
  }

  resetCommands(): void {
    this.commands = [];
  }

  // Event emitters (for compatibility)
  on(event: string, callback: (...args: any[]) => void): this {
    // Mock implementation - no-op for tests
    return this;
  }

  once(event: string, callback: (...args: any[]) => void): this {
    // Mock implementation - no-op for tests
    return this;
  }

  emit(event: string, ...args: any[]): boolean {
    // Mock implementation - no-op for tests
    return true;
  }

  // Connection methods
  async connect(): Promise<void> {
    // Mock implementation
  }

  async disconnect(): Promise<void> {
    // Mock implementation
  }

  quit(): Promise<'OK'> {
    return Promise.resolve('OK');
  }
}

/**
 * Create a mock Redis instance
 */
export function createMockRedis(): MockRedis {
  return new MockRedis();
}
