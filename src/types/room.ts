export interface Participant {
  id: string;
  name: string;
  gender: 'male' | 'female';
  avatar?: string;
}

export interface Room {
  id: string;
  name: string;
  category: string;
  maxParticipants: number;
  currentParticipants: number;
  timeLeftSec: number;
  durationSec: number;
  extended: boolean;
  extensionYes?: number;
  extensionNo?: number;
  participants: Participant[];
  maleCount: number;
  femaleCount: number;
  createdAt: string;
}

export interface CreateRoomInput {
  name: string;
  category: string;
  maxParticipants?: number;
  durationSec?: number;
}
