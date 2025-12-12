import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet, ScrollView, Pressable, Platform, RefreshControl, Alert} from 'react-native';
import Icon from '../../components/common/Icon';
import Avatar from '../../components/common/Avatar';
import BottomNav from '../../components/ui/BottomNav';
import {colors} from '../../theme/colors';
import {spacing} from '../../theme/spacing';
import {typography} from '../../theme/typography';
import {radius} from '../../theme/radius';
import {useFriendsStore} from '../../stores/friendsStore';

interface FriendsScreenProps {
  onTabChange?: (tab: 'home' | 'friends' | 'profile' | 'settings') => void;
}

const FriendsScreen: React.FC<FriendsScreenProps> = ({onTabChange}) => {
  const [activeTab, setActiveTab] = useState<'friends' | 'requests'>('friends');
  const [activeNavTab, setActiveNavTab] = useState<'home' | 'friends' | 'profile' | 'settings'>('friends');
  const {friends, loading, fetchFriends, addFriend, removeFriend} = useFriendsStore();

  useEffect(() => {
    fetchFriends();
  }, [fetchFriends]);

  const handleNavTabChange = (tab: 'home' | 'friends' | 'profile' | 'settings') => {
    setActiveNavTab(tab);
    onTabChange?.(tab);
  };

  const handleRefresh = () => {
    fetchFriends();
  };

  const handleInvite = async (friendId: string) => {
    try {
      await addFriend(friendId);
      Alert.alert('Başarılı', 'Arkadaş davet edildi');
    } catch (error) {
      Alert.alert('Hata', 'Arkadaş davet edilemedi');
    }
  };


  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Arkadaşlarım</Text>
        <Pressable style={styles.searchButton}>
          <Icon name="search" style={styles.searchIcon} />
        </Pressable>
      </View>

      {/* Tabs */}
      <View style={styles.tabs}>
        <Pressable
          style={[styles.tab, activeTab === 'friends' && styles.tabActive]}
          onPress={() => setActiveTab('friends')}>
          <Text
            style={[
              styles.tabText,
              activeTab === 'friends' && styles.tabTextActive,
            ]}>
            Arkadaşlar
          </Text>
        </Pressable>
        <Pressable
          style={[styles.tab, activeTab === 'requests' && styles.tabActive]}
          onPress={() => setActiveTab('requests')}>
          <Text
            style={[
              styles.tabText,
              activeTab === 'requests' && styles.tabTextActive,
            ]}>
            İstekler
          </Text>
          {activeTab !== 'requests' && <View style={styles.badge} />}
        </Pressable>
      </View>

      {/* Content */}
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        refreshControl={
          <RefreshControl refreshing={loading} onRefresh={handleRefresh} />
        }>
        {activeTab === 'friends' && (
          <>
            {friends.length === 0 && !loading ? (
              <View style={styles.emptyState}>
                <Icon name="people" style={styles.emptyIcon} />
                <Text style={styles.emptyText}>Henüz arkadaşınız yok</Text>
                <Text style={styles.emptySubtext}>Kullanıcı arayarak arkadaş ekleyebilirsiniz</Text>
              </View>
            ) : (
              friends.map((friend) => (
                <View key={friend.id} style={styles.friendCard}>
                  <View style={styles.friendInfo}>
                    <View style={styles.avatarContainer}>
                      <Avatar
                        name={friend.name}
                        avatar={friend.avatar}
                        size={56}
                        showBorder
                      />
                      <View
                        style={[
                          styles.statusIndicator,
                          {backgroundColor: '#10b981'}, // Default online
                        ]}
                      />
                    </View>
                    <View style={styles.friendDetails}>
                      <Text style={styles.friendName}>{friend.name}</Text>
                      <View style={styles.statusContainer}>
                        <View
                          style={[
                            styles.statusDot,
                            {backgroundColor: '#10b981'},
                          ]}
                        />
                        <Text style={styles.statusText}>Çevrimiçi</Text>
                      </View>
                    </View>
                  </View>
                  <Pressable
                    style={styles.inviteButton}
                    onPress={() => handleInvite(friend.id)}>
                    <Text style={styles.inviteButtonText}>Davet Et</Text>
                  </Pressable>
                </View>
              ))
            )}
          </>
        )}
        {activeTab === 'requests' && (
          <View style={styles.emptyState}>
            <Icon name="person_add" style={styles.emptyIcon} />
            <Text style={styles.emptyText}>Henüz istek yok</Text>
          </View>
        )}
      </ScrollView>

      {/* Bottom Navigation */}
      <BottomNav activeTab={activeNavTab} onTabChange={handleNavTabChange} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.backgroundLightMain,
    ...Platform.select({
      web: {
        minHeight: '100vh',
      },
    }),
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.md,
    backgroundColor: colors.backgroundLightMain,
    borderBottomWidth: 1,
    borderBottomColor: '#e2e8f0',
    ...Platform.select({
      web: {
        position: 'sticky',
        top: 0,
        zIndex: 50,
        backgroundColor: 'rgba(246, 246, 248, 0.95)',
      },
    }),
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.textPrimary,
  },
  searchButton: {
    padding: spacing.sm,
    borderRadius: radius.full,
  },
  searchIcon: {
    fontSize: 28,
    color: colors.textSecondary,
  },
  tabs: {
    flexDirection: 'row',
    paddingHorizontal: spacing.sm,
    borderBottomWidth: 1,
    borderBottomColor: '#e2e8f0',
  },
  tab: {
    flex: 1,
    paddingVertical: spacing.sm,
    paddingTop: spacing.sm,
    alignItems: 'center',
    borderBottomWidth: 3,
    borderBottomColor: 'transparent',
    position: 'relative',
  },
  tabActive: {
    borderBottomColor: colors.primaryIndigo,
  },
  tabText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: colors.textSecondary,
    letterSpacing: 0.5,
  },
  tabTextActive: {
    color: colors.primaryIndigo,
  },
  badge: {
    position: 'absolute',
    top: spacing.sm,
    right: spacing.xl,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#ef4444',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.md,
    gap: spacing.md,
    paddingBottom: 100,
  },
  friendCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: spacing.md,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.05,
    shadowRadius: 2,
  },
  friendInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
    flex: 1,
    minWidth: 0,
  },
  avatarContainer: {
    position: 'relative',
  },
  statusIndicator: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 14,
    height: 14,
    borderRadius: 7,
    borderWidth: 2,
    borderColor: '#fff',
  },
  friendDetails: {
    flex: 1,
    minWidth: 0,
  },
  friendName: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.textPrimary,
  },
  statusContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs / 2,
    marginTop: spacing.xs / 2,
  },
  statusDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
  },
  statusText: {
    fontSize: 12,
    color: colors.textSecondary,
  },
  inviteButton: {
    backgroundColor: colors.primaryIndigo,
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.md,
    borderRadius: 8,
    marginLeft: spacing.md,
  },
  inviteButtonText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#fff',
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

export default FriendsScreen;
