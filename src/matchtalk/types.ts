export interface User {
  id: string;
  name: string;
  avatar: string;
  status: 'online' | 'offline' | 'busy' | 'speaking';
  level?: number;
}

export interface Room {
  id: string;
  title: string;
  category: string;
  participants: User[];
  maxParticipants: number;
  timeLeft?: string;
  isLive: boolean;
}

export interface Notification {
  id: string;
  type: 'invite' | 'like' | 'system' | 'friend';
  title: string;
  description: string;
  time: string;
  isRead: boolean;
  avatar?: string;
}

export enum AppRoute {
  SPLASH = '/',
  ONBOARDING = '/onboarding',
  LOGIN = '/login',
  HOME = '/home',
  ROOM = '/room',
  PROFILE = '/profile',
  SETTINGS = '/settings',
  NOTIFICATIONS = '/notifications',
  CREATE_ROOM = '/create-room'
}