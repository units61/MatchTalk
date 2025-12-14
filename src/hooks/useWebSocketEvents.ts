import {useEffect, useRef} from 'react';
import {useWebSocketEventStore} from '../stores/websocketEventStore';
import {useRoomsStore} from '../stores/roomsStore';
import {useNavigation} from './useNavigation';
import {WebSocketEvent} from '../stores/websocketEventStore';

interface UseWebSocketEventsOptions {
  onRoomUpdate?: (data: any) => void;
  onRoomCreated?: (data: any) => void;
  onRoomClosed?: (data: any) => void;
  onTimerUpdate?: (data: any) => void;
  onVoteResult?: (data: any) => void;
  onParticipantJoined?: (data: any) => void;
  onParticipantLeft?: (data: any) => void;
  onMatchFound?: (data: any) => void;
  onMatchingProgress?: (data: any) => void;
}

export const useWebSocketEvents = (options: UseWebSocketEventsOptions = {}) => {
  const subscribe = useWebSocketEventStore((state) => state.subscribe);
  const {fetchRooms, updateRoom} = useRoomsStore();
  const navigation = useNavigation();
  const optionsRef = useRef(options);

  // Update options ref
  useEffect(() => {
    optionsRef.current = options;
  }, [options]);

  useEffect(() => {
    const unsubscribers: Array<() => void> = [];

    // Room update handler
    if (options.onRoomUpdate || true) {
      const unsubscribe = subscribe('room-update', (data: any) => {
        if (data.room) {
          updateRoom(data.room.id, data.room);
        }
        optionsRef.current.onRoomUpdate?.(data);
      });
      unsubscribers.push(unsubscribe);
    }

    // Room created handler
    if (options.onRoomCreated || true) {
      const unsubscribe = subscribe('room-created', (data: any) => {
        fetchRooms();
        optionsRef.current.onRoomCreated?.(data);
      });
      unsubscribers.push(unsubscribe);
    }

    // Room closed handler
    if (options.onRoomClosed || true) {
      const unsubscribe = subscribe('room-closed', (data: {roomId: string; reason: string}) => {
        fetchRooms();
        // Navigate back if we're in the closed room
        const currentParams = navigation.currentParams;
        if (currentParams?.roomId === data.roomId) {
          navigation.goBack();
        }
        optionsRef.current.onRoomClosed?.(data);
      });
      unsubscribers.push(unsubscribe);
    }

    // Timer update handler
    if (options.onTimerUpdate) {
      const unsubscribe = subscribe('timer-update', (data: any) => {
        optionsRef.current.onTimerUpdate?.(data);
      });
      unsubscribers.push(unsubscribe);
    }

    // Vote result handler
    if (options.onVoteResult) {
      const unsubscribe = subscribe('vote-recorded', (data: any) => {
        optionsRef.current.onVoteResult?.(data);
      });
      unsubscribers.push(unsubscribe);
    }

    // Participant joined handler
    if (options.onParticipantJoined) {
      const unsubscribe = subscribe('room-update', (data: any) => {
        if (data.joinedUser) {
          optionsRef.current.onParticipantJoined?.(data);
        }
      });
      unsubscribers.push(unsubscribe);
    }

    // Participant left handler
    if (options.onParticipantLeft) {
      const unsubscribe = subscribe('room-update', (data: any) => {
        if (data.leftUser) {
          optionsRef.current.onParticipantLeft?.(data);
        }
      });
      unsubscribers.push(unsubscribe);
    }

    // Match found handler
    if (options.onMatchFound) {
      const unsubscribe = subscribe('match-found', (data: any) => {
        optionsRef.current.onMatchFound?.(data);
      });
      unsubscribers.push(unsubscribe);
    }

    // Matching progress handler
    if (options.onMatchingProgress) {
      const unsubscribe = subscribe('matching-progress', (data: any) => {
        optionsRef.current.onMatchingProgress?.(data);
      });
      unsubscribers.push(unsubscribe);
    }

    return () => {
      unsubscribers.forEach((unsubscribe) => unsubscribe());
    };
  }, [subscribe, fetchRooms, updateRoom, navigation, options]);
};









