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
import {useAgoraStore} from '../../stores/agoraStore';
import {useAuthStore} from '../../stores/authStore';
import {shareRoomLink} from '../../utils/shareUtils';
import {useToastStore} from '../../stores/toastStore';

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
  const [showVoteModal, setShowVoteModal] = useState(false);
  const [voteTimer, setVoteTimer] = useState(10); // 10 saniye oylama süresi
  const {currentRoom, updateRoom} = useRoomsStore();
  const {joinRoom: wsJoinRoom, leaveRoom: wsLeaveRoom, on, off, voteExtension} = useWebSocket();
  const {
    isMuted,
    remoteUsers,
    joinChannel,
    leaveChannel,
    toggleMute,
    error: agoraError,
  } = useAgoraStore();
  const {user} = useAuthStore();
  const {showToast} = useToastStore();

  // Agora WebRTC: Join channel when roomId is available
  useEffect(() => {
    if (!roomId) return;

    const joinAgoraChannel = async () => {
      try {
        await joinChannel(roomId);
      } catch (error) {
        // Agora App ID yapılandırılmamış olabilir - bu normal, sadece log'la
        const errorMessage = error instanceof Error ? error.message : String(error);
        if (errorMessage.includes('Agora App ID is not configured')) {
          console.warn('Agora App ID yapılandırılmamış. Ses özellikleri çalışmayacak.');
          // Uygulama çalışmaya devam edebilir, sadece ses özellikleri olmayacak
        } else {
          console.error('Failed to join Agora channel:', error);
        }
      }
    };

    joinAgoraChannel();

    return () => {
      leaveChannel().catch((error) => {
        // Agora hatası kritik değil, sadece log'la
        console.warn('Failed to leave Agora channel:', error);
      });
    };
  }, [roomId, joinChannel, leaveChannel]);

  // WebSocket event handlers
  useEffect(() => {
    if (!roomId) return;

    // Join room via WebSocket (async, handle errors gracefully)
    const joinRoomAsync = async () => {
      try {
        console.log(`[RoomScreen] Attempting to join room: ${roomId}`);
        await wsJoinRoom(roomId);
        console.log(`[RoomScreen] Successfully joined room: ${roomId}`);
      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : String(error);
        console.error('[RoomScreen] Failed to join room via WebSocket:', errorMessage, error);
        
        // Check if it's a connection timeout error
        if (errorMessage.includes('timeout') || errorMessage.includes('Backend WebSocket server')) {
          showToast({
            type: 'warning',
            message: 'WebSocket bağlantısı kurulamadı. Real-time özellikler çalışmayabilir. Backend server\'ın çalıştığından emin olun.',
          });
        } else {
          // Show user-friendly error message
          showToast({
            type: 'error',
            message: errorMessage || 'Odaya bağlanılamadı. Lütfen sayfayı yenileyin.',
          });
        }
      }
    };

    joinRoomAsync();

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

    // Listen for extension vote start (son 10 saniyede)
    const handleExtensionVoteStart = (data: {roomId: string; timeLeft: number; message?: string}) => {
      if (data.roomId === roomId) {
        console.log(`[RoomScreen] Extension vote started for room ${roomId}, timeLeft: ${data.timeLeft}`);
        setShowVoteModal(true);
        setVoteTimer(10); // 10 saniye oylama süresi başlat
      }
    };

    // Set up event listeners with error handling
    try {
      on('room-update', handleRoomUpdate);
      on('timer-update', handleTimerUpdate);
      on('extension-vote-start', handleExtensionVoteStart);
    } catch (error) {
      console.error('Failed to set up WebSocket event listeners:', error);
    }

    return () => {
      try {
        off('room-update', handleRoomUpdate);
        off('timer-update', handleTimerUpdate);
        off('extension-vote-start', handleExtensionVoteStart);
        if (roomId) {
          wsLeaveRoom(roomId).catch((error) => {
            console.warn('Failed to leave room via WebSocket:', error);
          });
        }
      } catch (error) {
        console.warn('Error cleaning up WebSocket listeners:', error);
      }
    };
  }, [roomId, wsJoinRoom, wsLeaveRoom, on, off, updateRoom, showToast]);

  // Update timeLeft from currentRoom
  useEffect(() => {
    if (currentRoom && currentRoom.id === roomId) {
      setTimeLeft(currentRoom.timeLeftSec);
    }
  }, [currentRoom, roomId]);

  // Combine participants from currentRoom (backend) and remoteUsers (Agora)
  const participants: Participant[] = React.useMemo(() => {
    const roomParticipants = currentRoom?.participants || [];
    
    // Create a map of participants by ID for quick lookup
    const participantMap = new Map<string, Participant>();
    
    // Add room participants from backend
    roomParticipants.forEach((p) => {
      participantMap.set(p.id, {
        id: p.id,
        name: p.name,
        avatar: p.avatar,
        isActiveSpeaker: false,
        isMuted: false,
      });
    });
    
    // Update with Agora remote users data (mute state, etc.)
    remoteUsers.forEach((remoteUser) => {
      // Try to find matching participant by checking if UID matches any participant ID
      // Note: In a real implementation, you might need to map Agora UIDs to user IDs
      // For now, we'll update mute state for all participants if we have remote user data
      const matchingParticipant = Array.from(participantMap.values()).find(
        (p) => String(p.id) === String(remoteUser.uid)
      );
      
      if (matchingParticipant) {
        matchingParticipant.isMuted = remoteUser.muted || !remoteUser.hasAudio;
        matchingParticipant.isActiveSpeaker = remoteUser.hasAudio && !remoteUser.muted;
      }
    });
    
    return Array.from(participantMap.values());
  }, [currentRoom?.participants, remoteUsers]);

  // Timer countdown
  // Oylama süresi timer'ı (10 saniye)
  useEffect(() => {
    if (!showVoteModal) {
      return;
    }

    const interval = setInterval(() => {
      setVoteTimer((prev) => {
        if (prev <= 1) {
          // 10 saniye doldu, modal'ı kapat
          setShowVoteModal(false);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [showVoteModal]);

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
        <View style={styles.headerRight}>
          <Pressable
            style={styles.headerButton}
            onPress={async () => {
              if (roomId) {
                const success = await shareRoomLink(roomId, roomName);
                if (success) {
                  showToast({
                    type: 'success',
                    message: 'Room link copied to clipboard!',
                  });
                } else {
                  showToast({
                    type: 'error',
                    message: 'Failed to share room link',
                  });
                }
              }
            }}>
            <Icon name="share" style={styles.headerIcon} />
          </Pressable>
          <Pressable style={styles.headerButton} onPress={onLeave}>
            <Icon name="logout" style={styles.headerIcon} />
          </Pressable>
        </View>
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
          style={[styles.micButton, !isMuted ? styles.micButtonOn : styles.micButtonOff]}
          onPress={() => toggleMute()}>
          <Icon name={!isMuted ? 'mic' : 'mic_off'} style={styles.micIcon} />
        </Pressable>
        {/* Leave Button */}
        <View style={styles.controlSpacer}>
          <Pressable
            style={styles.leaveButton}
            onPress={async () => {
              try {
                if (roomId) {
                  wsLeaveRoom(roomId);
                  await leaveChannel();
                }
                onLeave?.();
              } catch (error) {
                console.error('Error leaving room:', error);
                onLeave?.();
              }
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
          timeLeft={voteTimer}
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
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
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
    ...Platform.select({
      web: {
        textShadow: '0 2px 4px rgba(0, 0, 0, 0.3)' as any,
      },
      default: {
        textShadowColor: 'rgba(0, 0, 0, 0.3)',
        textShadowOffset: {width: 0, height: 2},
        textShadowRadius: 4,
      },
    }),
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
        backgroundImage: 'linear-gradient(to top, #0F172A, transparent)',
      },
    }),
    pointerEvents: 'none',
    zIndex: 10,
  },
});

export default RoomScreen;
