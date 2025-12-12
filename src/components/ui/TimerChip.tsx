import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import Icon from '../common/Icon';
import {colors} from '../../theme/colors';
import {spacing} from '../../theme/spacing';
import {radius} from '../../theme/radius';

interface TimerChipProps {
  time: string; // Format: "MM:SS"
}

const TimerChip: React.FC<TimerChipProps> = ({time}) => {
  return (
    <View style={styles.container}>
      <Icon name="timer" style={styles.icon} />
      <Text style={styles.time}>{time}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm / 2,
    backgroundColor: 'rgba(100, 103, 242, 0.1)',
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm + 2,
    borderRadius: radius.full,
  },
  icon: {
    fontSize: 18,
    color: colors.primaryIndigo,
  },
  time: {
    fontSize: 14,
    fontWeight: 'bold',
    color: colors.primaryIndigo,
    fontVariant: ['tabular-nums'],
  },
});

export default TimerChip;
