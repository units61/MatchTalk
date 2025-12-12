import React from 'react';
import renderer from 'react-test-renderer';
import RoomCard from '../src/components/room/RoomCard';
import {Room} from '../src/types/room';

const room: Room = {
  id: 'r1',
  name: 'Test Room',
  category: 'Kategori',
  participants: [],
  maxParticipants: 8,
  durationSec: 300,
  timeLeftSec: 200,
  malePercent: 50,
  femalePercent: 50,
  extended: false,
  extensionVotes: {yes: 1, no: 0},
};

describe('RoomCard', () => {
  it('renders correctly', () => {
    const tree = renderer
      .create(<RoomCard room={room} onJoin={() => {}} />)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});




