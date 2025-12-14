import React from 'react';
import {View, Text, StyleSheet, ViewStyle} from 'react-native';
import {colors} from '../../theme/colors';
import {spacing} from '../../theme/spacing';
import {radius} from '../../theme/radius';
import {typography} from '../../theme/typography';

interface Props {
  label: string;
  style?: ViewStyle;
}

export const Badge: React.FC<Props> = ({label, style}) => {
  return (
    <View style={[styles.container, style]}>
      <Text style={styles.text}>{label}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.primary,
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
    borderRadius: radius.full,
  },
  text: {
    ...typography.caption,
    color: '#fff',
    fontWeight: '700',
  },
});

export default Badge;














