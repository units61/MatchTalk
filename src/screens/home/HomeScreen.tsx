import React, {useState} from 'react';
import {View, StyleSheet, Platform} from 'react-native';
import {useNavigate} from 'react-router-dom';
import BottomNav from '../../components/ui/BottomNav';
import VoiceMatchHero from '../../components/home/VoiceMatchHero';
import {colors} from '../../theme/colors';
import {spacing} from '../../theme/spacing';
import {radius} from '../../theme/radius';

interface HomeScreenProps {
  onTabChange?: (tab: 'home' | 'friends' | 'profile' | 'settings') => void;
}

const HomeScreen: React.FC<HomeScreenProps> = ({onTabChange}) => {
  const [activeTab, setActiveTab] = useState<'home' | 'friends' | 'profile' | 'settings'>('home');
  const navigate = useNavigate();

  const handleTabChange = (tab: 'home' | 'friends' | 'profile' | 'settings') => {
    setActiveTab(tab);
    onTabChange?.(tab);
    navigate(`/${tab}`);
  };

  return (
    <View style={styles.container}>
      <View style={styles.heroWrapper}>
        <VoiceMatchHero />
      </View>

      {/* Bottom Navigation */}
      <BottomNav activeTab={activeTab} onTabChange={handleTabChange} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0f0c29',
    ...Platform.select({
      web: {
        // Create Animated Stitch Video'daki gradient'e yakın
        backgroundImage:
          'linear-gradient(to bottom right, #0f0c29, #302b63, #24243e)' as any,
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        minHeight: '100vh' as any,
      },
    }),
  },
  heroWrapper: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: spacing.md,
    paddingTop: spacing.xl,
    paddingBottom: 140,
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
