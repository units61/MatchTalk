import {useEffect, useRef} from 'react';
import {websocketClient} from '../lib/websocketClient';
import {useAuthStore} from '../stores/authStore';

interface UseWebSocketOptions {
  onConnect?: () => void;
  onDisconnect?: () => void;
  onError?: (error: Error) => void;
}

export const useWebSocket = (options: UseWebSocketOptions = {}) => {
  const {isAuthenticated} = useAuthStore();
  const {onConnect, onDisconnect, onError} = options;
  const callbacksRef = useRef(options);

  // Update callbacks ref when options change
  useEffect(() => {
    callbacksRef.current = options;
  }, [options]);

  useEffect(() => {
    if (!isAuthenticated) {
      websocketClient.disconnect();
      return;
    }

    let mounted = true;

    const connect = async () => {
      try {
        const socket = await websocketClient.connect();

        if (!mounted) {
          return;
        }

        socket.on('connect', () => {
          callbacksRef.current.onConnect?.();
        });

        socket.on('disconnect', () => {
          callbacksRef.current.onDisconnect?.();
        });

        socket.on('connect_error', (error) => {
          callbacksRef.current.onError?.(error as Error);
        });
      } catch (error) {
        if (mounted) {
          callbacksRef.current.onError?.(error as Error);
        }
      }
    };

    connect();

    return () => {
      mounted = false;
      websocketClient.disconnect();
    };
  }, [isAuthenticated]);

  return {
    socket: websocketClient.getSocket(),
    isConnected: websocketClient.isConnected(),
    joinRoom: websocketClient.joinRoom.bind(websocketClient),
    leaveRoom: websocketClient.leaveRoom.bind(websocketClient),
    voteExtension: websocketClient.voteExtension.bind(websocketClient),
    joinMatching: websocketClient.joinMatching.bind(websocketClient),
    leaveMatching: websocketClient.leaveMatching.bind(websocketClient),
    getMatchingStatus: websocketClient.getMatchingStatus.bind(websocketClient),
    on: websocketClient.on.bind(websocketClient),
    off: websocketClient.off.bind(websocketClient),
  };
};

