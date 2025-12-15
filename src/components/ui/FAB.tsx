import React from 'react';
import {View, Text, StyleSheet, Pressable, Platform, Alert} from 'react-native';
import Icon from '../common/Icon';
import {colors} from '../../theme/colors';
import {spacing} from '../../theme/spacing';
import {radius} from '../../theme/radius';

interface FABProps {
  onPress: () => void;
  label?: string;
}

const FAB: React.FC<FABProps> = ({onPress, label = 'Yeni Odaya Katıl'}) => {
  const handlePress = (e?: any) => {
    e?.stopPropagation?.();
    onPress();
  };

  return (
    <View style={styles.container}>
      <Pressable
        style={styles.button}
        onPress={handlePress}
        hitSlop={{top: 10, bottom: 10, left: 10, right: 10}}
        accessibilityRole="button"
        accessibilityLabel={label}
        accessibilityHint="Yeni bir sohbet odası oluşturmak için tıklayın">
        <Icon name="add_circle" style={styles.icon} />
        <Text style={styles.label}>{label}</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 100,
    left: 0,
    right: 0,
    alignItems: 'center',
    zIndex: 1000, // Yüksek z-index - diğer elementlerin üstünde olmalı
    paddingHorizontal: spacing.xl,
    pointerEvents: 'box-none', // Container tıklamaları geçirir, sadece içindeki elementler tıklanabilir
    ...Platform.select({
      web: {
        pointerEvents: 'box-none',
      },
    }),
  },
  button: {
    width: '100%',
    maxWidth: 420,
    height: 70,
    backgroundColor: '#6366f1',
    borderRadius: 24,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.md,
    shadowColor: '#6366f1',
    shadowOffset: {width: 0, height: 12},
    shadowOpacity: 0.32,
    shadowRadius: 20,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.08)',
    ...Platform.select({
      web: {
        cursor: 'pointer',
        userSelect: 'none',
        pointerEvents: 'auto', // Buton tıklanabilir olmalı
        zIndex: 1001,
      },
    }),
  },
  icon: {
    fontSize: 28,
    color: '#0b0d17',
  },
  label: {
    fontSize: 18,
    fontWeight: '600',
    color: '#0b0d17',
    letterSpacing: 0.5,
  },
});

export default FAB;
