/**
 * WebSocket Mock for Testing
 * Provides mock Socket.IO server and socket instances for testing
 */

import { Server as SocketIOServer, Socket } from 'socket.io';
import { EventEmitter } from 'events';

export interface MockSocketEvents {
  [event: string]: any[];
}

export class MockSocket extends EventEmitter {
  public id: string;
  public userId?: string;
  public rooms: Set<string> = new Set();
  public handshake: {
    auth: { token?: string };
    headers: { authorization?: string };
    address: string;
  };

  private emittedEvents: MockSocketEvents = {};

  constructor(id: string = `mock-socket-${Date.now()}`) {
    super();
    this.id = id;
    this.handshake = {
      auth: {},
      headers: {},
      address: '127.0.0.1',
    };
  }

  join(room: string): Promise<void> {
    this.rooms.add(room);
    return Promise.resolve();
  }

  leave(room: string): Promise<void> {
    this.rooms.delete(room);
    return Promise.resolve();
  }

  emit(event: string, ...args: any[]): boolean {
    if (!this.emittedEvents[event]) {
      this.emittedEvents[event] = [];
    }
    this.emittedEvents[event].push(args);
    return true;
  }

  to(room: string): MockSocket {
    // Return a socket that will emit to the room
    return this;
  }

  getEmittedEvents(): MockSocketEvents {
    return { ...this.emittedEvents };
  }

  clearEmittedEvents(): void {
    this.emittedEvents = {};
  }

  disconnect(): void {
    this.emit('disconnect');
  }
}

export class MockSocketIOServer extends EventEmitter {
  public sockets: Map<string, MockSocket> = new Map();
  private rooms: Map<string, Set<string>> = new Map();

  constructor() {
    super();
  }

  to(room: string): MockSocketIOServer {
    return this;
  }

  emit(event: string, ...args: any[]): boolean {
    // Emit to all sockets
    for (const socket of this.sockets.values()) {
      socket.emit(event, ...args);
    }
    return true;
  }

  on(event: string, callback: (...args: any[]) => void): this {
    super.on(event, callback);
    return this;
  }

  use(middleware: (socket: MockSocket, next: (err?: Error) => void) => void): this {
    // Mock middleware registration
    return this;
  }

  createSocket(id?: string): MockSocket {
    const socket = new MockSocket(id);
    this.sockets.set(socket.id, socket);
    return socket;
  }

  getSocket(id: string): MockSocket | undefined {
    return this.sockets.get(id);
  }

  // Helper to simulate room joining
  joinRoom(socketId: string, room: string): void {
    const socket = this.sockets.get(socketId);
    if (socket) {
      socket.join(room);
      if (!this.rooms.has(room)) {
        this.rooms.set(room, new Set());
      }
      this.rooms.get(room)!.add(socketId);
    }
  }

  // Helper to emit to a specific room
  emitToRoom(room: string, event: string, ...args: any[]): void {
    const roomSockets = this.rooms.get(room);
    if (roomSockets) {
      for (const socketId of roomSockets) {
        const socket = this.sockets.get(socketId);
        if (socket) {
          socket.emit(event, ...args);
        }
      }
    }
  }

  // Helper to emit to a specific user
  emitToUser(userId: string, event: string, ...args: any[]): void {
    for (const socket of this.sockets.values()) {
      if (socket.userId === userId) {
        socket.emit(event, ...args);
      }
    }
  }

  clear(): void {
    this.sockets.clear();
    this.rooms.clear();
  }
}

/**
 * Create a mock Socket.IO server
 */
export function createMockSocketIOServer(): MockSocketIOServer {
  return new MockSocketIOServer();
}

/**
 * Create a mock socket
 */
export function createMockSocket(id?: string): MockSocket {
  return new MockSocket(id);
}
