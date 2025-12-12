import React from 'react';
import {View, Text, StyleSheet, ViewStyle} from 'react-native';
import {colors} from '../../theme/colors';
import {spacing} from '../../theme/spacing';
import {radius} from '../../theme/radius';
import {typography} from '../../theme/typography';

interface Props {
  message: string;
  type?: 'info' | 'success' | 'error';
  style?: ViewStyle;
}

export const Toast: React.FC<Props> = ({message, type = 'info', style}) => {
  const bg =
    type === 'success'
      ? 'rgba(16,185,129,0.16)'
      : type === 'error'
      ? 'rgba(239,68,68,0.16)'
      : 'rgba(148,163,184,0.2)';
  const color =
    type === 'success'
      ? '#10b981'
      : type === 'error'
      ? '#ef4444'
      : colors.textPrimary;

  return (
    <View style={[styles.container, {backgroundColor: bg}, style]}>
      <Text style={[styles.text, {color}]}>{message}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: spacing.md,
    borderRadius: radius.md,
  },
  text: {
    ...typography.body,
  },
});

export default Toast;




