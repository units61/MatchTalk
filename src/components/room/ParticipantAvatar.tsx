import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import Avatar from '../common/Avatar';
import Icon from '../common/Icon';
import {typography} from '../../theme/typography';
import {colors} from '../../theme/colors';
import {spacing} from '../../theme/spacing';
import {radius} from '../../theme/radius';

interface Props {
  name: string;
  avatar?: string;
  size?: number;
  isActiveSpeaker?: boolean;
  isMuted?: boolean;
  isSpeaking?: boolean; // Deprecated, use isActiveSpeaker
}

export const ParticipantAvatar: React.FC<Props> = ({
  name,
  avatar,
  size = 64,
  isActiveSpeaker,
  isMuted,
  isSpeaking,
}) => {
  const active = isActiveSpeaker || isSpeaking;
  return (
    <View style={styles.container}>
      <View style={[styles.avatarWrapper, active && styles.activeSpeaker]}>
        {avatar ? (
          <Avatar uri={avatar} size={size} />
        ) : (
          <View style={[styles.placeholderAvatar, {width: size, height: size}]}>
            <Text style={[styles.placeholderText, {fontSize: size * 0.3}]}>
              {name
                .split(' ')
                .map((n) => n[0])
                .join('')
                .toUpperCase()
                .slice(0, 2)}
            </Text>
          </View>
        )}
        {isMuted && (
          <View style={styles.mutedOverlay}>
            <Icon name="mic_off" style={styles.mutedIcon} />
          </View>
        )}
        {active && (
          <View style={styles.activeIndicator}>
            <Icon name="mic" style={styles.activeIcon} />
          </View>
        )}
      </View>
      <Text style={styles.name}>{name}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  avatarWrapper: {
    position: 'relative',
    borderRadius: radius.full,
    borderWidth: 2,
    borderColor: colors.border,
    overflow: 'hidden',
  },
  activeSpeaker: {
    borderWidth: 3,
    borderColor: colors.primary,
    shadowColor: colors.primary,
    shadowOffset: {width: 0, height: 0},
    shadowOpacity: 0.6,
    shadowRadius: 10,
  },
  placeholderAvatar: {
    backgroundColor: colors.cardDark,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: radius.full,
  },
  placeholderText: {
    fontWeight: 'bold',
    color: colors.textSecondary,
  },
  mutedOverlay: {
    position: 'absolute',
    inset: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: radius.full,
  },
  mutedIcon: {
    fontSize: 24,
    color: 'rgba(255, 255, 255, 0.8)',
  },
  activeIndicator: {
    position: 'absolute',
    bottom: -4,
    right: -4,
    backgroundColor: colors.primary,
    borderRadius: radius.full,
    padding: 4,
    borderWidth: 2,
    borderColor: colors.backgroundDark,
  },
  activeIcon: {
    fontSize: 12,
    color: '#fff',
  },
  name: {
    ...typography.caption,
    color: '#fff',
    marginTop: spacing.xs,
    fontSize: 12,
    fontWeight: '500',
  },
});

export default ParticipantAvatar;



