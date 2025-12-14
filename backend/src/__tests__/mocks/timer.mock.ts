/**
 * Timer Mock for Testing
 * Provides mock timer functionality for testing timer-related services
 */

export interface TimerCallback {
  (): void | Promise<void>;
}

export class MockTimer {
  private timers: Map<string, {
    intervalId: NodeJS.Timeout;
    callback: TimerCallback;
    interval: number;
    roomId: string;
  }> = new Map();

  private currentTime: number = 0;
  private timeouts: Array<{ time: number; callback: () => void }> = [];

  /**
   * Start a timer for a room
   */
  startTimer(roomId: string, callback: TimerCallback, interval: number = 1000): void {
    // Stop existing timer if any
    this.stopTimer(roomId);

    const intervalId = setInterval(() => {
      callback();
    }, interval) as unknown as NodeJS.Timeout;

    this.timers.set(roomId, {
      intervalId,
      callback,
      interval,
      roomId,
    });
  }

  /**
   * Stop a timer for a room
   */
  stopTimer(roomId: string): void {
    const timer = this.timers.get(roomId);
    if (timer) {
      clearInterval(timer.intervalId);
      this.timers.delete(roomId);
    }
  }

  /**
   * Check if a timer is running for a room
   */
  isTimerRunning(roomId: string): boolean {
    return this.timers.has(roomId);
  }

  /**
   * Get all running timers
   */
  getRunningTimers(): string[] {
    return Array.from(this.timers.keys());
  }

  /**
   * Clear all timers
   */
  clearAll(): void {
    for (const [roomId, timer] of this.timers) {
      clearInterval(timer.intervalId);
    }
    this.timers.clear();
  }

  /**
   * Advance time (for testing with jest.useFakeTimers)
   */
  advanceTime(ms: number): void {
    this.currentTime += ms;
    // Trigger any timeouts that should fire
    this.timeouts = this.timeouts.filter(timeout => {
      if (this.currentTime >= timeout.time) {
        timeout.callback();
        return false;
      }
      return true;
    });
  }

  /**
   * Set a timeout (for testing)
   */
  setTimeout(callback: () => void, ms: number): NodeJS.Timeout {
    const timeout = {
      time: this.currentTime + ms,
      callback,
    };
    this.timeouts.push(timeout);
    return setTimeout(callback, ms);
  }

  /**
   * Get current mock time
   */
  getCurrentTime(): number {
    return this.currentTime;
  }

  /**
   * Reset mock time
   */
  resetTime(): void {
    this.currentTime = 0;
    this.timeouts = [];
  }
}

/**
 * Create a mock timer instance
 */
export function createMockTimer(): MockTimer {
  return new MockTimer();
}
