/**
 * WebSocket Event Type Definitions
 */

export interface RoomUpdateEvent {
  room?: {
    id: string;
    name: string;
    category: string;
    maxParticipants: number;
    currentParticipants: number;
    timeLeftSec: number;
    durationSec: number;
    extended: boolean;
    participants: Array<{
      id: string;
      name: string;
      gender: 'male' | 'female';
      avatar?: string;
    }>;
    maleCount: number;
    femaleCount: number;
  };
  joinedUser?: {
    id: string;
    name: string;
    gender: 'male' | 'female';
    avatar?: string;
  };
  leftUser?: {
    id: string;
    name: string;
  };
}

export interface RoomCreatedEvent {
  room: {
    id: string;
    name: string;
    category: string;
    maxParticipants: number;
  };
}

export interface RoomClosedEvent {
  roomId: string;
  reason: string;
}

export interface TimerUpdateEvent {
  roomId: string;
  timeLeft: number;
}

export interface ExtensionVoteStartEvent {
  roomId: string;
  timeLeft: number;
  message?: string;
}

export interface VoteRecordedEvent {
  roomId: string;
  userId: string;
  vote: 'yes' | 'no';
}

export interface VoteResultEvent {
  roomId: string;
  extensionYes: number;
  extensionNo: number;
  extended: boolean;
}

export interface MatchFoundEvent {
  roomId: string;
  room: {
    id: string;
    name: string;
    category: string;
  };
}

export interface MatchingProgressEvent {
  participants: number;
  required: number;
  estimatedTime?: number;
}

export type WebSocketEvent =
  | {type: 'room-update'; data: RoomUpdateEvent}
  | {type: 'room-created'; data: RoomCreatedEvent}
  | {type: 'room-closed'; data: RoomClosedEvent}
  | {type: 'timer-update'; data: TimerUpdateEvent}
  | {type: 'extension-vote-start'; data: ExtensionVoteStartEvent}
  | {type: 'vote-recorded'; data: VoteRecordedEvent}
  | {type: 'vote-result'; data: VoteResultEvent}
  | {type: 'match-found'; data: MatchFoundEvent}
  | {type: 'matching-progress'; data: MatchingProgressEvent};

export interface WebSocketEventMap {
  'room-update': RoomUpdateEvent;
  'room-created': RoomCreatedEvent;
  'room-closed': RoomClosedEvent;
  'timer-update': TimerUpdateEvent;
  'extension-vote-start': ExtensionVoteStartEvent;
  'vote-recorded': VoteRecordedEvent;
  'vote-result': VoteResultEvent;
  'match-found': MatchFoundEvent;
  'matching-progress': MatchingProgressEvent;
}


