import React from 'react';
import renderer from 'react-test-renderer';
import RoomCard from '../src/components/room/RoomCard';

const mockParticipants = [
  {id: '1', name: 'User 1', avatar: undefined, gender: 'male' as const},
  {id: '2', name: 'User 2', avatar: undefined, gender: 'female' as const},
];

describe('RoomCard', () => {
  it('renders correctly', () => {
    const tree = renderer
      .create(
        <RoomCard
          id="r1"
          name="Test Room"
          category="Kategori"
          timeLeft={200}
          participants={mockParticipants}
          maxParticipants={8}
          maleCount={1}
          femaleCount={1}
          onJoin={() => {}}
        />
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders correctly with empty participants', () => {
    const tree = renderer
      .create(
        <RoomCard
          id="r2"
          name="Empty Room"
          category="Test"
          timeLeft={300}
          participants={[]}
          maxParticipants={8}
          maleCount={0}
          femaleCount={0}
          onJoin={() => {}}
        />
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});

















