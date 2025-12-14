import React from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';
import {colors} from '../../theme/colors';

interface AvatarProps {
  name: string;
  avatar?: string;
  uri?: string; // Alias for avatar prop for compatibility
  size?: number;
  showBorder?: boolean;
}

const Avatar: React.FC<AvatarProps> = ({
  name,
  avatar,
  uri,
  size = 40,
  showBorder = false,
}) => {
  // Use uri if provided, otherwise use avatar
  const avatarUri = uri || avatar;
  const initials = name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);

  return (
    <View
      style={[
        styles.container,
        {
          width: size,
          height: size,
          borderRadius: size / 2,
          borderWidth: showBorder ? 2 : 0,
        },
      ]}>
      {avatarUri ? (
        <Image
          source={{uri: avatarUri}}
          style={[styles.image, {width: size, height: size, borderRadius: size / 2}]}
        />
      ) : (
        <View
          style={[
            styles.initialsContainer,
            {width: size, height: size, borderRadius: size / 2},
          ]}>
          <Text style={[styles.initials, {fontSize: size * 0.4}]}>
            {initials}
          </Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    overflow: 'hidden',
    borderColor: '#fff',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  initialsContainer: {
    backgroundColor: colors.cardDark,
    alignItems: 'center',
    justifyContent: 'center',
  },
  initials: {
    fontWeight: 'bold',
    color: colors.textPrimary,
  },
});

export default Avatar;
