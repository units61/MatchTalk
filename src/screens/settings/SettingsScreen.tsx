import React, {useState} from 'react';
import {View, Text, StyleSheet, ScrollView, Pressable, Platform} from 'react-native';
import Icon from '../../components/common/Icon';
import BottomNav from '../../components/ui/BottomNav';
import {colors} from '../../theme/colors';
import {spacing} from '../../theme/spacing';
import {typography} from '../../theme/typography';
import {radius} from '../../theme/radius';

interface SettingsScreenProps {
  onTabChange?: (tab: 'home' | 'friends' | 'profile' | 'settings') => void;
  onBack?: () => void;
}

const SettingsScreen: React.FC<SettingsScreenProps> = ({onTabChange, onBack}) => {
  const [activeNavTab, setActiveNavTab] = useState<'home' | 'friends' | 'profile' | 'settings'>('settings');
  const [pushNotifications, setPushNotifications] = useState(true);
  const [emailNotifications, setEmailNotifications] = useState(false);
  const [roomInvites, setRoomInvites] = useState(true);

  const handleNavTabChange = (tab: 'home' | 'friends' | 'profile' | 'settings') => {
    setActiveNavTab(tab);
    onTabChange?.(tab);
  };

  const ToggleSwitch: React.FC<{value: boolean; onValueChange: (value: boolean) => void}> = ({
    value,
    onValueChange,
  }) => {
    return (
      <Pressable
        style={[styles.toggleContainer, value && styles.toggleContainerActive]}
        onPress={() => onValueChange(!value)}>
        <View style={[styles.toggleThumb, value && styles.toggleThumbActive]} />
      </Pressable>
    );
  };

  const MenuItem: React.FC<{
    icon: string;
    title: string;
    subtitle?: string;
    onPress?: () => void;
    showChevron?: boolean;
  }> = ({icon, title, subtitle, onPress, showChevron = true}) => {
    return (
      <Pressable style={styles.menuItem} onPress={onPress}>
        <View style={styles.menuIconContainer}>
          <Icon name={icon} style={styles.menuIcon} />
        </View>
        <View style={styles.menuTextContainer}>
          <Text style={styles.menuTitle}>{title}</Text>
          {subtitle && <Text style={styles.menuSubtitle}>{subtitle}</Text>}
        </View>
        {showChevron && <Icon name="chevron_right" style={styles.chevronIcon} />}
      </Pressable>
    );
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Pressable style={styles.backButton} onPress={onBack}>
          <Icon name="arrow_back_ios_new" style={styles.backIcon} />
        </Pressable>
        <Text style={styles.headerTitle}>Ayarlar</Text>
        <View style={styles.headerSpacer} />
      </View>

      {/* Scrollable Content */}
      <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollContent}>
        {/* Section: HESAP */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>HESAP</Text>
          <View style={styles.sectionContent}>
            <MenuItem icon="edit" title="Profil Düzenle" />
            <MenuItem icon="lock" title="Şifre Değiştir" />
            <MenuItem icon="mail" title="E-posta Değiştir" />
          </View>
        </View>

        {/* Section: BİLDİRİMLER */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>BİLDİRİMLER</Text>
          <View style={styles.sectionContent}>
            <View style={styles.toggleItem}>
              <View style={styles.toggleItemLeft}>
                <View style={styles.menuIconContainer}>
                  <Icon name="notifications" style={styles.menuIcon} />
                </View>
                <Text style={styles.menuTitle}>Push Bildirimleri</Text>
              </View>
              <ToggleSwitch value={pushNotifications} onValueChange={setPushNotifications} />
            </View>
            <View style={styles.toggleItem}>
              <View style={styles.toggleItemLeft}>
                <View style={styles.menuIconContainer}>
                  <Icon name="mark_email_unread" style={styles.menuIcon} />
                </View>
                <Text style={styles.menuTitle}>E-posta Bildirimleri</Text>
              </View>
              <ToggleSwitch value={emailNotifications} onValueChange={setEmailNotifications} />
            </View>
            <View style={styles.toggleItem}>
              <View style={styles.toggleItemLeft}>
                <View style={styles.menuIconContainer}>
                  <Icon name="group_add" style={styles.menuIcon} />
                </View>
                <Text style={styles.menuTitle}>Oda Davetleri</Text>
              </View>
              <ToggleSwitch value={roomInvites} onValueChange={setRoomInvites} />
            </View>
          </View>
        </View>

        {/* Section: GİZLİLİK */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>GİZLİLİK</Text>
          <View style={styles.sectionContent}>
            <MenuItem icon="visibility" title="Profil Görünürlüğü" subtitle="Herkes" />
            <MenuItem icon="person_add" title="Kimler Beni Ekleyebilir" subtitle="Herkes" />
          </View>
        </View>

        {/* Section: UYGULAMA */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>UYGULAMA</Text>
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
          <Text style={styles.sectionTitle}>HESAP YÖNETİMİ</Text>
          <View style={styles.sectionContent}>
            <Pressable style={styles.dangerButton}>
              <Text style={styles.dangerButtonText}>Çıkış Yap</Text>
            </Pressable>
            <Pressable style={styles.dangerButton}>
              <Text style={styles.dangerButtonText}>Hesabı Sil</Text>
            </Pressable>
          </View>
        </View>

        {/* Version Info */}
        <View style={styles.versionContainer}>
          <Text style={styles.versionText}>MatchTalk v2.4.0</Text>
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
    backgroundColor: colors.backgroundLight,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.md,
    paddingTop: spacing.xxl,
    paddingBottom: spacing.md,
    backgroundColor: colors.backgroundLight,
    zIndex: 50,
  },
  backButton: {
    padding: spacing.sm,
  },
  backIcon: {
    fontSize: 24,
    color: colors.textPrimary,
  },
  headerTitle: {
    ...typography.h2,
    color: colors.textPrimary,
    flex: 1,
    textAlign: 'center',
  },
  headerSpacer: {
    width: 40,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: spacing.md,
    paddingBottom: 100,
  },
  section: {
    marginTop: spacing.lg,
  },
  sectionTitle: {
    fontSize: 11,
    fontWeight: '600',
    color: colors.textSecondary,
    textTransform: 'uppercase',
    letterSpacing: 1.6,
    marginBottom: spacing.sm,
    paddingLeft: spacing.xs,
  },
  sectionContent: {
    gap: spacing.xs,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.cardDark,
    padding: spacing.md,
    borderRadius: radius.xl,
    gap: spacing.md,
  },
  menuIconContainer: {
    width: 40,
    height: 40,
    borderRadius: radius.lg,
    backgroundColor: `${colors.primary}1A`,
    alignItems: 'center',
    justifyContent: 'center',
  },
  menuIcon: {
    fontSize: 20,
    color: colors.primary,
  },
  menuTextContainer: {
    flex: 1,
  },
  menuTitle: {
    fontSize: 15,
    fontWeight: '500',
    color: colors.textPrimary,
  },
  menuSubtitle: {
    fontSize: 14,
    color: colors.textSecondary,
    marginTop: spacing.xs / 2,
  },
  chevronIcon: {
    fontSize: 20,
    color: colors.textMuted,
  },
  toggleItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: colors.cardDark,
    padding: spacing.md,
    borderRadius: radius.xl,
  },
  toggleItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
    flex: 1,
  },
  toggleContainer: {
    width: 48,
    height: 32,
    borderRadius: 16,
    backgroundColor: colors.border,
    padding: 2,
    justifyContent: 'center',
  },
  toggleContainerActive: {
    backgroundColor: colors.primary,
  },
  toggleThumb: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#fff',
    transform: [{translateX: 0}],
  },
  toggleThumbActive: {
    transform: [{translateX: 16}],
  },
  dangerButton: {
    backgroundColor: colors.cardDark,
    padding: spacing.md,
    borderRadius: radius.xl,
    alignItems: 'center',
    justifyContent: 'center',
  },
  dangerButtonText: {
    fontSize: 15,
    fontWeight: '500',
    color: colors.danger,
  },
  versionContainer: {
    alignItems: 'center',
    paddingVertical: spacing.xl,
  },
  versionText: {
    fontSize: 11,
    color: `${colors.textSecondary}80`,
  },
});

export default SettingsScreen;

