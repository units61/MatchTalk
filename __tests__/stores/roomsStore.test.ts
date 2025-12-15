import {renderHook, act} from '@testing-library/react';
import {useRoomsStore} from '../../src/stores/roomsStore';
import {roomsApi} from '../../src/services/api/roomsApi';

// Mock roomsApi
jest.mock('../../src/services/api/roomsApi');

describe('RoomsStore', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should have initial state', () => {
    const {result} = renderHook(() => useRoomsStore());
    expect(result.current.rooms).toEqual([]);
    expect(result.current.currentRoom).toBeNull();
    expect(result.current.loading).toBe(false);
    expect(result.current.error).toBeNull();
  });

  it('should fetch rooms successfully', async () => {
    const mockRooms = [
      {
        id: '1',
        name: 'Test Room',
        category: 'general',
        maxParticipants: 8,
        currentParticipants: 2,
        timeLeftSec: 300,
        durationSec: 300,
        extended: false,
        participants: [],
        maleCount: 1,
        femaleCount: 1,
        createdAt: new Date().toISOString(),
      },
    ];

    (roomsApi.getRooms as jest.Mock).mockResolvedValue(mockRooms);

    const {result} = renderHook(() => useRoomsStore());

    await act(async () => {
      await result.current.fetchRooms();
    });

    expect(result.current.rooms).toEqual(mockRooms);
    expect(result.current.loading).toBe(false);
  });

  it('should handle fetch error', async () => {
    const mockError = new Error('Failed to fetch');
    (roomsApi.getRooms as jest.Mock).mockRejectedValue(mockError);

    const {result} = renderHook(() => useRoomsStore());

    await act(async () => {
      await result.current.fetchRooms();
    });

    expect(result.current.error).toBe('Failed to fetch');
    expect(result.current.loading).toBe(false);
  });
});


