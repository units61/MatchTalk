import React from 'react';
import {View, StyleSheet, Pressable, Platform} from 'react-native';
import Icon from '../common/Icon';
import {colors} from '../../theme/colors';
import {spacing} from '../../theme/spacing';
import {radius} from '../../theme/radius';

interface BottomNavProps {
  activeTab: 'home' | 'friends' | 'profile' | 'settings';
  onTabChange: (tab: 'home' | 'friends' | 'profile' | 'settings') => void;
}

const BottomNav: React.FC<BottomNavProps> = ({activeTab, onTabChange}) => {
  const tabs = [
    {id: 'home' as const, icon: 'home', label: 'Ana Sayfa'},
    {id: 'friends' as const, icon: 'group', label: 'Arkadaşlar'},
    {id: 'profile' as const, icon: 'person', label: 'Profil'},
    {id: 'settings' as const, icon: 'settings', label: 'Ayarlar'},
  ];

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        {tabs.map((tab) => {
          const isActive = activeTab === tab.id;
          return (
            <Pressable
              key={tab.id}
              style={styles.tab}
              onPress={() => onTabChange(tab.id)}
              accessibilityRole="button"
              accessibilityLabel={tab.label}
              accessibilityState={{selected: isActive}}
              accessibilityHint={`${tab.label} sekmesine geç`}>
              <View style={styles.tabContent}>
                <Icon
                  name={tab.icon}
                  style={[
                    styles.icon,
                    isActive && styles.iconActive,
                  ]}
                />
                {isActive && <View style={styles.indicator} />}
              </View>
            </Pressable>
          );
        })}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#e2e8f0',
    height: 84,
    paddingBottom: spacing.xl,
    paddingHorizontal: spacing.xl,
    ...Platform.select({
      web: {
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: 40,
      },
    }),
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: '100%',
    maxWidth: 400,
    alignSelf: 'center',
    width: '100%',
  },
  tab: {
    width: 48,
    alignItems: 'center',
    justifyContent: 'center',
  },
  tabContent: {
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.xs / 2,
  },
  icon: {
    fontSize: 28,
    color: colors.textSecondary,
  },
  iconActive: {
    color: colors.primaryIndigo,
  },
  indicator: {
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: colors.primaryIndigo,
  },
});

export default BottomNav;
