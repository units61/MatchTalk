import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet, ScrollView, Pressable, Platform, RefreshControl} from 'react-native';
import Icon from '../../components/common/Icon';
import RoomCard from '../../components/room/RoomCard';
import BottomNav from '../../components/ui/BottomNav';
import FAB from '../../components/ui/FAB';
import Avatar from '../../components/common/Avatar';
import {colors} from '../../theme/colors';
import {spacing} from '../../theme/spacing';
import {typography} from '../../theme/typography';
import {radius} from '../../theme/radius';
import {useRoomsStore} from '../../stores/roomsStore';
import {useAuthStore} from '../../stores/authStore';
import {useWebSocket} from '../../hooks/useWebSocket';

interface HomeScreenProps {
  onTabChange?: (tab: 'home' | 'friends' | 'profile' | 'settings') => void;
}

const HomeScreen: React.FC<HomeScreenProps> = ({onTabChange}) => {
  const [activeTab, setActiveTab] = useState<'home' | 'friends' | 'profile' | 'settings'>('home');
  const {rooms, loading, fetchRooms, joinRoom, updateRoom} = useRoomsStore();
  const {user} = useAuthStore();
  const {on, off} = useWebSocket();

  useEffect(() => {
    fetchRooms();
  }, [fetchRooms]);

  // Real-time room updates
  useEffect(() => {
    // Listen for room updates
    const handleRoomUpdate = (data: {room?: any; joinedUser?: {id: string}; leftUser?: {id: string}}) => {
      if (data.room) {
        updateRoom(data.room.id, data.room);
      } else if (data.joinedUser || data.leftUser) {
        // Refresh rooms list when someone joins/leaves
        fetchRooms();
      }
    };

    // Listen for new room created
    const handleRoomCreated = (data: {room: any}) => {
      fetchRooms();
    };

    // Listen for room closed
    const handleRoomClosed = (data: {roomId: string; reason: string}) => {
      fetchRooms();
    };

    on('room-update', handleRoomUpdate);
    on('room-created', handleRoomCreated);
    on('room-closed', handleRoomClosed);

    return () => {
      off('room-update', handleRoomUpdate);
      off('room-created', handleRoomCreated);
      off('room-closed', handleRoomClosed);
    };
  }, [on, off, fetchRooms, updateRoom]);

  const handleTabChange = (tab: 'home' | 'friends' | 'profile' | 'settings') => {
    setActiveTab(tab);
    onTabChange?.(tab);
  };

  const handleRefresh = () => {
    fetchRooms();
  };

  const handleJoinRoom = async (roomId: string) => {
    try {
      await joinRoom(roomId);
      // Navigate to room screen would go here
      console.log('Joined room:', roomId);
    } catch (error) {
      console.error('Failed to join room:', error);
    }
  };

  return (
    <View style={styles.container}>
      {/* Top App Bar */}
      <View style={styles.header}>
        {/* Left: Logo */}
        <View style={styles.logoContainer}>
          <View style={styles.logoIcon}>
            <Icon name="graphic_eq" style={styles.logoIconText} />
          </View>
          <Text style={styles.logoText}>MatchTalk</Text>
        </View>

        {/* Right: Actions */}
        <View style={styles.headerActions}>
          <Pressable style={styles.notificationButton}>
            <Icon name="notifications" style={styles.notificationIcon} />
            <View style={styles.badge} />
          </Pressable>
          <Pressable style={styles.profileButton}>
            <Avatar
              name={user?.name || 'Kullanıcı'}
              avatar={user?.avatar}
              size={40}
              showBorder
            />
          </Pressable>
        </View>
      </View>

      {/* Main Content */}
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={loading} onRefresh={handleRefresh} />
        }>
        {/* Section Header */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Aktif Odalar</Text>
          <Pressable onPress={handleRefresh}>
            <Text style={styles.seeAllText}>Yenile</Text>
          </Pressable>
        </View>

        {/* Room Cards */}
        {rooms.length === 0 && !loading ? (
          <View style={styles.emptyState}>
            <Icon name="meeting_room" style={styles.emptyIcon} />
            <Text style={styles.emptyText}>Henüz aktif oda yok</Text>
            <Text style={styles.emptySubtext}>Yeni bir oda oluşturun veya bekleyin</Text>
          </View>
        ) : (
          rooms.map((room) => (
            <RoomCard
              key={room.id}
              id={room.id}
              name={room.name}
              category={room.category}
              timeLeft={room.timeLeftSec}
              participants={room.participants}
              maxParticipants={room.maxParticipants}
              maleCount={room.maleCount}
              femaleCount={room.femaleCount}
              onJoin={() => handleJoinRoom(room.id)}
            />
          ))
        )}

        {/* Loading Indicator */}
        {loading && (
          <View style={styles.loadingIndicator}>
            <View style={styles.loadingBar} />
          </View>
        )}
      </ScrollView>

      {/* Floating Action Button */}
      <FAB onPress={() => console.log('New room')} />

      {/* Bottom Navigation */}
      <BottomNav activeTab={activeTab} onTabChange={handleTabChange} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.backgroundLightMain,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.xl,
    paddingVertical: spacing.xl,
    backgroundColor: colors.backgroundLightMain,
    zIndex: 10,
  },
  logoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  logoIcon: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: colors.primaryIndigo,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoIconText: {
    fontSize: 18,
    color: '#fff',
  },
  logoText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.textPrimary,
  },
  headerActions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
  },
  notificationButton: {
    position: 'relative',
    padding: spacing.sm,
    borderRadius: radius.full,
  },
  notificationIcon: {
    fontSize: 24,
    color: colors.textMuted,
  },
  badge: {
    position: 'absolute',
    top: 8,
    right: 8,
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#ef4444',
    borderWidth: 2,
    borderColor: colors.backgroundLightMain,
  },
  profileButton: {
    borderRadius: radius.full,
    overflow: 'hidden',
    borderWidth: 2,
    borderColor: 'transparent',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: spacing.md,
    paddingBottom: 180, // Space for FAB and BottomNav
    paddingTop: spacing.sm,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: spacing.md,
    paddingHorizontal: spacing.sm,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.textPrimary,
  },
  seeAllText: {
    fontSize: 14,
    fontWeight: '500',
    color: colors.primaryIndigo,
  },
  loadingIndicator: {
    alignItems: 'center',
    paddingVertical: spacing.md,
  },
  loadingBar: {
    height: 4,
    width: 64,
    backgroundColor: '#e2e8f0',
    borderRadius: radius.full,
  },
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: spacing.xxl * 2,
    gap: spacing.md,
  },
  emptyIcon: {
    fontSize: 64,
    color: colors.textMuted,
  },
  emptyText: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.textPrimary,
  },
  emptySubtext: {
    fontSize: 14,
    color: colors.textSecondary,
    textAlign: 'center',
  },
});

export default HomeScreen;
