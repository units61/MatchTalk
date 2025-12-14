import {io, Socket} from 'socket.io-client';
import {apiClient} from './apiClient';
import {config} from './config';

class WebSocketClient {
  private socket: Socket | null = null;
  private reconnectAttempts = 0;
  private maxReconnectAttempts = 5;

  async connect(): Promise<Socket> {
    if (this.socket?.connected) {
      console.log('[WebSocket] Already connected');
      return this.socket;
    }

    const token = await apiClient.getToken();
    if (!token) {
      throw new Error('No authentication token available');
    }

    console.log('[WebSocket] Connecting to:', config.api.wsBaseUrl);

    // If socket exists but not connected, disconnect first
    if (this.socket) {
      this.socket.removeAllListeners(); // Clean up all listeners
      this.socket.disconnect();
      this.socket = null;
    }

    this.socket = io(config.api.wsBaseUrl, {
      auth: {
        token,
      },
      transports: ['websocket', 'polling'],
      reconnection: true,
      reconnectionDelay: 1000,
      reconnectionAttempts: this.maxReconnectAttempts,
      timeout: 20000, // 20 second connection timeout
    });

    // Wait for connection with timeout
    return new Promise((resolve, reject) => {
      let resolved = false;
      const timeout = setTimeout(() => {
        if (!resolved) {
          resolved = true;
          console.error('[WebSocket] Connection timeout after 15 seconds');
          // Clean up listeners
          if (this.socket) {
            this.socket.off('connect', connectHandler);
            this.socket.off('connect_error', errorHandler);
          }
          reject(new Error('WebSocket connection timeout'));
        }
      }, 15000); // 15 second timeout

      const connectHandler = () => {
        if (!resolved) {
          resolved = true;
          clearTimeout(timeout);
          console.log('[WebSocket] Connected successfully');
          this.reconnectAttempts = 0;
          if (this.socket) {
            this.socket.off('connect', connectHandler);
            this.socket.off('connect_error', errorHandler);
          }
          resolve(this.socket!);
        }
      };

      const errorHandler = (error: Error) => {
        if (!resolved) {
          resolved = true;
          clearTimeout(timeout);
          console.error('[WebSocket] Connection error:', error);
          this.reconnectAttempts++;
          if (this.socket) {
            this.socket.off('connect', connectHandler);
            this.socket.off('connect_error', errorHandler);
          }
          const errorMessage = error.message || String(error);
          reject(new Error(`WebSocket connection failed: ${errorMessage}`));
        }
      };

      // Check if already connected (can happen with fast connections)
      if (this.socket!.connected) {
        if (!resolved) {
          resolved = true;
          clearTimeout(timeout);
          console.log('[WebSocket] Connected immediately');
          this.reconnectAttempts = 0;
          resolve(this.socket!);
        }
        return;
      }

      this.socket!.on('connect', connectHandler);
      this.socket!.on('connect_error', errorHandler);

      this.socket!.on('disconnect', (reason) => {
        console.log('[WebSocket] Disconnected:', reason);
      });
    });
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
  async joinRoom(roomId: string) {
    try {
      if (!this.socket || !this.socket.connected) {
        // Try to connect first
        console.log('[WebSocket] Socket not connected, attempting to connect...');
        try {
          await this.connect();
        } catch (connectError) {
          const connectErrorMessage = connectError instanceof Error ? connectError.message : String(connectError);
          console.warn(`[WebSocket] Connection failed, but continuing with joinRoom attempt: ${connectErrorMessage}`);
          // Don't throw here - try to emit anyway if socket exists
          if (!this.socket || !this.socket.connected) {
            throw new Error(`WebSocket bağlantısı kurulamadı. Backend WebSocket server çalışmıyor olabilir: ${connectErrorMessage}`);
          }
        }
      }
      
      if (!this.socket) {
        throw new Error('Socket instance is null after connection attempt');
      }
      
      if (!this.socket.connected) {
        // Try one more time to check connection status
        await new Promise(resolve => setTimeout(resolve, 500));
        if (!this.socket.connected) {
          throw new Error('Socket connection failed - socket is not connected. Backend WebSocket server çalışmıyor olabilir.');
        }
      }
      
      console.log(`[WebSocket] Joining room: ${roomId}`);
      this.socket.emit('join-room', {roomId});
      console.log(`[WebSocket] Join room event emitted for: ${roomId}`);
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : String(error);
      console.error(`[WebSocket] Error in joinRoom for ${roomId}:`, errorMessage);
      console.error('[WebSocket] Error details:', error);
      throw new Error(`WebSocket bağlantı hatası: ${errorMessage}`);
    }
  }

  async leaveRoom(roomId: string) {
    if (!this.socket || !this.socket.connected) {
      return; // Already disconnected, no need to emit
    }
    this.socket.emit('leave-room', {roomId});
  }

  async voteExtension(roomId: string, vote: 'yes' | 'no') {
    if (!this.socket || !this.socket.connected) {
      await this.connect();
    }
    if (!this.socket || !this.socket.connected) {
      throw new Error('Socket not connected');
    }
    this.socket.emit('vote-extension', {roomId, vote});
  }

  // Matching events
  async joinMatching() {
    if (!this.socket || !this.socket.connected) {
      await this.connect();
    }
    if (!this.socket || !this.socket.connected) {
      throw new Error('Socket not connected');
    }
    this.socket.emit('matching-join');
  }

  async leaveMatching() {
    if (!this.socket || !this.socket.connected) {
      return; // Already disconnected
    }
    this.socket.emit('matching-leave');
  }

  async getMatchingStatus() {
    if (!this.socket || !this.socket.connected) {
      await this.connect();
    }
    if (!this.socket || !this.socket.connected) {
      throw new Error('Socket not connected');
    }
    this.socket.emit('matching-status');
  }

  // Event listeners
  on(event: string, callback: (...args: any[]) => void) {
    if (!this.socket) {
      // Queue the listener to be set up when socket connects
      this.connect().then(() => {
        if (this.socket) {
          this.socket.on(event, callback);
        }
      }).catch(() => {
        // Connection failed, listener won't be set up
      });
      return;
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

