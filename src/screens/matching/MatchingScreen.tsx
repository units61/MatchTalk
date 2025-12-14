import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet, Pressable, Platform} from 'react-native';
import Icon from '../../components/common/Icon';
import Avatar from '../../components/common/Avatar';
import {colors} from '../../theme/colors';
import {spacing} from '../../theme/spacing';
import {typography} from '../../theme/typography';
import {radius} from '../../theme/radius';
import {useWebSocket} from '../../hooks/useWebSocket';

interface MatchingScreenProps {
  onBack?: () => void;
  onMatchComplete?: (roomId?: string) => void;
}

interface Participant {
  id: string;
  name: string;
  avatar?: string;
  isFilled?: boolean;
}

const MatchingScreen: React.FC<MatchingScreenProps> = ({onBack, onMatchComplete}) => {
  const [progress, setProgress] = useState(0);
  const [currentCount, setCurrentCount] = useState(0);
  const [participants, setParticipants] = useState<Participant[]>([]);
  const targetCount = 8;

  const {joinMatching, leaveMatching, on, off, getMatchingStatus} = useWebSocket();

  // Join matching queue on mount
  useEffect(() => {
    joinMatching();
    getMatchingStatus();

    // Listen for matching progress updates
    const handleMatchingProgress = (data: {
      totalWaiting: number;
      position: number;
      users: Array<{id: string; name: string; gender: string; email: string}>;
    }) => {
      setCurrentCount(data.totalWaiting);
      const progressPercent = Math.min((data.totalWaiting / targetCount) * 100, 100);
      setProgress(progressPercent);

      // Update participants
      const filledParticipants: Participant[] = data.users.map((user) => ({
        id: user.id,
        name: user.name,
        avatar: undefined,
        isFilled: true,
      }));

      // Fill remaining slots with empty participants
      const emptySlots = targetCount - filledParticipants.length;
      const emptyParticipants: Participant[] = Array.from({length: emptySlots}, (_, i) => ({
        id: `empty-${i}`,
        name: '',
        avatar: undefined,
        isFilled: false,
      }));

      setParticipants([...filledParticipants, ...emptyParticipants].slice(0, targetCount));
    };

    // Listen for match found
    const handleMatchFound = (data: {
      roomId: string;
      room: {
        id: string;
        name: string;
        category: string;
        maxParticipants: number;
        currentParticipants: number;
        timeLeftSec: number;
        durationSec: number;
      };
      matchedUsers: Array<{id: string; name: string; gender: string}>;
    }) => {
      setProgress(100);
      // Store room info for navigation
      // You can use navigation or state management here
      setTimeout(() => {
        onMatchComplete?.(data.roomId);
      }, 1000);
    };

    on('matching-progress', handleMatchingProgress);
    on('matching-joined', () => {
      getMatchingStatus();
    });
    on('match-found', handleMatchFound);

    return () => {
      off('matching-progress', handleMatchingProgress);
      off('match-found', handleMatchFound);
      leaveMatching();
    };
  }, [joinMatching, leaveMatching, on, off, getMatchingStatus, onMatchComplete]);

  // Avatar positions in a circle (8 positions)
  const avatarPositions = [
    {top: 0, left: '50%', transform: [{translateX: -36}, {translateY: -8}]}, // Top Center
    {top: '15%', right: '15%'}, // Top Right
    {top: '50%', right: 0, transform: [{translateY: -36}, {translateX: 8}]}, // Right
    {bottom: '15%', right: '15%'}, // Bottom Right
    {bottom: 0, left: '50%', transform: [{translateX: -36}, {translateY: 8}]}, // Bottom Center
    {bottom: '15%', left: '15%'}, // Bottom Left
    {top: '50%', left: 0, transform: [{translateY: -36}, {translateX: -8}]}, // Left
    {top: '15%', left: '15%'}, // Top Left
  ];


  return (
    <View style={styles.container}>
      {/* Background Glow */}
      <View style={styles.backgroundGlow} />

      {/* Header */}
      <View style={styles.header}>
        <Pressable style={styles.backButton} onPress={onBack}>
          <Icon name="arrow_back" style={styles.backIcon} />
        </Pressable>
        <Text style={styles.headerTitle}>MatchTalk</Text>
        <View style={styles.headerSpacer} />
      </View>

      {/* Main Content */}
      <View style={styles.mainContent}>
        {/* Status Text */}
        <View style={styles.statusContainer}>
          <Text style={styles.statusTitle}>Eşleştirme yapılıyor...</Text>
          <Text style={styles.statusSubtitle}>Sizin için en uygun odayı arıyoruz</Text>
        </View>

        {/* Avatar Circle */}
        <View style={styles.avatarCircleContainer}>
          {/* Decorative Circles */}
          <View style={styles.decorativeCircle1} />
          <View style={styles.decorativeCircle2} />

          {/* Participant Avatars */}
          {participants.map((participant, index) => {
            const position = avatarPositions[index] || {};
            return (
              <View key={participant.id} style={[styles.avatarSlot, position]}>
                {participant.isFilled && participant.avatar ? (
                  <View style={styles.filledAvatar}>
                    <Avatar uri={participant.avatar} name={participant.name} size={72} />
                  </View>
                ) : (
                  <View style={styles.emptyAvatar}>
                    <Icon name="person" style={styles.emptyIcon} />
                  </View>
                )}
              </View>
            );
          })}
        </View>
      </View>

      {/* Bottom Progress Area */}
      <View style={styles.bottomArea}>
        <View style={styles.progressHeader}>
          <Text style={styles.progressText}>Odada {currentCount} kişi var</Text>
          <View style={styles.loadingDots}>
            <View style={[styles.dot, styles.dot1]} />
            <View style={[styles.dot, styles.dot2]} />
            <View style={[styles.dot, styles.dot3]} />
          </View>
        </View>

        {/* Progress Bar */}
        <View style={styles.progressBarContainer}>
          <View style={[styles.progressBarFill, {width: `${progress}%`}]} />
        </View>

        <Text style={styles.progressHint}>
          Sohbet için en az {targetCount} kişi bekleniyor
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.backgroundDark,
    ...Platform.select({
      web: {
        minHeight: '100vh',
      },
    }),
  },
  backgroundGlow: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    width: 256,
    height: 256,
    marginTop: -128,
    marginLeft: -128,
    backgroundColor: `${colors.primary}33`,
    borderRadius: 128,
    ...Platform.select({
      web: {
        filter: 'blur(100px)',
      },
    }),
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.md,
    paddingTop: spacing.xxl,
    paddingBottom: spacing.sm,
    zIndex: 10,
  },
  backButton: {
    padding: spacing.sm,
    borderRadius: radius.full,
  },
  backIcon: {
    fontSize: 24,
    color: 'rgba(255, 255, 255, 0.8)',
  },
  headerTitle: {
    flex: 1,
    fontSize: 18,
    fontWeight: '600',
    color: 'rgba(255, 255, 255, 0.9)',
    textAlign: 'center',
    paddingRight: spacing.xl,
  },
  headerSpacer: {
    width: 40,
  },
  mainContent: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: spacing.lg,
    position: 'relative',
  },
  statusContainer: {
    marginBottom: spacing.xxl,
    alignItems: 'center',
    zIndex: 10,
  },
  statusTitle: {
    fontSize: 22,
    fontWeight: '600',
    color: '#fff',
    textAlign: 'center',
    marginBottom: spacing.xs,
  },
  statusSubtitle: {
    fontSize: 14,
    color: colors.textSecondary,
    textAlign: 'center',
  },
  avatarCircleContainer: {
    width: '100%',
    maxWidth: 340,
    aspectRatio: 1,
    position: 'relative',
  },
  decorativeCircle1: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    width: 160,
    height: 160,
    marginTop: -80,
    marginLeft: -80,
    borderRadius: 80,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.05)',
    // Animation removed - web CSS animations not supported in React Native Web styles
  },
  decorativeCircle2: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    width: 240,
    height: 240,
    marginTop: -120,
    marginLeft: -120,
    borderRadius: 120,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.05)',
  },
  avatarSlot: {
    position: 'absolute',
    width: 72,
    height: 72,
  },
  filledAvatar: {
    width: 72,
    height: 72,
    borderRadius: 36,
    borderWidth: 3,
    borderColor: colors.primary,
    overflow: 'hidden',
    shadowColor: colors.primary,
    shadowOffset: {width: 0, height: 0},
    shadowOpacity: 0.5,
    shadowRadius: 15,
  },
  emptyAvatar: {
    width: 72,
    height: 72,
    borderRadius: 36,
    borderWidth: 2,
    borderStyle: 'dashed',
    borderColor: colors.textSecondary,
    backgroundColor: `${colors.textSecondary}20`,
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyIcon: {
    fontSize: 24,
    color: `${colors.textSecondary}80`,
  },
  bottomArea: {
    width: '100%',
    paddingHorizontal: spacing.lg,
    paddingBottom: spacing.xxl,
    paddingTop: spacing.lg,
    zIndex: 10,
    ...Platform.select({
      web: {
        backgroundColor: 'rgba(15, 23, 42, 0.8)',
      },
      default: {
        backgroundColor: '#0F172A',
        opacity: 0.8,
      },
    }),
  },
  progressHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: spacing.md,
    paddingHorizontal: spacing.xs,
  },
  progressText: {
    fontSize: 14,
    fontWeight: '500',
    color: colors.textSecondary,
  },
  loadingDots: {
    flexDirection: 'row',
    gap: spacing.xs / 2,
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: colors.primary,
  },
  dot1: {
    // Animation removed - web CSS animations not supported in React Native Web styles
  },
  dot2: {
    // Animation removed - web CSS animations not supported in React Native Web styles
  },
  dot3: {
    // Animation removed - web CSS animations not supported in React Native Web styles
  },
  progressBarContainer: {
    height: 6,
    width: '100%',
    backgroundColor: colors.cardDark,
    borderRadius: radius.full,
    overflow: 'hidden',
    marginBottom: spacing.sm,
  },
  progressBarFill: {
    height: '100%',
    backgroundColor: colors.primary,
    borderRadius: radius.full,
    shadowColor: colors.primary,
    shadowOffset: {width: 0, height: 0},
    shadowOpacity: 0.6,
    shadowRadius: 10,
  },
  progressHint: {
    fontSize: 12,
    color: `${colors.textSecondary}80`,
    textAlign: 'center',
    fontWeight: '300',
  },
});

export default MatchingScreen;

