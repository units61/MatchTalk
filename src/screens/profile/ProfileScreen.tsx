import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet, ScrollView, Pressable, Platform} from 'react-native';
import {useNavigate} from 'react-router-dom';
import Icon from '../../components/common/Icon';
import Avatar from '../../components/common/Avatar';
import BottomNav from '../../components/ui/BottomNav';
import {colors} from '../../theme/colors';
import {spacing} from '../../theme/spacing';
import {typography} from '../../theme/typography';
import {radius} from '../../theme/radius';
import {useAuthStore} from '../../stores/authStore';
import {useFriendsStore} from '../../stores/friendsStore';
import {statsApi} from '../../services/api/statsApi';

interface ProfileScreenProps {
  onTabChange?: (tab: 'home' | 'friends' | 'profile' | 'settings') => void;
}

interface Badge {
  id: string;
  name: string;
  icon: string;
  unlocked: boolean;
  gradient?: string[];
}

const badges: Badge[] = [
  {id: 'talkative', name: 'Konuşkan', icon: 'mic', unlocked: true, gradient: ['#fbbf24', '#f97316']},
  {id: 'social', name: 'Sosyal', icon: 'group', unlocked: true, gradient: ['#60a5fa', '#6467f2']},
  {id: 'nightowl', name: 'Gece Kuşu', icon: 'nightlight', unlocked: false},
  {id: 'popular', name: 'Popüler', icon: 'verified', unlocked: false},
  {id: 'vip', name: 'VIP', icon: 'diamond', unlocked: false},
  {id: 'rocket', name: 'Roket', icon: 'rocket_launch', unlocked: false},
];

