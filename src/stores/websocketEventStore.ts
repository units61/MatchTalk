import {create} from 'zustand';
import {websocketClient} from '../lib/websocketClient';

type WebSocketEvent =
  | 'room-update'
  | 'room-created'
  | 'room-closed'
  | 'room-joined'
  | 'room-left'
  | 'room-error'
  | 'timer-update'
  | 'vote-result'
  | 'vote-recorded'
  | 'extension-vote-start'
  | 'participant-joined'
  | 'participant-left'
  | 'match-found'
  | 'matching-progress'
  | 'matching-joined'
  | 'matching-left';

type EventHandler = (data: any) => void;

interface WebSocketEventState {
  listeners: Map<WebSocketEvent, Set<EventHandler>>;
  
  // Actions
  subscribe: (event: WebSocketEvent, handler: EventHandler) => () => void;
  unsubscribe: (event: WebSocketEvent, handler: EventHandler) => void;
  emit: (event: WebSocketEvent, data: any) => void;
  setupListeners: () => void;
  cleanupListeners: () => void;
}

export const useWebSocketEventStore = create<WebSocketEventState>((set, get) => {
  const listeners = new Map<WebSocketEvent, Set<EventHandler>>();

  const setupListeners = () => {
    const socket = websocketClient.getSocket();
    if (!socket || !socket.connected) {
      return;
    }

    // Setup a single listener for each event type that dispatches to all handlers
    const events: WebSocketEvent[] = [
      'room-update',
      'room-created',
      'room-closed',
      'room-joined',
      'room-left',
      'room-error',
      'timer-update',
      'vote-result',
      'vote-recorded',
      'extension-vote-start',
      'participant-joined',
      'participant-left',
      'match-found',
      'matching-progress',
      'matching-joined',
      'matching-left',
    ];

    events.forEach((event) => {
      // Remove existing listener to avoid duplicates
      socket.off(event);
      
      // Add new listener that dispatches to all registered handlers
      socket.on(event, (data: any) => {
        const currentListeners = get().listeners.get(event);
        if (currentListeners) {
          currentListeners.forEach((handler) => {
            try {
              handler(data);
            } catch (error) {
              console.error(`Error in ${event} handler:`, error);
            }
          });
        }
      });
    });
  };

  const cleanupListeners = () => {
    const socket = websocketClient.getSocket();
    if (!socket) {
      return;
    }

    const events: WebSocketEvent[] = [
      'room-update',
      'room-created',
      'room-closed',
      'room-joined',
      'room-left',
      'room-error',
      'timer-update',
      'vote-result',
      'vote-recorded',
      'extension-vote-start',
      'participant-joined',
      'participant-left',
      'match-found',
      'matching-progress',
      'matching-joined',
      'matching-left',
    ];

    events.forEach((event) => {
      socket.off(event);
    });
  };

  return {
    listeners,

    subscribe: (event: WebSocketEvent, handler: EventHandler) => {
      const currentListeners = get().listeners;
      if (!currentListeners.has(event)) {
        currentListeners.set(event, new Set());
      }
      currentListeners.get(event)!.add(handler);

      // Setup listeners if socket is connected
      const socket = websocketClient.getSocket();
      if (socket && socket.connected) {
        setupListeners();
      }

      // Return unsubscribe function
      return () => {
        get().unsubscribe(event, handler);
      };
    },

    unsubscribe: (event: WebSocketEvent, handler: EventHandler) => {
      const handlers = listeners.get(event);
      if (handlers) {
        handlers.delete(handler);
        if (handlers.size === 0) {
          listeners.delete(event);
        }
      }
    },

    emit: (event: WebSocketEvent, data: any) => {
      const handlers = listeners.get(event);
      if (handlers) {
        handlers.forEach((handler) => {
          try {
            handler(data);
          } catch (error) {
            console.error(`Error in ${event} handler:`, error);
          }
        });
      }
    },

    setupListeners,
    cleanupListeners,
  };
});












