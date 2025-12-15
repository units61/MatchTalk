import React from 'react';
import {
  Pressable,
  Text,
  StyleSheet,
  ViewStyle,
  TextStyle,
  View,
} from 'react-native';
import {colors} from '../../theme/colors';
import {spacing} from '../../theme/spacing';
import {typography} from '../../theme/typography';
import {radius} from '../../theme/radius';
import Icon from './Icon';

type Variant = 'primary' | 'outline' | 'ghost';
type Size = 'sm' | 'md' | 'lg';

interface Props {
  title: string;
  onPress: () => void;
  variant?: Variant;
  size?: Size;
  style?: ViewStyle;
  textStyle?: TextStyle;
  disabled?: boolean;
  fullWidth?: boolean;
  rightIcon?: string;
}

const sizeStyles: Record<Size, ViewStyle> = {
  sm: {paddingVertical: spacing.sm, paddingHorizontal: spacing.lg},
  md: {paddingVertical: spacing.md, paddingHorizontal: spacing.xl},
  lg: {paddingVertical: spacing.lg, paddingHorizontal: spacing.xl},
};

export const Button: React.FC<Props> = ({
  title,
  onPress,
  variant = 'primary',
  size = 'md',
  style,
  textStyle,
  disabled,
  fullWidth,
  rightIcon,
}) => {
  return (
    <Pressable
      onPress={onPress}
      disabled={disabled}
      accessibilityRole="button"
      accessibilityLabel={title}
      accessibilityState={{disabled: !!disabled}}
      style={({hovered, pressed}) => [
        styles.base,
        sizeStyles[size],
        variant === 'primary' && styles.primary,
        variant === 'outline' && styles.outline,
        variant === 'ghost' && styles.ghost,
        fullWidth && {width: '100%'},
        hovered && variant === 'primary' && styles.primaryHover,
        hovered && variant === 'outline' && styles.outlineHover,
        pressed && styles.pressed,
        disabled && styles.disabled,
        style,
      ]}>
      <View style={styles.row}>
        <Text
          style={[
            styles.text,
            variant === 'outline' && styles.textOutline,
            variant === 'ghost' && styles.textGhost,
            disabled && styles.textDisabled,
            textStyle,
          ]}>
          {title}
        </Text>
        {rightIcon ? <Icon name={rightIcon} style={styles.rightIcon} /> : null}
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  base: {
    borderRadius: radius.full,
    alignItems: 'center',
    justifyContent: 'center',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.xs,
  },
  primary: {
    backgroundColor: colors.primary,
  },
  primaryHover: {
    backgroundColor: colors.primaryHover,
  },
  outline: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: colors.primary,
  },
  outlineHover: {
    borderColor: colors.primaryHover,
  },
  ghost: {
    backgroundColor: 'transparent',
  },
  pressed: {
    transform: [{scale: 0.99}],
  },
  disabled: {
    opacity: 0.6,
  },
  text: {
    ...typography.bodyBold,
    color: '#fff',
  },
  textOutline: {
    color: colors.primary,
  },
  textGhost: {
    color: colors.textPrimary,
  },
  textDisabled: {
    color: colors.textSecondary,
  },
  rightIcon: {
    color: '#111827',
    fontSize: 18,
  },
});

export default Button;
