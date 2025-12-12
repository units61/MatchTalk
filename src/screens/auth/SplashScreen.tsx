import React, {useEffect} from 'react';
import {View, Text, StyleSheet, Platform} from 'react-native';
import {typography} from '../../theme/typography';
import {spacing} from '../../theme/spacing';
import Icon from '../../components/common/Icon';

interface Props {
  onReady: () => void;
}

const SplashScreen: React.FC<Props> = ({onReady}) => {
  useEffect(() => {
    const t = setTimeout(onReady, 800);
    return () => clearTimeout(t);
  }, [onReady]);

  return (
    <View style={styles.container}>
      <View style={styles.logoWrap}>
        <View style={styles.glow} />
        <View style={styles.logoCircle}>
          <Icon name="graphic_eq" style={styles.logoIcon} />
        </View>
      </View>
      <Text style={styles.title}>MatchTalk</Text>
      <Text style={styles.subtitle}>Voice Chat &amp; Meet</Text>
      <View style={styles.dots}>
        <View style={styles.dot} />
        <View style={styles.dot} />
        <View style={[styles.dot, styles.dotActive]} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    minHeight: '100vh',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: spacing.xl,
    ...(Platform.OS === 'web'
      ? {backgroundImage: 'linear-gradient(180deg, #0d1c33 0%, #0b1425 100%)'}
      : {backgroundColor: '#0b1425'}),
  },
  logoWrap: {
    width: 140,
    height: 140,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.lg,
  },
  glow: {
    position: 'absolute',
    width: 140,
    height: 140,
    borderRadius: 70,
    backgroundColor: 'rgba(255,255,255,0.05)',
    shadowColor: '#e5e7eb',
    shadowOpacity: 0.5,
    shadowRadius: 18,
    shadowOffset: {width: 0, height: 0},
  },
  logoCircle: {
    width: 96,
    height: 96,
    borderRadius: 48,
    backgroundColor: 'rgba(255,255,255,0.08)',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.12)',
  },
  logoIcon: {
    fontSize: 36,
    color: '#e5e7eb',
  },
  title: {
    ...typography.h2,
    color: '#e5e7eb',
    marginTop: spacing.sm,
  },
  subtitle: {
    ...typography.caption,
    color: '#cbd5e1',
    marginTop: spacing.xs,
  },
  dots: {
    flexDirection: 'row',
    marginTop: spacing.xl,
    gap: spacing.sm,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#444',
  },
  dotActive: {
    backgroundColor: '#facc15',
  },
});

export default SplashScreen;
