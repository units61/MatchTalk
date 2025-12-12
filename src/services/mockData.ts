import {Room} from '../types/room';
import {User} from '../types/user';

export const mockUsers: User[] = [
  {
    id: 'u1',
    name: 'Ayşe',
    gender: 'female',
    avatar: 'https://i.pravatar.cc/150?img=47',
    online: true,
  },
  {
    id: 'u2',
    name: 'Mehmet',
    gender: 'male',
    avatar: 'https://i.pravatar.cc/150?img=12',
    online: true,
  },
  {
    id: 'u3',
    name: 'Elif',
    gender: 'female',
    avatar: 'https://i.pravatar.cc/150?img=32',
    online: true,
  },
  {
    id: 'u4',
    name: 'Can',
    gender: 'male',
    avatar: 'https://i.pravatar.cc/150?img=5',
    online: true,
  },
  {
    id: 'u5',
    name: 'Deniz',
    gender: 'female',
    avatar: 'https://i.pravatar.cc/150?img=56',
    online: true,
  },
  {
    id: 'u6',
    name: 'Kerem',
    gender: 'male',
    avatar: 'https://i.pravatar.cc/150?img=28',
    online: true,
  },
];

const p = (ids: string[]) =>
  ids.map(id => mockUsers.find(u => u.id === id)!).filter(Boolean);

export const mockRooms: Room[] = [
  {
    id: 'r1',
    name: 'Chill Vibes & Music',
    category: 'Müzik ve Sohbet',
    participants: p(['u1', 'u2', 'u3', 'u4']),
    maxParticipants: 8,
    durationSec: 300,
    timeLeftSec: 272,
    malePercent: 50,
    femalePercent: 50,
    extended: false,
    extensionVotes: {yes: 1, no: 0},
  },
  {
    id: 'r2',
    name: 'Gece Sohbetleri 🌙',
    category: 'Genel Sohbet',
    participants: p(['u5', 'u6', 'u1', 'u2']),
    maxParticipants: 8,
    durationSec: 300,
    timeLeftSec: 555,
    malePercent: 50,
    femalePercent: 50,
    extended: false,
    extensionVotes: {yes: 0, no: 0},
  },
];

export const mockFriends: User[] = [mockUsers[0], mockUsers[1], mockUsers[2]];




