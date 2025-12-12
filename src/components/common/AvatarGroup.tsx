import React from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';
import Avatar from './Avatar';
import {colors} from '../../theme/colors';
import {spacing} from '../../theme/spacing';

interface AvatarGroupProps {
  avatars: Array<{
    id: string;
    name: string;
    avatar?: string;
  }>;
  maxVisible?: number;
  size?: number;
}

const AvatarGroup: React.FC<AvatarGroupProps> = ({
  avatars,
  maxVisible = 4,
  size = 40,
}) => {
  const visibleAvatars = avatars.slice(0, maxVisible);
  const remainingCount = Math.max(0, avatars.length - maxVisible);

  return (
    <View style={styles.container}>
      {visibleAvatars.map((avatar, index) => (
        <View
          key={avatar.id}
          style={[
            styles.avatarWrapper,
            {
              width: size,
              height: size,
              marginLeft: index > 0 ? -12 : 0,
            },
          ]}>
          <Avatar
            name={avatar.name}
            avatar={avatar.avatar}
            size={size}
            showBorder
          />
        </View>
      ))}
      {remainingCount > 0 && (
        <View
          style={[
            styles.remainingWrapper,
            {
              width: size,
              height: size,
              marginLeft: visibleAvatars.length > 0 ? -12 : 0,
            },
          ]}>
          <View style={[styles.remaining, {width: size, height: size}]}>
            <Text style={[styles.remainingText, {fontSize: size * 0.3}]}>
              +{remainingCount}
            </Text>
          </View>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: spacing.xs,
  },
  avatarWrapper: {
    borderRadius: 9999,
    borderWidth: 2,
    borderColor: '#fff',
    overflow: 'hidden',
  },
  remainingWrapper: {
    borderRadius: 9999,
    borderWidth: 2,
    borderColor: '#fff',
    overflow: 'hidden',
  },
  remaining: {
    backgroundColor: '#f1f5f9',
    alignItems: 'center',
    justifyContent: 'center',
  },
  remainingText: {
    fontWeight: 'bold',
    color: colors.textSecondary,
  },
});

export default AvatarGroup;
