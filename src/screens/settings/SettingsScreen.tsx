import React, {useState} from 'react';
import {View, Text, StyleSheet, ScrollView, Pressable, Platform, useColorScheme} from 'react-native';
import {useNavigate} from 'react-router-dom';
import Icon from '../../components/common/Icon';
import BottomNav from '../../components/ui/BottomNav';
import {colors} from '../../theme/colors';
import {spacing} from '../../theme/spacing';
import {typography} from '../../theme/typography';
import {radius} from '../../theme/radius';
import {useNavigation} from '../../hooks/useNavigation';
import {useAuthStore} from '../../stores/authStore';

interface SettingsScreenProps {
  onTabChange?: (tab: 'home' | 'friends' | 'profile' | 'settings') => void;
  onBack?: () => void;
}

const SettingsScreen: React.FC<SettingsScreenProps> = ({onTabChange, onBack}) => {
  const [activeNavTab, setActiveNavTab] = useState<'home' | 'friends' | 'profile' | 'settings'>('settings');
  const [pushNotifications, setPushNotifications] = useState(true);
  const [emailNotifications, setEmailNotifications] = useState(false);
  const [roomInvites, setRoomInvites] = useState(true);
  const {navigate} = useNavigation();
  const navigateRouter = useNavigate(); // React Router navigate
  const {logout} = useAuthStore();
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';

  const handleNavTabChange = (tab: 'home' | 'friends' | 'profile' | 'settings') => {
    setActiveNavTab(tab);
    onTabChange?.(tab);
    // Navigate to the selected tab
    console.log(`[SettingsScreen] Navigating to tab: ${tab}`);
    navigateRouter(`/${tab}`);
  };

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  const ToggleSwitch: React.FC<{value: boolean; onValueChange: (value: boolean) => void}> = ({
    value,
    onValueChange,
  }) => {
    return (
      <Pressable
        style={styles.toggleWrapper}
        onPress={() => onValueChange(!value)}>
        <View style={[
          styles.toggleContainer, 
          isDark && styles.toggleContainerDark,
          value && styles.toggleContainerActive
        ]}>
          <View style={[styles.toggleThumb, value && styles.toggleThumbActive]} />
        </View>
      </Pressable>
    );
  };

  const dynamicStyles = {
    container: [styles.container, isDark && styles.containerDark],
    header: [styles.header, isDark && styles.headerDark],
    headerTitle: StyleSheet.flatten([styles.headerTitle, isDark && styles.headerTitleDark]),
    backIcon: StyleSheet.flatten([styles.backIcon, isDark && styles.backIconDark]),
    sectionTitle: StyleSheet.flatten([styles.sectionTitle, isDark && styles.sectionTitleDark]),
    menuItem: [styles.menuItem, isDark && styles.menuItemDark],
    menuIconContainer: [styles.menuIconContainer, isDark && styles.menuIconContainerDark],
    menuIcon: StyleSheet.flatten([styles.menuIcon, isDark && styles.menuIconDark]),
    menuTitle: StyleSheet.flatten([styles.menuTitle, isDark && styles.menuTitleDark]),
    menuSubtitle: StyleSheet.flatten([styles.menuSubtitle, isDark && styles.menuSubtitleDark]),
    toggleItem: [styles.toggleItem, isDark && styles.toggleItemDark],
    toggleContainer: [styles.toggleContainer, isDark && styles.toggleContainerDark],
    dangerButton: [styles.dangerButton, isDark && styles.dangerButtonDark],
    versionText: StyleSheet.flatten([styles.versionText, isDark && styles.versionTextDark]),
  };

  const MenuItem: React.FC<{
    icon: string;
    title: string;
    subtitle?: string;
    onPress?: () => void;
    showChevron?: boolean;
  }> = ({icon, title, subtitle, onPress, showChevron = true}) => {
    return (
      <Pressable 
        style={({pressed}) => [
          dynamicStyles.menuItem,
          pressed && styles.menuItemPressed
        ]} 
        onPress={onPress}>
        <View style={styles.menuItemLeft}>
          <View style={dynamicStyles.menuIconContainer}>
            <Icon name={icon} style={dynamicStyles.menuIcon} />
          </View>
          {subtitle ? (
            <View style={styles.menuTextContainer}>
              <Text style={dynamicStyles.menuTitle}>{title}</Text>
            </View>
          ) : (
            <Text style={dynamicStyles.menuTitle}>{title}</Text>
          )}
        </View>
        {subtitle ? (
          <View style={styles.menuItemRight}>
            <Text style={dynamicStyles.menuSubtitle}>{subtitle}</Text>
            {showChevron && <Icon name="chevron_right" style={styles.chevronIcon} />}
          </View>
        ) : (
          showChevron && <Icon name="chevron_right" style={styles.chevronIcon} />
        )}
      </Pressable>
    );
  };

  return (
    <View style={dynamicStyles.container}>
      {/* Header */}
      <View style={dynamicStyles.header}>
        <Pressable 
          style={({pressed}) => [
            styles.backButton,
            pressed && styles.backButtonPressed
          ]} 
          onPress={onBack}>
          <Icon name="arrow_back_ios_new" style={dynamicStyles.backIcon} />
        </Pressable>
        <Text style={dynamicStyles.headerTitle}>Ayarlar</Text>
        <View style={styles.headerSpacer} />
      </View>

      {/* Scrollable Content */}
      <ScrollView 
        style={styles.scrollView} 
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}>
        {/* Section: HESAP */}
        <View style={styles.sectionFirst}>
          <Text style={dynamicStyles.sectionTitle}>HESAP</Text>
          <View style={styles.sectionContent}>
            <MenuItem 
              icon="edit" 
              title="Profil Düzenle" 
              onPress={() => navigate('editProfile')} 
            />
            <MenuItem 
              icon="lock" 
              title="Şifre Değiştir" 
              onPress={() => navigate('changePassword')} 
            />
            <MenuItem 
              icon="mail" 
              title="E-posta Değiştir" 
              onPress={() => navigate('changeEmail')} 
            />
          </View>
        </View>

        {/* Section: BİLDİRİMLER */}
        <View style={styles.section}>
          <Text style={dynamicStyles.sectionTitle}>BİLDİRİMLER</Text>
          <View style={styles.sectionContent}>
            <View style={dynamicStyles.toggleItem}>
              <View style={styles.toggleItemLeft}>
                <View style={dynamicStyles.menuIconContainer}>
                  <Icon name="notifications" style={dynamicStyles.menuIcon} />
                </View>
                <Text style={dynamicStyles.menuTitle}>Push Bildirimleri</Text>
              </View>
              <ToggleSwitch value={pushNotifications} onValueChange={setPushNotifications} />
            </View>
            <View style={dynamicStyles.toggleItem}>
              <View style={styles.toggleItemLeft}>
                <View style={dynamicStyles.menuIconContainer}>
                  <Icon name="mark_email_unread" style={dynamicStyles.menuIcon} />
                </View>
                <Text style={dynamicStyles.menuTitle}>E-posta Bildirimleri</Text>
              </View>
              <ToggleSwitch value={emailNotifications} onValueChange={setEmailNotifications} />
            </View>
            <View style={dynamicStyles.toggleItem}>
              <View style={styles.toggleItemLeft}>
                <View style={dynamicStyles.menuIconContainer}>
                  <Icon name="group_add" style={dynamicStyles.menuIcon} />
                </View>
                <Text style={dynamicStyles.menuTitle}>Oda Davetleri</Text>
              </View>
              <ToggleSwitch value={roomInvites} onValueChange={setRoomInvites} />
            </View>
          </View>
        </View>

        {/* Section: GİZLİLİK */}
        <View style={styles.section}>
          <Text style={dynamicStyles.sectionTitle}>GİZLİLİK</Text>
          <View style={styles.sectionContent}>
            <MenuItem icon="visibility" title="Profil Görünürlüğü" subtitle="Herkes" />
            <MenuItem icon="person_add" title="Kimler Beni Ekleyebilir" subtitle="Herkes" />
          </View>
        </View>

        {/* Section: UYGULAMA */}
        <View style={styles.section}>
          <Text style={dynamicStyles.sectionTitle}>UYGULAMA</Text>
          <View style={styles.sectionContent}>
            <MenuItem icon="dark_mode" title="Tema" subtitle="Koyu" />
            <MenuItem icon="language" title="Dil" subtitle="Türkçe" />
            <MenuItem icon="info" title="Hakkında" />
            <MenuItem icon="help" title="Yardım & Destek" />
            <MenuItem icon="policy" title="Gizlilik Politikası" />
            <MenuItem icon="description" title="Kullanım Koşulları" />
          </View>
        </View>

        {/* Section: HESAP YÖNETİMİ */}
        <View style={styles.section}>
          <Text style={dynamicStyles.sectionTitle}>HESAP YÖNETİMİ</Text>
          <View style={styles.sectionContent}>
            <Pressable 
              style={({pressed}) => [
                dynamicStyles.dangerButton,
                pressed && styles.dangerButtonPressed
              ]}
              onPress={handleLogout}>
              <Text style={styles.dangerButtonText}>Çıkış Yap</Text>
            </Pressable>
            <Pressable 
              style={({pressed}) => [
                dynamicStyles.dangerButton,
                pressed && styles.dangerButtonPressed
              ]}>
              <Text style={styles.dangerButtonText}>Hesabı Sil</Text>
            </Pressable>
          </View>
        </View>

        {/* Version Info */}
        <View style={styles.versionContainer}>
          <Text style={dynamicStyles.versionText}>MatchTalk v2.4.0</Text>
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
    backgroundColor: '#f6f6f8', // background-light
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16, // px-4
    paddingTop: 24, // pt-6
    paddingBottom: 16, // pb-4
    backgroundColor: '#f6f6f8', // background-light
    ...(Platform.OS === 'web' ? {
      position: 'sticky' as any,
      top: 0,
      zIndex: 50,
    } : {}),
  },
  backButton: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 9999, // rounded-full
    ...Platform.select({
      web: {
        cursor: 'pointer',
        transition: 'all 0.2s',
        ':hover': {
          backgroundColor: 'rgba(0, 0, 0, 0.05)',
        },
        ':active': {
          transform: 'scale(0.95)',
        },
      },
    }),
  },
  backButtonPressed: {
    backgroundColor: 'rgba(0, 0, 0, 0.05)',
    transform: [{scale: 0.95}],
  },
  backIcon: {
    fontSize: 24,
    color: '#000', // text-black
  },
  headerTitle: {
    fontSize: 24, // text-2xl
    fontWeight: '700', // font-bold
    color: '#000', // text-black
    flex: 1,
    textAlign: 'center',
    paddingRight: 40, // pr-10
  },
  headerSpacer: {
    width: 40,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 16, // px-4
    paddingBottom: 48, // pb-12
    ...Platform.select({
      web: {
        // no-scrollbar
        scrollbarWidth: 'none',
        msOverflowStyle: 'none',
        '&::-webkit-scrollbar': {
          display: 'none',
        },
      },
    }),
  },
  section: {
    marginTop: 24, // mt-6
  },
  sectionFirst: {
    marginTop: 8, // mt-2
  },
  sectionTitle: {
    fontSize: 11, // text-xs
    fontWeight: '600', // font-semibold
    color: '#94A3B8', // text-text-secondary
    textTransform: 'uppercase',
    letterSpacing: 1.6, // tracking-[0.1em]
    marginBottom: 8, // mb-2
    paddingLeft: 4, // pl-1
  },
  sectionContent: {
    gap: 8, // gap-2
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#fff', // bg-white (dark: bg-surface-dark)
    padding: 16, // p-4
    borderRadius: 12, // rounded-xl (0.75rem)
    ...Platform.select({
      web: {
        transition: 'background-color 0.15s',
        cursor: 'pointer',
        ':active': {
          backgroundColor: '#f3f4f6', // active:bg-gray-100
        },
      },
    }),
  },
  menuItemPressed: {
    backgroundColor: '#f3f4f6', // active:bg-gray-100 (dark: active:bg-slate-700)
  },
  menuItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16, // gap-4
    flex: 1,
  },
  menuItemRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8, // gap-2
  },
  menuIconContainer: {
    width: 40, // size-10
    height: 40,
    borderRadius: 8, // rounded-lg
    backgroundColor: 'rgba(64, 64, 242, 0.1)', // bg-primary/10
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
  },
  menuIcon: {
    fontSize: 20,
    color: '#4040f2', // text-primary
  },
  menuTextContainer: {
    flex: 1,
  },
  menuTitle: {
    fontSize: 15, // text-[15px]
    fontWeight: '500', // font-medium
    color: '#111827', // text-gray-900 (dark: text-white)
  },
  menuSubtitle: {
    fontSize: 14, // text-sm
    color: '#94A3B8', // text-text-secondary
  },
  chevronIcon: {
    fontSize: 20,
    color: '#9ca3af', // text-gray-400
  },
  toggleItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#fff', // bg-white (dark: bg-surface-dark)
    padding: 16, // p-4
    borderRadius: 12, // rounded-xl
  },
  toggleItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16, // gap-4
    flex: 1,
  },
  toggleWrapper: {
    marginRight: 8, // mr-2
  },
  toggleContainer: {
    width: 48, // w-12
    height: 32, // h-8
    borderRadius: 16, // rounded-full
    backgroundColor: '#d1d5db', // bg-gray-300 (dark: bg-slate-600)
    padding: 4, // border-4
    justifyContent: 'center',
    position: 'relative',
  },
  toggleContainerActive: {
    backgroundColor: '#4040f2', // primary color when checked
  },
  toggleThumb: {
    width: 24, // w-6
    height: 24, // h-6
    borderRadius: 12, // rounded-full
    backgroundColor: '#fff',
    position: 'absolute',
    left: 4, // left-1
    top: 4, // top-1
    transform: [{translateX: 0}],
    ...Platform.select({
      web: {
        transition: 'transform 0.3s',
      },
    }),
  },
  toggleThumbActive: {
    transform: [{translateX: 20}], // translateX(100%) = 24px (thumb width) - 4px (left) = 20px
  },
  dangerButton: {
    backgroundColor: '#fff', // bg-white (dark: bg-surface-dark)
    padding: 16, // p-4
    borderRadius: 12, // rounded-xl
    alignItems: 'center',
    justifyContent: 'center',
    ...Platform.select({
      web: {
        transition: 'background-color 0.15s',
        cursor: 'pointer',
        ':active': {
          backgroundColor: '#f3f4f6', // active:bg-gray-100
        },
      },
    }),
  },
  dangerButtonPressed: {
    backgroundColor: '#f3f4f6', // active:bg-gray-100 (dark: active:bg-slate-700)
  },
  dangerButtonText: {
    fontSize: 15, // text-[15px]
    fontWeight: '500', // font-medium
    color: '#ef4444', // text-red-500
  },
  versionContainer: {
    width: '100%',
    alignItems: 'center',
    paddingTop: 16, // pt-4
    paddingBottom: 32, // pb-8
  },
  versionText: {
    fontSize: 11, // text-xs
    color: 'rgba(148, 163, 184, 0.5)', // text-text-secondary/50
  },
  // Dark mode styles
  containerDark: {
    backgroundColor: '#0F172A', // background-dark
  },
  headerDark: {
    backgroundColor: 'rgba(15, 23, 42, 0.95)', // background-dark/95
  },
  headerTitleDark: {
    color: '#fff', // text-white
  },
  backIconDark: {
    color: '#fff', // text-white
  },
  sectionTitleDark: {
    color: '#94A3B8', // text-text-secondary
  },
  menuItemDark: {
    backgroundColor: '#1E293B', // bg-surface-dark
  },
  menuIconContainerDark: {
    backgroundColor: '#475569', // bg-slate-700
  },
  menuIconDark: {
    color: '#fff', // text-white
  },
  menuTitleDark: {
    color: '#fff', // text-white
  },
  menuSubtitleDark: {
    color: '#94A3B8', // text-text-secondary
  },
  toggleItemDark: {
    backgroundColor: '#1E293B', // bg-surface-dark
  },
  toggleContainerDark: {
    backgroundColor: '#475569', // bg-slate-600
  },
  dangerButtonDark: {
    backgroundColor: '#1E293B', // bg-surface-dark
  },
  versionTextDark: {
    color: 'rgba(148, 163, 184, 0.5)', // text-text-secondary/50
  },
});

export default SettingsScreen;

