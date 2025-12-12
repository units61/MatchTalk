import {io, Socket} from 'socket.io-client';
import {apiClient} from './apiClient';

const WS_BASE_URL =
  (typeof process !== 'undefined' && process.env?.WS_BASE_URL) || 'http://localhost:4000';

class WebSocketClient {
  private socket: Socket | null = null;
  private reconnectAttempts = 0;
  private maxReconnectAttempts = 5;

  async connect(): Promise<Socket> {
    if (this.socket?.connected) {
      return this.socket;
    }

    const token = await apiClient.getToken();
    if (!token) {
      throw new Error('No authentication token available');
    }

    this.socket = io(WS_BASE_URL, {
      auth: {
        token,
      },
      transports: ['websocket', 'polling'],
      reconnection: true,
      reconnectionDelay: 1000,
      reconnectionAttempts: this.maxReconnectAttempts,
    });

    this.socket.on('connect', () => {
      console.log('WebSocket connected');
      this.reconnectAttempts = 0;
    });

    this.socket.on('disconnect', (reason) => {
      console.log('WebSocket disconnected:', reason);
    });

    this.socket.on('connect_error', (error) => {
      console.error('WebSocket connection error:', error);
      this.reconnectAttempts++;
      if (this.reconnectAttempts >= this.maxReconnectAttempts) {
        console.error('Max reconnection attempts reached');
      }
    });

    return this.socket;
  }

  disconnect() {
    if (this.socket) {
      this.socket.disconnect();
      this.socket = null;
    }
  }

  getSocket(): Socket | null {
    return this.socket;
  }

  isConnected(): boolean {
    return this.socket?.connected || false;
  }

  // Room events
  joinRoom(roomId: string) {
    if (!this.socket) {
      throw new Error('Socket not connected');
    }
    this.socket.emit('join-room', {roomId});
  }

  leaveRoom(roomId: string) {
    if (!this.socket) {
      throw new Error('Socket not connected');
    }
    this.socket.emit('leave-room', {roomId});
  }

  voteExtension(roomId: string, vote: 'yes' | 'no') {
    if (!this.socket) {
      throw new Error('Socket not connected');
    }
    this.socket.emit('vote-extension', {roomId, vote});
  }

  // Matching events
  joinMatching() {
    if (!this.socket) {
      throw new Error('Socket not connected');
    }
    this.socket.emit('matching-join');
  }

  leaveMatching() {
    if (!this.socket) {
      throw new Error('Socket not connected');
    }
    this.socket.emit('matching-leave');
  }

  getMatchingStatus() {
    if (!this.socket) {
      throw new Error('Socket not connected');
    }
    this.socket.emit('matching-status');
  }

  // Event listeners
  on(event: string, callback: (...args: any[]) => void) {
    if (!this.socket) {
      throw new Error('Socket not connected');
    }
    this.socket.on(event, callback);
  }

  off(event: string, callback?: (...args: any[]) => void) {
    if (!this.socket) {
      return;
    }
    if (callback) {
      this.socket.off(event, callback);
    } else {
      this.socket.off(event);
    }
  }
}

export const websocketClient = new WebSocketClient();

