import React, {useEffect, useRef} from 'react';
import {View, StyleSheet, Pressable, Platform, Animated} from 'react-native';
import {useToastStore} from '../../stores/toastStore';
import Toast from './Toast';
import Icon from '../common/Icon';
import {spacing} from '../../theme/spacing';
import {colors} from '../../theme/colors';

interface ToastItemProps {
  toast: {
    id: string;
    message: string;
    type: 'success' | 'error' | 'warning' | 'info';
  };
  onRemove: (id: string) => void;
}

const ToastItem: React.FC<ToastItemProps> = ({toast, onRemove}) => {
  const slideAnim = useRef(new Animated.Value(-100)).current;
  const opacityAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // Giriş animasyonu
    Animated.parallel([
      Animated.spring(slideAnim, {
        toValue: 0,
        useNativeDriver: false, // Changed to false for web compatibility
        tension: 50,
        friction: 8,
      }),
      Animated.timing(opacityAnim, {
        toValue: 1,
        duration: 300,
        useNativeDriver: false, // Changed to false for web compatibility
      }),
    ]).start();
  }, []);

  const handleRemove = () => {
    Animated.parallel([
      Animated.timing(slideAnim, {
        toValue: -100,
        duration: 250,
        useNativeDriver: false, // Changed to false for web compatibility
      }),
      Animated.timing(opacityAnim, {
        toValue: 0,
        duration: 250,
        useNativeDriver: false, // Changed to false for web compatibility
      }),
    ]).start(() => {
      onRemove(toast.id);
    });
  };

  return (
    <Animated.View
      style={[
        styles.toastWrapper,
        {
          transform: [{translateX: slideAnim}],
          opacity: opacityAnim,
        },
        {pointerEvents: 'auto' as any},
      ]}>
      <Toast message={toast.message} type={toast.type} style={styles.toast} />
      <Pressable style={styles.closeButton} onPress={handleRemove}>
        <Icon name="close" style={styles.closeIcon} />
      </Pressable>
    </Animated.View>
  );
};

const ToastContainer: React.FC = () => {
  const toasts = useToastStore((state) => state.toasts);
  const removeToast = useToastStore((state) => state.removeToast);

  if (toasts.length === 0) {
    return null;
  }

  return (
    <View style={[styles.container, {pointerEvents: 'box-none' as any}]}>
      {toasts.map((toast) => (
        <ToastItem key={toast.id} toast={toast} onRemove={removeToast} />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: Platform.select({
      web: 20,
      default: 50,
    }),
    right: spacing.md,
    left: spacing.md,
    alignItems: 'flex-end',
    zIndex: 99999, // Increased z-index
    gap: spacing.sm,
    ...Platform.select({
      web: {
        maxWidth: 500, // Increased from 420
        alignSelf: 'flex-end',
        position: 'fixed' as any, // Use fixed positioning on web
      },
    }),
  },
  toastWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    maxWidth: 500, // Increased from 420
    gap: spacing.sm,
  },
  toast: {
    flex: 1,
  },
  closeButton: {
    width: 28,
    height: 28,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 14,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    ...Platform.select({
      web: {
        cursor: 'pointer',
      },
    }),
  },
  closeIcon: {
    fontSize: 18,
    color: '#ffffff',
  },
});

export default ToastContainer;











