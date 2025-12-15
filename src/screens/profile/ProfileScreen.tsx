import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet, ScrollView, Pressable, Image, Platform} from 'react-native';
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
    // React Router tab navigasyonu
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
      <View style={styles.header}>
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
            <Text style={styles.statValue}>{stats.hours}</Text>
            <Text style={styles.statLabel}>saat</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statValue}>{stats.rooms}</Text>
            <Text style={styles.statLabel}>oda</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statValue}>{stats.friends}</Text>
            <Text style={styles.statLabel}>arkadaş</Text>
          </View>
        </View>

        {/* Menu Items */}
        <View style={styles.menuSection}>
          <Pressable style={styles.menuItem}>
            <Icon name="edit" style={styles.menuIcon} />
            <Text style={styles.menuText}>Profili Düzenle</Text>
            <Icon name="chevron_right" style={styles.chevronIcon} />
          </Pressable>
          <Pressable style={styles.menuItem}>
            <Icon name="notifications" style={styles.menuIcon} />
            <Text style={styles.menuText}>Bildirimler</Text>
            <Icon name="chevron_right" style={styles.chevronIcon} />
          </Pressable>
          <Pressable style={styles.menuItem}>
            <Icon name="privacy_tip" style={styles.menuIcon} />
            <Text style={styles.menuText}>Gizlilik</Text>
            <Icon name="chevron_right" style={styles.chevronIcon} />
          </Pressable>
          <Pressable style={styles.menuItem}>
            <Icon name="help" style={styles.menuIcon} />
            <Text style={styles.menuText}>Yardım & Destek</Text>
            <Icon name="chevron_right" style={styles.chevronIcon} />
          </Pressable>
          <Pressable style={styles.menuItem}>
            <Icon name="info" style={styles.menuIcon} />
            <Text style={styles.menuText}>Hakkında</Text>
            <Icon name="chevron_right" style={styles.chevronIcon} />
          </Pressable>
        </View>

        {/* Logout Button */}
        <Pressable style={styles.logoutButton}>
          <Text style={styles.logoutText}>Çıkış Yap</Text>
        </Pressable>
      </ScrollView>

      {/* Bottom Navigation */}
      <BottomNav activeTab={activeNavTab} onTabChange={handleNavTabChange} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.backgroundDarkMain,
    ...Platform.select({
      web: {
        minHeight: '100vh',
      },
    }),
  },
  header: {
    backgroundColor: colors.primaryIndigo,
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
    color: '#fff',
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
    backgroundColor: colors.cardDark,
    borderRadius: radius.lg,
    padding: spacing.md,
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.xs / 2,
    borderWidth: 1,
    borderColor: 'rgba(148, 163, 184, 0.5)',
  },
  statValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.primaryIndigo,
  },
  statLabel: {
    fontSize: 12,
    fontWeight: '500',
    color: colors.textSecondary,
  },
  menuSection: {
    gap: spacing.sm,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.cardDark,
    borderRadius: radius.lg,
    padding: spacing.md,
    gap: spacing.md,
    borderWidth: 1,
    borderColor: 'rgba(148, 163, 184, 0.5)',
  },
  menuIcon: {
    fontSize: 24,
    color: colors.textSecondary,
  },
  menuText: {
    flex: 1,
    fontSize: 16,
    fontWeight: '500',
    color: colors.textPrimary,
  },
  chevronIcon: {
    fontSize: 20,
    color: colors.textSecondary,
  },
  logoutButton: {
    marginTop: spacing.md,
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: '#ef4444',
    borderRadius: radius.lg,
    padding: spacing.md,
    alignItems: 'center',
  },
  logoutText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#ef4444',
  },
});

export default ProfileScreen;