const ProfileScreen: React.FC<ProfileScreenProps> = ({onTabChange}) => {
  const [activeNavTab, setActiveNavTab] = useState<'home' | 'friends' | 'profile' | 'settings'>('profile');
  const {user} = useAuthStore();
  const {friends} = useFriendsStore();
  const navigate = useNavigate();
  const [stats, setStats] = useState({
    hours: 0,
    rooms: 0,
    friends: friends.length,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadStats();
  }, []);

  const loadStats = async () => {
    try {
      setLoading(true);
      const userStats = await statsApi.getStats();
      setStats({
        hours: userStats.totalHours,
        rooms: userStats.totalRooms,
        friends: userStats.totalFriends,
      });
    } catch (error) {
      console.error('Failed to load stats:', error);
      // Fallback to friends count
      setStats({
        hours: 0,
        rooms: 0,
        friends: friends.length,
      });
    } finally {
      setLoading(false);
    }
  };

  const handleNavTabChange = (tab: 'home' | 'friends' | 'profile' | 'settings') => {
    setActiveNavTab(tab);
    onTabChange?.(tab);
    // Navigate to the selected tab
    console.log(`[ProfileScreen] Navigating to tab: ${tab}`);
    navigate(`/${tab}`);
  };

  // Mock level/XP (will be calculated later)
  const level = 1;
  const currentXP = 0;
  const maxXP = 1000;
  const xpPercentage = maxXP > 0 ? (currentXP / maxXP) * 100 : 0;

  return (
    <View style={styles.container}>
      {/* Header with Gradient */}
      <View
        style={[
          styles.header,
          Platform.select({
            web: {
              backgroundImage: 'linear-gradient(to bottom, #6467f2, #7c3aed)',
            } as any,
          }),
        ]}>
        <View style={styles.headerContent}>
          {/* Avatar */}
          <View style={styles.avatarContainer}>
            <Avatar
              name={user?.name || 'Kullanıcı'}
              avatar={user?.avatar}
              size={120}
              showBorder
            />
            <View style={styles.onlineIndicator} />
          </View>

          {/* User Info */}
          <View style={styles.userInfo}>
            <Text style={styles.userName}>{user?.name || 'Kullanıcı'}</Text>
            <Text style={styles.userLevel}>Seviye {level}</Text>
          </View>

          {/* Level Progress */}
          <View style={styles.progressContainer}>
            <View style={styles.progressLabels}>
              <Text style={styles.progressLabel}>{currentXP} XP</Text>
              <Text style={styles.progressLabel}>{maxXP} XP</Text>
            </View>
            <View style={styles.progressBar}>
              <View
                style={[
                  styles.progressFill,
                  {width: `${xpPercentage}%`},
                ]}
              />
            </View>
          </View>
        </View>
      </View>

      {/* Scrollable Content */}
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}>
        {/* Statistics Section */}
        <View style={styles.statsGrid}>
          <View style={styles.statCard}>
            <Text style={[styles.statValue, styles.statValuePrimary]}>{stats.hours}</Text>
            <Text style={styles.statLabel}>saat</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statValue}>{stats.rooms}</Text>
            <Text style={styles.statLabel}>oda</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statValue}>{stats.friends}</Text>
            <Text style={styles.statLabel}>kişi</Text>
          </View>
        </View>

        {/* Badges Section */}
        <View style={styles.badgesSection}>
          <View style={styles.badgesHeader}>
            <Text style={styles.badgesTitle}>Rozetlerim</Text>
            <Pressable>
              <Text style={styles.seeAllText}>Tümünü Gör</Text>
            </Pressable>
          </View>
          <View style={styles.badgesGrid}>
            {badges.map((badge) => {
              const badgeIconStyle = badge.unlocked && badge.gradient
                ? Platform.select({
                    web: {
                      backgroundImage: `linear-gradient(135deg, ${badge.gradient[0]}, ${badge.gradient[1]})`,
                    } as any,
                    default: {
                      backgroundColor: badge.gradient[0],
                    },
                  })
                : styles.badgeIconContainerLocked;

              return (
                <View
                  key={badge.id}
                  style={[
                    styles.badgeCard,
                    !badge.unlocked && styles.badgeCardLocked,
                  ]}>
                  <View
                    style={[
                      styles.badgeIconContainer,
                      badgeIconStyle as any,
                    ]}>
                    <Icon
                      name={badge.icon}
                      style={!badge.unlocked ? styles.badgeIconLocked : styles.badgeIcon}
                    />
                  </View>
                  <Text
                    style={[
                      styles.badgeName,
                      !badge.unlocked && styles.badgeNameLocked,
                    ]}>
                    {badge.name}
                  </Text>
                </View>
              );
            })}
          </View>
        </View>

        {/* Settings Menu Section */}
        <View style={styles.menuSection}>
          <Text style={styles.menuSectionTitle}>Ayarlar</Text>
          <View style={styles.menuItemsContainer}>
            <Pressable
              style={({pressed}) => [
                styles.menuItem,
                pressed && styles.menuItemPressed,
              ]}>
              <View style={styles.menuItemLeft}>
                <View style={styles.menuIconContainer}>
                  <Icon name="edit" style={styles.menuIcon} />
                </View>
                <Text style={styles.menuText}>Profili Düzenle</Text>
              </View>
              <Icon name="chevron_right" style={styles.chevronIcon} />
            </Pressable>
            <Pressable
              style={({pressed}) => [
                styles.menuItem,
                pressed && styles.menuItemPressed,
              ]}>
              <View style={styles.menuItemLeft}>
                <View style={styles.menuIconContainer}>
                  <Icon name="notifications" style={styles.menuIcon} />
                </View>
                <Text style={styles.menuText}>Bildirimler</Text>
              </View>
              <Icon name="chevron_right" style={styles.chevronIcon} />
            </Pressable>
            <Pressable
              style={({pressed}) => [
                styles.menuItem,
                pressed && styles.menuItemPressed,
              ]}>
              <View style={styles.menuItemLeft}>
                <View style={styles.menuIconContainer}>
                  <Icon name="lock" style={styles.menuIcon} />
                </View>
                <Text style={styles.menuText}>Gizlilik</Text>
              </View>
              <Icon name="chevron_right" style={styles.chevronIcon} />
            </Pressable>
            <Pressable
              style={({pressed}) => [
                styles.menuItem,
                pressed && styles.menuItemPressed,
              ]}>
              <View style={styles.menuItemLeft}>
                <View style={styles.menuIconContainer}>
                  <Icon name="info" style={styles.menuIcon} />
                </View>
                <Text style={styles.menuText}>Hakkında</Text>
              </View>
              <Icon name="chevron_right" style={styles.chevronIcon} />
            </Pressable>
          </View>
        </View>
      </ScrollView>

      {/* Bottom Navigation */}
      <BottomNav activeTab={activeNavTab} onTabChange={handleNavTabChange} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0b0d17',
    ...Platform.select({
      web: {
        minHeight: '100vh' as any,
      },
    }),
  },
  header: {
    backgroundColor: '#0b0d17', // Fallback for non-web platforms
    paddingTop: spacing.xxl + spacing.md,
    paddingBottom: spacing.xxl,
    paddingHorizontal: spacing.xl,
    borderBottomLeftRadius: radius.xl * 2,
    borderBottomRightRadius: radius.xl * 2,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 0.3,
    shadowRadius: 8,
  },
  headerContent: {
    alignItems: 'center',
    gap: spacing.md,
  },
  avatarContainer: {
    position: 'relative',
  },
  onlineIndicator: {
    position: 'absolute',
    bottom: 4,
    right: 4,
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: '#10b981',
    borderWidth: 2,
    borderColor: '#fff',
  },
  userInfo: {
    alignItems: 'center',
    gap: spacing.xs / 2,
  },
  userName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#e2e8f0',
  },
  userLevel: {
    fontSize: 16,
    fontWeight: '600',
    color: 'rgba(255, 255, 255, 0.9)',
  },
  progressContainer: {
    width: '100%',
    maxWidth: 240,
    gap: spacing.sm,
  },
  progressLabels: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.xs,
  },
  progressLabel: {
    fontSize: 12,
    fontWeight: '500',
    color: 'rgba(255, 255, 255, 0.8)',
  },
  progressBar: {
    height: 10,
    width: '100%',
    borderRadius: radius.full,
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#fff',
    borderRadius: radius.full,
    shadowColor: '#fff',
    shadowOffset: {width: 0, height: 0},
    shadowOpacity: 0.5,
    shadowRadius: 10,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: spacing.xl,
    gap: spacing.xl,
    paddingBottom: 100,
  },
  statsGrid: {
    flexDirection: 'row',
    gap: spacing.md,
  },
  statCard: {
    flex: 1,
    backgroundColor: '#0f172a',
    borderRadius: radius.lg,
    padding: spacing.md,
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.xs / 2,
    borderWidth: 1,
    borderColor: '#1f2937',
  },
  statValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
  },
  statValuePrimary: {
    color: colors.primaryIndigo,
  },
  statLabel: {
    fontSize: 12,
    fontWeight: '500',
    color: '#94a3b8',
  },
  badgesSection: {
    gap: spacing.md,
  },
  badgesHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.xs / 2,
  },
  badgesTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#e2e8f0',
  },
  seeAllText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#6366f1',
  },
  badgesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.md,
    justifyContent: 'space-between',
  },
  badgeCard: {
    width: '30%',
    minWidth: 100,
    flexDirection: 'column',
    alignItems: 'center',
    gap: spacing.sm,
    backgroundColor: '#0f172a',
    borderRadius: radius.lg,
    padding: spacing.md,
    borderWidth: 1,
    borderColor: '#1f2937',
  },
  badgeCardLocked: {
    opacity: 0.5,
    backgroundColor: '#0b0d17',
  },
  badgeIconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  badgeIconContainerLocked: {
    backgroundColor: '#475569',
  },
  badgeIcon: {
    fontSize: 24,
    color: '#fff',
  },
  badgeIconLocked: {
    color: '#94a3b8',
  },
  badgeName: {
    fontSize: 12,
    fontWeight: '500',
    color: '#cbd5e1',
    textAlign: 'center',
  },
  badgeNameLocked: {
    color: '#94a3b8',
  },
  menuSection: {
    gap: spacing.md,
    paddingBottom: spacing.lg,
  },
  menuSectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.textPrimary,
    paddingHorizontal: spacing.xs / 2,
  },
  menuItemsContainer: {
    gap: spacing.sm,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#0f172a',
    borderRadius: radius.lg,
    padding: spacing.md,
    borderWidth: 1,
    borderColor: '#1f2937',
  },
  menuItemPressed: {
    backgroundColor: '#111827',
  },
  menuItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
    flex: 1,
  },
  menuIconContainer: {
    width: 32,
    height: 32,
    borderRadius: 8,
    backgroundColor: 'rgba(99, 102, 241, 0.18)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  menuIcon: {
    fontSize: 20,
    color: '#c7d2fe',
  },
  menuText: {
    flex: 1,
    fontSize: 15,
    fontWeight: '500',
    color: '#e2e8f0',
  },
  chevronIcon: {
    fontSize: 20,
    color: '#9ca3af',
  },
});

export default ProfileScreen;
