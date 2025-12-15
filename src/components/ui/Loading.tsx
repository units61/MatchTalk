import React from 'react';
import {ActivityIndicator, View, StyleSheet, ViewStyle, Text} from 'react-native';
import {colors} from '../../theme/colors';
import {spacing} from '../../theme/spacing';
import {typography} from '../../theme/typography';

interface LoadingProps {
  fullScreen?: boolean;
  inline?: boolean;
  message?: string;
  size?: 'small' | 'large';
  style?: ViewStyle;
}

export const Loading: React.FC<LoadingProps> = ({
  fullScreen = false,
  inline = false,
  message,
  size = 'large',
  style,
}) => {
  if (inline) {
    return (
      <View style={[styles.inlineContainer, style]}>
        <ActivityIndicator size={size} color={colors.primary} />
        {message && <Text style={styles.message}>{message}</Text>}
      </View>
    );
  }

  if (fullScreen) {
    return (
      <View style={[styles.fullScreenContainer, style]}>
        <ActivityIndicator size={size} color={colors.primary} />
        {message && <Text style={styles.message}>{message}</Text>}
      </View>
    );
  }

  return (
    <View style={[styles.container, style]}>
      <ActivityIndicator size={size} color={colors.primary} />
      {message && <Text style={styles.message}>{message}</Text>}
    </View>
  );
};

export const ButtonLoading: React.FC<{size?: number}> = ({size = 16}) => {
  return <ActivityIndicator size="small" color="#fff" style={{width: size, height: size}} />;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: spacing.xl,
  },
  fullScreenContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    zIndex: 999,
  },
  inlineContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.sm,
    padding: spacing.md,
  },
  message: {
    ...typography.body,
    color: colors.textSecondaryMain,
    marginTop: spacing.sm,
  },
});

export default Loading;

















