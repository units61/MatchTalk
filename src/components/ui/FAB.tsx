import React from 'react';
import {View, Text, StyleSheet, Pressable, Platform} from 'react-native';
import Icon from '../common/Icon';
import {colors} from '../../theme/colors';
import {spacing} from '../../theme/spacing';
import {radius} from '../../theme/radius';

interface FABProps {
  onPress: () => void;
  label?: string;
}

const FAB: React.FC<FABProps> = ({onPress, label = 'Yeni Odaya Katıl'}) => {
  return (
    <View style={styles.container}>
      <Pressable style={styles.button} onPress={onPress}>
        <Icon name="add_circle" style={styles.icon} />
        <Text style={styles.label}>{label}</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 90,
    left: 0,
    right: 0,
    alignItems: 'center',
    zIndex: 30,
    paddingHorizontal: spacing.xl,
    pointerEvents: 'box-none',
    ...Platform.select({
      web: {
        pointerEvents: 'none',
      },
    }),
  },
  button: {
    width: '100%',
    maxWidth: 400,
    height: 64,
    backgroundColor: colors.primaryIndigo,
    borderRadius: radius.full,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.md,
    shadowColor: colors.primaryIndigo,
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 0.3,
    shadowRadius: 12,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
    ...Platform.select({
      web: {
        pointerEvents: 'auto',
      },
    }),
  },
  icon: {
    fontSize: 28,
    color: '#fff',
  },
  label: {
    fontSize: 18,
    fontWeight: '600',
    color: '#fff',
    letterSpacing: 0.5,
  },
});

export default FAB;
