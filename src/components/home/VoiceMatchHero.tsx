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
import {colors} from '../../theme/colors';
import {spacing} from '../../theme/spacing';
import {radius} from '../../theme/radius';

type Status = 'idle' | 'connecting' | 'connected';

interface VoiceMatchHeroProps {
  containerStyle?: ViewStyle;
  onConnectPress?: () => void;
  onDisconnectPress?: () => void;
}

const VoiceMatchHero: React.FC<VoiceMatchHeroProps> = ({
  containerStyle,
  onConnectPress,
  onDisconnectPress,
}) => {
  const [status, setStatus] = useState<Status>('idle');

  const pulseOuter = useRef(new Animated.Value(0)).current;
  const pulseInner = useRef(new Animated.Value(0)).current;
  const buttonGlow = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const pulseOuterAnim = Animated.loop(
      Animated.sequence([
        Animated.timing(pulseOuter, {
          toValue: 1,
          duration: 1600,
          useNativeDriver: false, // web uyumu
        }),
        Animated.timing(pulseOuter, {
          toValue: 0,
          duration: 1600,
          useNativeDriver: false,
        }),
      ]),
    );

    const pulseInnerAnim = Animated.loop(
      Animated.sequence([
        Animated.timing(pulseInner, {
          toValue: 1,
          duration: 1800,
          useNativeDriver: false,
        }),
        Animated.timing(pulseInner, {
          toValue: 0,
          duration: 1800,
          useNativeDriver: false,
        }),
      ]),
    );

    const glowAnim = Animated.loop(
      Animated.sequence([
        Animated.timing(buttonGlow, {
          toValue: 1,
          duration: 1600,
          useNativeDriver: false,
        }),
        Animated.timing(buttonGlow, {
          toValue: 0,
          duration: 1600,
          useNativeDriver: false,
        }),
      ]),
    );

    pulseOuterAnim.start();
    pulseInnerAnim.start();
    glowAnim.start();

    return () => {
      pulseOuterAnim.stop();
      pulseInnerAnim.stop();
      glowAnim.stop();
    };
  }, [pulseOuter, pulseInner, buttonGlow]);

  const handleConnect = () => {
    if (status !== 'idle') {
      return;
    }
    setStatus('connecting');
    onConnectPress?.();

    // TODO: Gerçek entegrasyonda burada matching/oda join akışı tetiklenecek.
    // Şimdilik görsel demo: 2 saniye sonra bağlandı durumuna geç
    setTimeout(() => {
      setStatus('connected');
    }, 2000);
  };

  const handleDisconnect = () => {
    setStatus('idle');
    onDisconnectPress?.();
  };

  const isConnecting = status === 'connecting';
  const isConnected = status === 'connected';

  const outerScale = pulseOuter.interpolate({
    inputRange: [0, 1],
    outputRange: [1, 1.3],
  });
  const outerOpacity = pulseOuter.interpolate({
    inputRange: [0, 1],
    outputRange: [0.45, 0],
  });

  const innerScale = pulseInner.interpolate({
    inputRange: [0, 1],
    outputRange: [1, 1.5],
  });
  const innerOpacity = pulseInner.interpolate({
    inputRange: [0, 1],
    outputRange: [0.3, 0],
  });

  const glowOpacity = buttonGlow.interpolate({
    inputRange: [0, 1],
    outputRange: [0.3, 0.7],
  });

  const primaryColor = isConnected ? colors.success : colors.primaryIndigo;

  return (
    <View style={[styles.container, containerStyle]}>
      {/* Başlık */}
      <View style={styles.header}>
        <Text style={styles.title}>Oda Bul</Text>
        <Text style={styles.subtitle}>Sesli sohbet odalarına katıl</Text>
      </View>

      {/* Mikrofon ve animasyon */}
      <View style={styles.centerArea}>
        <View style={styles.micWrapper}>
          {/* Dış halka */}
          {!isConnected && (
            <>
              <Animated.View
                style={[
                  styles.pulseOuter,
                  {
                    transform: [{scale: outerScale}],
                    opacity: outerOpacity,
                    borderColor: colors.primaryIndigo,
                  },
                ]}
              />
              <Animated.View
                style={[
                  styles.pulseInner,
                  {
                    transform: [{scale: innerScale}],
                    opacity: innerOpacity,
                  },
                ]}
              />
            </>
          )}

          {/* Ana buton */}
          <Pressable
            onPress={isConnected ? undefined : handleConnect}
            disabled={isConnecting || isConnected}
            style={({pressed}) => [
              styles.micButton,
              {
                backgroundColor: primaryColor,
                opacity: pressed && !isConnecting && !isConnected ? 0.9 : 1,
              },
            ]}>
            <Animated.View
              style={[
                styles.micInner,
                {
                  opacity: glowOpacity,
                },
              ]}
            />
            <Animated.View
              style={[
                styles.micIconWrapper,
                isConnected && styles.micIconWrapperConnected,
              ]}>
              <Icon
                name={isConnecting ? 'autorenew' : 'mic'}
                style={styles.micIcon}
              />
            </Animated.View>
          </Pressable>
        </View>

        {/* Durum metni ve ayrıl butonu */}
        <View style={styles.statusArea}>
          {status === 'idle' && (
            <Text style={styles.hintText}>Başlamak için mikrofona dokunun</Text>
          )}
          {isConnecting && (
            <Text style={styles.connectingText}>Oda aranıyor...</Text>
          )}
          {isConnected && (
            <View style={styles.connectedContainer}>
              <Text style={styles.connectedText}>Odaya bağlandınız!</Text>
              <Pressable
                onPress={handleDisconnect}
                style={({pressed}) => [
                  styles.leaveButton,
                  pressed && styles.leaveButtonPressed,
                ]}>
                <Text style={styles.leaveButtonText}>Ayrıl</Text>
              </Pressable>
            </View>
          )}
        </View>
      </View>
    </View>
  );
};

