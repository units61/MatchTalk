import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet, Pressable, Platform} from 'react-native';
import Icon from '../../components/common/Icon';
import ParticipantAvatar from '../../components/room/ParticipantAvatar';
import VoteModal from '../../components/room/VoteModal';
import {colors} from '../../theme/colors';
import {spacing} from '../../theme/spacing';
import {typography} from '../../theme/typography';
import {radius} from '../../theme/radius';
import {useWebSocket} from '../../hooks/useWebSocket';
import {useRoomsStore} from '../../stores/roomsStore';

interface Participant {
  id: string;
  name: string;
  avatar?: string;
  isActiveSpeaker?: boolean;
  isMuted?: boolean;
}

interface RoomScreenProps {
  roomId?: string;
  roomName?: string;
  onLeave?: () => void;
  onBack?: () => void;
}

const RoomScreen: React.FC<RoomScreenProps> = ({
  roomId,
  roomName = 'Startups & Coffee ☕️',
  onLeave,
  onBack,
}) => {
  const [timeLeft, setTimeLeft] = useState(272); // 4:32 in seconds
  const [isMicOn, setIsMicOn] = useState(true);
  const [showVoteModal, setShowVoteModal] = useState(false);
  const {currentRoom, updateRoom} = useRoomsStore();
  const {joinRoom: wsJoinRoom, leaveRoom: wsLeaveRoom, on, off, voteExtension} = useWebSocket();

  // WebSocket event handlers
  useEffect(() => {
    if (!roomId) return;

    // Join room via WebSocket
    wsJoinRoom(roomId);

    // Listen for room updates
    const handleRoomUpdate = (data: any) => {
      if (data.room) {
        updateRoom(roomId, data.room);
      }
    };

    // Listen for timer updates
    const handleTimerUpdate = (data: {roomId: string; timeLeft: number}) => {
      if (data.roomId === roomId) {
        setTimeLeft(data.timeLeft);
      }
    };

    on('room-update', handleRoomUpdate);
    on('timer-update', handleTimerUpdate);

    return () => {
      off('room-update', handleRoomUpdate);
      off('timer-update', handleTimerUpdate);
      if (roomId) {
        wsLeaveRoom(roomId);
      }
    };
  }, [roomId, wsJoinRoom, wsLeaveRoom, on, off, updateRoom]);

  // Update timeLeft from currentRoom
  useEffect(() => {
    if (currentRoom && currentRoom.id === roomId) {
      setTimeLeft(currentRoom.timeLeftSec);
    }
  }, [currentRoom, roomId]);

  // Participants from currentRoom (fallback: empty array)
  const participants: Participant[] =
    currentRoom?.participants?.map((p) => ({
      id: p.id,
      name: p.name,
      avatar: p.avatar,
      isActiveSpeaker: false,
      isMuted: false,
    })) ?? [];

  // Timer countdown
  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          // Show vote modal when time is up
          setShowVoteModal(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const progress = ((300 - timeLeft) / 300) * 100; // 5 minutes = 300 seconds

  // Avatar positions in a circle
  const avatarPositions = [
    {top: '5%', left: '50%', transform: [{translateX: -40}, {translateY: -10}]}, // Top
    {top: '15%', right: '15%'}, // Top Right
    {top: '50%', right: '5%', transform: [{translateY: -40}]}, // Right
    {bottom: '15%', right: '15%'}, // Bottom Right
    {bottom: '5%', left: '50%', transform: [{translateX: -40}, {translateY: 10}]}, // Bottom
    {bottom: '15%', left: '15%'}, // Bottom Left
    {top: '50%', left: '5%', transform: [{translateY: -40}]}, // Left
    {top: '15%', left: '15%'}, // Top Left
  ];

  return (
    <View style={styles.container}>
      {/* Background Glow */}
      <View style={styles.backgroundGlow} />

      {/* Header */}
      <View style={styles.header}>
        <Pressable style={styles.headerButton} onPress={onBack}>
          <Icon name="arrow_back_ios_new" style={styles.headerIcon} />
        </Pressable>
        <Text style={styles.headerTitle} numberOfLines={1}>
          {roomName}
        </Text>
        <Pressable style={styles.headerButton} onPress={onLeave}>
          <Icon name="logout" style={styles.headerIcon} />
        </Pressable>
      </View>

      {/* Main Content Area */}
      <View style={styles.mainContent}>
        {/* Avatar Circle Container */}
        <View style={styles.avatarContainer}>
          {/* Central Timer */}
          <View style={styles.timerContainer}>
            <View style={styles.timerCircle}>
              {/* SVG Progress Ring - Using View with border for simplicity */}
              <View style={styles.progressRingBackground} />
              <View style={[styles.progressRingFill, {width: `${progress}%`}]} />
              <Text style={styles.timerText}>{formatTime(timeLeft)}</Text>
            </View>
          </View>

          {/* Participant Avatars */}
          {participants.map((participant, index) => {
            const position = avatarPositions[index] || {};
            return (
              <View key={participant.id} style={[styles.avatarWrapper, position]}>
                <ParticipantAvatar
                  name={participant.name}
                  avatar={participant.avatar}
                  size={80}
                  isActiveSpeaker={participant.isActiveSpeaker}
                  isMuted={participant.isMuted}
                />
              </View>
            );
          })}

          {/* Invite Slot (8th position) */}
          <View style={[styles.avatarWrapper, styles.inviteSlot, avatarPositions[7]]}>
            <Pressable style={styles.inviteButton}>
              <Icon name="add" style={styles.inviteIcon} />
            </Pressable>
            <Text style={styles.inviteText}>Invite</Text>
          </View>
        </View>
      </View>

      {/* Bottom Controls */}
      <View style={styles.bottomControls}>
        <View style={styles.controlSpacer} />
        {/* Mic Toggle */}
        <Pressable
          style={[styles.micButton, isMicOn ? styles.micButtonOn : styles.micButtonOff]}
          onPress={() => setIsMicOn(!isMicOn)}>
          <Icon name={isMicOn ? 'mic' : 'mic_off'} style={styles.micIcon} />
        </Pressable>
        {/* Leave Button */}
        <View style={styles.controlSpacer}>
          <Pressable
            style={styles.leaveButton}
            onPress={() => {
              if (roomId) {
                wsLeaveRoom(roomId);
              }
              onLeave?.();
            }}>
            <View style={styles.leaveButtonInner}>
              <Icon name="call_end" style={styles.leaveIcon} />
            </View>
            <Text style={styles.leaveText}>Leave</Text>
          </Pressable>
        </View>
      </View>

      {/* Bottom Gradient Overlay */}
      <View style={styles.bottomGradient} />

      {/* Vote Modal */}
      {showVoteModal && roomId && (
        <VoteModal
          visible={showVoteModal}
          onClose={() => setShowVoteModal(false)}
          onVote={(vote: boolean) => {
            if (roomId) {
              voteExtension(roomId, vote ? 'yes' : 'no');
            }
            setShowVoteModal(false);
          }}
        />
      )}
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
        filter: 'blur(80px)',
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
    zIndex: 20,
  },
  headerButton: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: radius.full,
  },
  headerIcon: {
    fontSize: 28,
    color: '#fff',
  },
  headerTitle: {
    flex: 1,
    fontSize: 18,
    fontWeight: '600',
    color: '#fff',
    textAlign: 'center',
    paddingHorizontal: spacing.md,
  },
  mainContent: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: spacing.md,
    position: 'relative',
  },
  avatarContainer: {
    width: '100%',
    maxWidth: 400,
    aspectRatio: 1,
    position: 'relative',
  },
  timerContainer: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    width: 144,
    height: 144,
    marginTop: -72,
    marginLeft: -72,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 0,
  },
  timerCircle: {
    width: 144,
    height: 144,
    borderRadius: 72,
    borderWidth: 4,
    borderColor: `${colors.textSecondary}50`,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    overflow: 'hidden',
  },
  progressRingBackground: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    borderRadius: 72,
    borderWidth: 4,
    borderColor: `${colors.textSecondary}50`,
  },
  progressRingFill: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    height: '100%',
    backgroundColor: colors.primary,
    opacity: 0.3,
  },
  timerText: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#fff',
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: {width: 0, height: 2},
    textShadowRadius: 4,
  },
  avatarWrapper: {
    position: 'absolute',
    alignItems: 'center',
    zIndex: 10,
  },
  inviteSlot: {
    alignItems: 'center',
  },
  inviteButton: {
    width: 80,
    height: 80,
    borderRadius: 40,
    borderWidth: 2,
    borderStyle: 'dashed',
    borderColor: colors.textSecondary,
    backgroundColor: `${colors.textSecondary}20`,
    alignItems: 'center',
    justifyContent: 'center',
  },
  inviteIcon: {
    fontSize: 28,
    color: colors.textSecondary,
  },
  inviteText: {
    marginTop: spacing.xs,
    fontSize: 12,
    color: colors.textSecondary,
    fontWeight: '500',
  },
  bottomControls: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.lg,
    paddingBottom: spacing.xxl,
    paddingTop: spacing.lg,
    zIndex: 20,
  },
  controlSpacer: {
    width: 64,
  },
  micButton: {
    width: 80,
    height: 80,
    borderRadius: 40,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: colors.primary,
    shadowOffset: {width: 0, height: 0},
    shadowOpacity: 0.6,
    shadowRadius: 15,
    ...Platform.select({
      web: {
        boxShadow: '0 0 15px 2px rgba(94, 64, 242, 0.6)',
      },
    }),
  },
  micButtonOn: {
    backgroundColor: colors.primary,
  },
  micButtonOff: {
    backgroundColor: colors.danger,
  },
  micIcon: {
    fontSize: 36,
    color: '#fff',
  },
  leaveButton: {
    alignItems: 'center',
    gap: spacing.xs / 2,
  },
  leaveButtonInner: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: `${colors.danger}1A`,
    borderWidth: 1,
    borderColor: `${colors.danger}33`,
    alignItems: 'center',
    justifyContent: 'center',
  },
  leaveIcon: {
    fontSize: 20,
    color: colors.danger,
  },
  leaveText: {
    fontSize: 10,
    fontWeight: 'bold',
    color: colors.danger,
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  bottomGradient: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 128,
    backgroundColor: 'transparent',
    ...Platform.select({
      web: {
        background: 'linear-gradient(to top, #0F172A, transparent)',
      },
    }),
    pointerEvents: 'none',
    zIndex: 10,
  },
});

export default RoomScreen;
