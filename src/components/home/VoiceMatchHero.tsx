import React, {useEffect, useRef, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  Animated,
  Platform,
  ViewStyle,
} from 'react-native';
import Icon from '../common/Icon';
import {spacing} from '../../theme/spacing';
import {radius} from '../../theme/radius';
import {colors} from '../../theme/colors';

type Status = 'idle' | 'connecting' | 'connected';

interface VoiceMatchHeroProps {
  containerStyle?: ViewStyle;
}

const VoiceMatchHero: React.FC<VoiceMatchHeroProps> = ({containerStyle}) => {
  const [status, setStatus] = useState<Status>('idle');

  const ringOuter = useRef(new Animated.Value(0)).current;
  const ringMiddle = useRef(new Animated.Value(0)).current;
  const ringInner = useRef(new Animated.Value(0)).current;
  const buttonGlow = useRef(new Animated.Value(0)).current;
  const pressAnim = useRef(new Animated.Value(1)).current;
  const headerIconAnim = useRef(new Animated.Value(0)).current;
  const sparkleAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const mkLoop = (value: Animated.Value, duration: number, delay = 0) =>
      Animated.loop(
        Animated.sequence([
          Animated.delay(delay),
          Animated.timing(value, {
            toValue: 1,
            duration,
            useNativeDriver: false,
          }),
          Animated.timing(value, {
            toValue: 0,
            duration,
            useNativeDriver: false,
          }),
        ]),
      );

    const outerLoop = mkLoop(ringOuter, 2500, 0);
    const middleLoop = mkLoop(ringMiddle, 2500, 300);
    const innerLoop = mkLoop(ringInner, 2500, 600);
    const glowLoop = mkLoop(buttonGlow, 3000, 0);
    const headerLoop = mkLoop(headerIconAnim, 20000, 0);
    const sparkleLoop = mkLoop(sparkleAnim, 3000, 0);

    outerLoop.start();
    middleLoop.start();
    innerLoop.start();
    glowLoop.start();
    headerLoop.start();
    sparkleLoop.start();

    return () => {
      outerLoop.stop();
      middleLoop.stop();
      innerLoop.stop();
      glowLoop.stop();
      headerLoop.stop();
      sparkleLoop.stop();
    };
  }, [ringOuter, ringMiddle, ringInner, buttonGlow, headerIconAnim, sparkleAnim]);

  const handleConnect = () => {
    if (status !== 'idle') return;
    setStatus('connecting');

    setTimeout(() => {
      setStatus('connected');
    }, 2000);
  };

  const handleDisconnect = () => {
    setStatus('idle');
  };

  const isConnecting = status === 'connecting';
  const isConnected = status === 'connected';

  const outerScale = ringOuter.interpolate({
    inputRange: [0, 1],
    outputRange: [1, 1.4],
  });
  const outerOpacity = ringOuter.interpolate({
    inputRange: [0, 1],
    outputRange: [0.6, 0],
  });

  const middleScale = ringMiddle.interpolate({
    inputRange: [0, 1],
    outputRange: [1, 1.6],
  });
  const middleOpacity = ringMiddle.interpolate({
    inputRange: [0, 1],
    outputRange: [0.5, 0],
  });

  const innerScale = ringInner.interpolate({
    inputRange: [0, 1],
    outputRange: [1, 1.8],
  });
  const innerOpacity = ringInner.interpolate({
    inputRange: [0, 1],
    outputRange: [0.4, 0],
  });

  const glowOpacity = buttonGlow.interpolate({
    inputRange: [0, 1],
    outputRange: [0.4, 0.9],
  });

  const primaryColor = isConnected ? '#22c55e' : '#4f46e5';

  const onHoverTo = (target: number) => {
    Animated.spring(pressAnim, {
      toValue: target,
      useNativeDriver: true,
      friction: 6,
      tension: 80,
    }).start();
  };

  return (
    <View style={[styles.container, containerStyle]}>
      {/* Header card */}
      <View style={styles.headerCard}>
        <Animated.View
          style={[
            styles.headerIconWrapper,
            {
              transform: [
                {
                  rotate: headerIconAnim.interpolate({
                    inputRange: [0, 1],
                    outputRange: ['0deg', '360deg'],
                  }),
                },
              ],
            },
          ]}>
          <Icon name="wifi_tethering" style={styles.headerIcon} />
        </Animated.View>
        <View style={styles.headerTextWrapper}>
          <Text style={styles.headerTitle}>Oda Bul</Text>
          <Text style={styles.headerSubtitle}>Sesli sohbet odalarına anında katıl</Text>
        </View>
        <Animated.View
          style={[
            styles.sparkleWrapper,
            {
              transform: [
                {
                  rotate: sparkleAnim.interpolate({
                    inputRange: [0, 1],
                    outputRange: ['0deg', '360deg'],
                  }),
                },
                {
                  scale: sparkleAnim.interpolate({
                    inputRange: [0, 0.5, 1],
                    outputRange: [1, 1.2, 1],
                  }),
                },
              ],
            },
          ]}>
          <Icon name="auto_awesome" style={styles.sparkleIcon} />
        </Animated.View>
      </View>

      {/* Mic button */}
      <View style={styles.micArea}>
        {/* Pulsing rings */}
        <Animated.View
          style={[
            styles.ringBase,
            styles.ringOuter,
            {transform: [{scale: outerScale}], opacity: outerOpacity},
          ]}
        />
        <Animated.View
          style={[
            styles.ringBase,
            styles.ringMiddle,
            {transform: [{scale: middleScale}], opacity: middleOpacity},
          ]}
        />
        <Animated.View
          style={[
            styles.ringBase,
            styles.ringInner,
            {transform: [{scale: innerScale}], opacity: innerOpacity},
          ]}
        />

        <Pressable
          onPress={isConnected ? handleDisconnect : handleConnect}
          onHoverIn={() => onHoverTo(1.05)}
          onHoverOut={() => onHoverTo(1)}
          onPressIn={() => onHoverTo(0.95)}
          onPressOut={() => onHoverTo(1.05)}
          style={styles.micPressable}>
          <Animated.View
            style={[
              styles.micButton,
              {
                backgroundColor: primaryColor,
                transform: [{scale: pressAnim}],
              },
            ]}>
            <Animated.View
              style={[
                styles.micInnerGlow,
                {
                  opacity: glowOpacity,
                },
              ]}
            />
            {isConnecting ? (
              <Animated.View
                style={{
                  transform: [
                    {
                      rotate: buttonGlow.interpolate({
                        inputRange: [0, 1],
                        outputRange: ['0deg', '360deg'],
                      }),
                    },
                  ],
                }}>
                <Icon name="autorenew" style={styles.micIcon} />
              </Animated.View>
            ) : (
              <Icon name="mic" style={styles.micIcon} />
            )}
          </Animated.View>
        </Pressable>
      </View>

      {/* Status text */}
      {!isConnected && !isConnecting && (
        <View style={styles.statusCard}>
          <Text style={styles.statusText}>Başlamak için mikrofona dokunun</Text>
        </View>
      )}
      {isConnecting && (
        <View style={styles.statusCard}>
          <Text style={styles.statusText}>Oda aranıyor...</Text>
        </View>
      )}
      {isConnected && (
        <View style={styles.statusCard}>
          <Text style={styles.statusText}>Odaya bağlandınız! Tekrar dokunarak ayrıl.</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    maxWidth: 420,
    alignItems: 'center',
    gap: spacing.xl,
  },
  headerCard: {
    width: '100%',
    paddingVertical: spacing.lg,
    paddingHorizontal: spacing.lg,
    borderRadius: radius.xl,
    backgroundColor: 'rgba(15, 23, 42, 0.9)',
    borderWidth: 1,
    borderColor: 'rgba(148, 163, 184, 0.5)',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    shadowColor: '#000',
    shadowOpacity: 0.35,
    shadowRadius: 20,
    shadowOffset: {width: 0, height: 12},
    ...Platform.select({
      web: {
        backdropFilter: 'blur(20px)' as any,
      },
    }),
  },
  headerIconWrapper: {
    marginBottom: spacing.md,
  },
  headerIcon: {
    fontSize: 28,
    color: '#22d3ee',
  },
  headerTextWrapper: {
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: '#e2e8f0',
  },
  headerSubtitle: {
    marginTop: spacing.xs,
    fontSize: 14,
    color: 'rgba(148,163,184,0.9)',
  },
  sparkleWrapper: {
    position: 'absolute',
    top: spacing.sm,
    right: spacing.sm,
  },
  sparkleIcon: {
    fontSize: 18,
    color: '#facc15',
  },
  micArea: {
    width: 260,
    height: 260,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: spacing.xl,
  },
  ringBase: {
    position: 'absolute',
    inset: 0,
    borderRadius: 130,
    borderWidth: 4,
  },
  ringOuter: {
    borderColor: 'rgba(34,211,238,0.5)',
  },
  ringMiddle: {
    borderColor: 'rgba(168,85,247,0.4)',
  },
  ringInner: {
    borderColor: 'rgba(236,72,153,0.4)',
  },
  micPressable: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  micButton: {
    width: 208,
    height: 208,
    borderRadius: 104,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.25)',
    shadowColor: '#22d3ee',
    shadowOpacity: 0.6,
    shadowRadius: 24,
    shadowOffset: {width: 0, height: 0},
    ...Platform.select({
      web: {
        backdropFilter: 'blur(24px)' as any,
      },
    }),
  },
  micInnerGlow: {
    position: 'absolute',
    inset: spacing.lg,
    borderRadius: 999,
    backgroundColor: 'rgba(255,255,255,0.2)',
  },
  micIcon: {
    fontSize: 40,
    color: '#fff',
  },
  statusCard: {
    marginTop: spacing.lg,
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.lg,
    borderRadius: radius.xl,
    backgroundColor: 'rgba(15, 23, 42, 0.8)',
    borderWidth: 1,
    borderColor: 'rgba(148,163,184,0.4)',
    ...Platform.select({
      web: {
        backdropFilter: 'blur(16px)' as any,
      },
    }),
  },
  statusText: {
    fontSize: 14,
    color: '#e2e8f0',
  },
});

export default VoiceMatchHero;