const CARD_SHADOW_WEB = {
  shadowColor: '#000',
  shadowOffset: {width: 0, height: 20},
  shadowOpacity: 0.25,
  shadowRadius: 40,
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: spacing.md,
    marginBottom: spacing.xl,
    paddingVertical: spacing.xl,
    paddingHorizontal: spacing.lg,
    borderRadius: radius.xl,
    backgroundColor: colors.backgroundDarkMain,
    overflow: 'hidden',
    ...Platform.select({
      web: {
        ...CARD_SHADOW_WEB,
      },
      default: {
        elevation: 6,
      },
    }),
  },
  header: {
    marginBottom: spacing.lg,
  },
  title: {
    fontSize: 22,
    fontWeight: '700',
    color: colors.textPrimaryLight,
  },
  subtitle: {
    marginTop: spacing.xs,
    fontSize: 14,
    color: colors.textSecondaryMain,
  },
  centerArea: {
    alignItems: 'center',
  },
  micWrapper: {
    width: 180,
    height: 180,
    alignItems: 'center',
    justifyContent: 'center',
  },
  pulseOuter: {
    position: 'absolute',
    width: 180,
    height: 180,
    borderRadius: 90,
    borderWidth: 3,
  },
  pulseInner: {
    position: 'absolute',
    width: 180,
    height: 180,
    borderRadius: 90,
    borderWidth: 3,
    borderColor: 'rgba(255,255,255,0.4)',
  },
  micButton: {
    width: 150,
    height: 150,
    borderRadius: 75,
    alignItems: 'center',
    justifyContent: 'center',
  },
  micInner: {
    position: 'absolute',
    inset: 18 as any,
    borderRadius: 999,
    backgroundColor: 'rgba(255,255,255,0.12)',
  },
  micIconWrapper: {
    width: 80,
    height: 80,
    borderRadius: 40,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,0.12)',
  },
  micIconWrapperConnected: {
    transform: [{scale: 1.05}],
  },
  micIcon: {
    fontSize: 40,
    color: '#ffffff',
  },
  statusArea: {
    marginTop: spacing.lg,
    alignItems: 'center',
  },
  hintText: {
    fontSize: 14,
    color: colors.textSecondaryMain,
  },
  connectingText: {
    fontSize: 14,
    color: colors.textPrimaryLight,
  },
  connectedContainer: {
    alignItems: 'center',
    gap: spacing.sm,
  } as any,
  connectedText: {
    fontSize: 14,
    color: colors.success,
    fontWeight: '600',
  },
  leaveButton: {
    marginTop: spacing.sm,
    paddingHorizontal: spacing.xl,
    paddingVertical: spacing.sm,
    borderRadius: radius.full,
    backgroundColor: colors.danger,
    ...Platform.select({
      web: {
        cursor: 'pointer',
      },
    }),
  },
  leaveButtonPressed: {
    opacity: 0.85,
  },
  leaveButtonText: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: '600',
  },
});

export default VoiceMatchHero;

