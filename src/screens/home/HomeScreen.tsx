import React, {useState, useEffect, useMemo, useCallback} from 'react';
import {View, Text, StyleSheet, ScrollView, Pressable, Platform, RefreshControl} from 'react-native';
import {useNavigate} from 'react-router-dom';
import Icon from '../../components/common/Icon';
import RoomCard from '../../components/room/RoomCard';
import BottomNav from '../../components/ui/BottomNav';
import FAB from '../../components/ui/FAB';
import Avatar from '../../components/common/Avatar';
import CreateRoomModal from '../../components/room/CreateRoomModal';
import {colors} from '../../theme/colors';
import {spacing} from '../../theme/spacing';
import {radius} from '../../theme/radius';
import {useRoomsStore} from '../../stores/roomsStore';
import {useAuthStore} from '../../stores/authStore';
import {useWebSocketEvents} from '../../hooks/useWebSocketEvents';
import {CreateRoomInput} from '../../schemas/room';
import {RoomUpdateEvent} from '../../types/websocket';
import {useResponsive} from '../../hooks/useResponsive';
import Skeleton from '../../components/ui/Skeleton';

interface HomeScreenProps {
  onTabChange?: (tab: 'home' | 'friends' | 'profile' | 'settings') => void;
}

const HomeScreen: React.FC<HomeScreenProps> = ({onTabChange}) => {
  const [activeTab, setActiveTab] = useState<'home' | 'friends' | 'profile' | 'settings'>('home');
  const [showCreateModal, setShowCreateModal] = useState(false);

  // Use selectors to prevent unnecessary re-renders
  const rooms = useRoomsStore((state) => state.rooms);
  const loading = useRoomsStore((state) => state.fetching || state.creating || state.joining);
  const fetching = useRoomsStore((state) => state.fetching);
  const creating = useRoomsStore((state) => state.creating);
  const currentRoom = useRoomsStore((state) => state.currentRoom);
  const fetchRooms = useRoomsStore((state) => state.fetchRooms);
  const joinRoom = useRoomsStore((state) => state.joinRoom);
  const createRoom = useRoomsStore((state) => state.createRoom);
  const updateRoom = useRoomsStore((state) => state.updateRoom);
  const leaveRoom = useRoomsStore((state) => state.leaveRoom);
  const {user} = useAuthStore();
  const navigate = useNavigate(); // React Router navigate hook
  const {isMobile, isTablet, isDesktop} = useResponsive();

  // Memoize rooms list to prevent unnecessary re-renders
  const memoizedRooms = useMemo(() => rooms, [rooms]);

  // Announce room count changes to screen readers
  useEffect(() => {
    if (!loading && rooms.length > 0) {
      // Screen reader announcement will be handled by accessibility utilities if needed
    }
  }, [rooms.length, loading]);

  // Use WebSocket events hook for real-time updates
  const handleRoomUpdate = useCallback((data: RoomUpdateEvent) => {
    if (data.room) {
      updateRoom(data.room.id, data.room);
    } else if (data.joinedUser || data.leftUser) {
      // Refresh rooms list when someone joins/leaves
      fetchRooms();
    }
  }, [updateRoom, fetchRooms]);

  const handleRoomCreated = useCallback(() => {
    fetchRooms();
  }, [fetchRooms]);

  const handleRoomClosed = useCallback(() => {
    fetchRooms();
  }, [fetchRooms]);

  useWebSocketEvents({
    onRoomUpdate: handleRoomUpdate,
    onRoomCreated: handleRoomCreated,
    onRoomClosed: handleRoomClosed,
  });

  useEffect(() => {
    fetchRooms();
  }, [fetchRooms]);

  // Ana sayfaya dönüldüğünde aktif oda kontrolü ve temizleme
  useEffect(() => {
    const checkAndCleanupActiveRoom = async () => {
      // Odalar yüklenene kadar bekle
      if (loading || rooms.length === 0) {
        return;
      }

      // Eğer frontend'de currentRoom null ama backend'de kullanıcının katıldığı bir oda varsa
      if (!currentRoom && user) {
        // Dönen odalar listesinde kullanıcının katıldığı bir oda var mı kontrol et
        const userActiveRoom = rooms.find((room) => {
          return room.participants.some((participant) => participant.id === user.id);
        });

        if (userActiveRoom) {
          console.log(`[HomeScreen] Kullanıcı ${user.id} backend'de ${userActiveRoom.id} odasında görünüyor ama frontend'de currentRoom null. Temizleniyor...`);
          try {
            await leaveRoom(userActiveRoom.id);
            console.log(`[HomeScreen] Başarıyla ${userActiveRoom.id} odasından ayrıldı`);
          } catch (error) {
            console.warn(`[HomeScreen] Odadan ayrılırken hata oluştu:`, error);
            // Hata kritik değil, kullanıcıya bilgi vermeye gerek yok
          }
        }
      }
    };

    checkAndCleanupActiveRoom();
  }, [rooms, loading, currentRoom, user, leaveRoom]);

  const handleTabChange = useCallback((tab: 'home' | 'friends' | 'profile' | 'settings') => {
    setActiveTab(tab);
    onTabChange?.(tab);
    // Navigate to the selected tab
    console.log(`[HomeScreen] Navigating to tab: ${tab}`);
    navigate(`/${tab}`);
  }, [onTabChange, navigate]);

  const handleRefresh = useCallback(() => {
    fetchRooms();
  }, [fetchRooms]);

  const handleJoinRoom = useCallback(async (roomId: string) => {
    try {
      await joinRoom(roomId);
      // Navigate to room screen using React Router directly
      console.log(`[HomeScreen] Navigating to room: ${roomId}`);
      navigate(`/room/${roomId}`);
    } catch (error) {
      console.error('Failed to join room:', error);
      // Error will be handled by toast notifications later
    }
  }, [joinRoom, navigate]);

  const handleCreateRoom = useCallback(async (input: CreateRoomInput) => {
    try {
      const room = await createRoom(input);
      setShowCreateModal(false);
      // Navigate to the created room using React Router directly
      console.log(`[HomeScreen] Navigating to created room: ${room.id}`);
      navigate(`/room/${room.id}`);
    } catch (error) {
      console.error('Failed to create room:', error);
      // Error will be handled by toast notifications later
      throw error; // Re-throw to let modal handle it
    }
  }, [createRoom, navigate]);

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
          <Pressable
            style={styles.notificationButton}
            onPress={() => {
              console.log('[HomeScreen] Navigating to notifications');
              navigate('/notifications');
            }}
            accessibilityRole="button"
            accessibilityLabel="Bildirimler"
            accessibilityHint="Bildirimler sayfasına git">
            <Icon name="notifications" style={styles.notificationIcon} />
            <View style={styles.badge} accessibilityLabel="Yeni bildirim var" />
          </Pressable>
          <Pressable
            style={styles.profileButton}
            accessibilityRole="button"
            accessibilityLabel={`${user?.name || 'Kullanıcı'} profili`}
            accessibilityHint="Profil sayfasına git">
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
          <RefreshControl refreshing={fetching} onRefresh={handleRefresh} />
        }
        pointerEvents="box-none">
        {/* Section Header */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle} accessibilityRole="header">Aktif Odalar</Text>
          <Pressable
            onPress={handleRefresh}
            accessibilityRole="button"
            accessibilityLabel="Odaları yenile"
            accessibilityHint="Aktif odalar listesini yenilemek için tıklayın">
            <Text style={styles.seeAllText}>Yenile</Text>
          </Pressable>
        </View>

        {/* Room Cards */}
        {fetching && rooms.length === 0 ? (
          // Show skeleton loaders while loading
          <>
            {[1, 2, 3].map((i) => (
              <View key={i} style={styles.skeletonCard}>
                <Skeleton width="100%" height={180} borderRadius={16} />
              </View>
            ))}
          </>
        ) : rooms.length === 0 ? (
          <View style={styles.emptyState}>
            <Icon name="meeting_room" style={styles.emptyIcon} />
            <Text style={styles.emptyText}>Henüz aktif oda yok</Text>
            <Text style={styles.emptySubtext}>Yeni bir oda oluşturun veya bekleyin</Text>
          </View>
        ) : (
          <View style={styles.roomsContainer}>
            {memoizedRooms.map((room) => (
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
            ))}
          </View>
        )}
      </ScrollView>

      {/* Floating Action Button */}
      <FAB onPress={() => setShowCreateModal(true)} />

      {/* Create Room Modal */}
      <CreateRoomModal
        visible={showCreateModal}
        onClose={() => setShowCreateModal(false)}
        onSubmit={handleCreateRoom}
        loading={creating}
      />

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
    maxWidth: 1200, // Max width for desktop
    alignSelf: 'center',
    width: '100%',
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
  skeletonCard: {
    marginBottom: spacing.md,
  },
  roomsContainer: {
    width: '100%',
    ...Platform.select({
      web: {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
        gap: spacing.md,
      },
    }),
  },
});

export default HomeScreen;
