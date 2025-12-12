import React from 'react';
import {View, Text, StyleSheet, Pressable, Image} from 'react-native';
import AvatarGroup from '../common/AvatarGroup';
import TimerChip from '../ui/TimerChip';
import GenderBar from '../ui/GenderBar';
import Icon from '../common/Icon';
import {colors} from '../../theme/colors';
import {spacing} from '../../theme/spacing';
import {typography} from '../../theme/typography';
import {radius} from '../../theme/radius';

interface RoomCardProps {
  id: string;
  name: string;
  category: string;
  timeLeft: number; // seconds
  participants: Array<{
    id: string;
    name: string;
    avatar?: string;
    gender: 'male' | 'female';
  }>;
  maxParticipants: number;
  maleCount: number;
  femaleCount: number;
  onJoin: () => void;
}

const RoomCard: React.FC<RoomCardProps> = ({
  name,
  category,
  timeLeft,
  participants,
  maxParticipants,
  maleCount,
  femaleCount,
  onJoin,
}) => {
  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const malePercentage = (maleCount / participants.length) * 100;

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>{name}</Text>
          <Text style={styles.category}>{category}</Text>
        </View>
        <TimerChip time={formatTime(timeLeft)} />
      </View>

      {/* Avatars */}
      <View style={styles.avatarsContainer}>
        <AvatarGroup
          avatars={participants.map((p) => ({
            id: p.id,
            name: p.name,
            avatar: p.avatar,
          }))}
          maxVisible={4}
          size={40}
        />
      </View>

      {/* Bottom Stats */}
      <View style={styles.footer}>
        {/* Participants Count */}
        <View style={styles.participantsCount}>
          <Icon name="group" style={styles.groupIcon} />
          <Text style={styles.countText}>
            {participants.length}/{maxParticipants}
          </Text>
        </View>

        {/* Gender Bar */}
        <GenderBar
          malePercentage={malePercentage}
          femalePercentage={100 - malePercentage}
          width={96}
        />

        {/* Join Button */}
        <Pressable style={styles.joinButton} onPress={onJoin}>
          <Text style={styles.joinButtonText}>Katıl</Text>
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    borderRadius: radius.xl,
    padding: spacing.xl,
    marginBottom: spacing.md,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.05,
    shadowRadius: 2,
    borderWidth: 1,
    borderColor: '#f1f5f9',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: spacing.md,
  },
  titleContainer: {
    flex: 1,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.textPrimary,
    marginBottom: spacing.xs / 2,
  },
  category: {
    fontSize: 14,
    color: colors.textMuted,
    marginTop: 2,
  },
  avatarsContainer: {
    marginBottom: spacing.xl,
  },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: spacing.md,
    borderTopWidth: 1,
    borderTopColor: '#f1f5f9',
  },
  participantsCount: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  groupIcon: {
    fontSize: 20,
    color: colors.textSecondary,
  },
  countText: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.textSecondary,
  },
  joinButton: {
    backgroundColor: '#f1f5f9',
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.xl,
    borderRadius: radius.full,
  },
  joinButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.textPrimary,
  },
});

export default RoomCard;
