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
      <View style={styles.navCard}>
        <View style={styles.content}>
          {tabs.map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <Pressable
                key={tab.id}
                style={styles.tab}
                onPress={() => onTabChange(tab.id)}>
                <View style={styles.tabContent}>
                  <View
                    style={[
                      styles.iconWrapper,
                      isActive && styles.iconWrapperActive,
                    ]}>
                    <Icon
                      name={tab.icon}
                      style={[
                        styles.icon,
                        isActive && styles.iconActive,
                      ]}
                    />
                  </View>
                  {isActive && <View style={styles.indicator} />}
                </View>
              </Pressable>
            );
          })}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'transparent',
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
  navCard: {
    borderRadius: radius.xl,
    backgroundColor: 'rgba(15, 23, 42, 0.9)',
    borderWidth: 1,
    borderColor: 'rgba(148, 163, 184, 0.5)',
    shadowColor: '#000',
    shadowOpacity: 0.35,
    shadowRadius: 18,
    shadowOffset: {width: 0, height: 8},
    ...Platform.select({
      web: {
        backdropFilter: 'blur(18px)' as any,
      },
    }),
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: 72,
    maxWidth: 420,
    alignSelf: 'center',
    width: '100%',
    paddingHorizontal: spacing.lg,
  },
  tab: {
    width: 56,
    alignItems: 'center',
    justifyContent: 'center',
  },
  tabContent: {
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.xs / 2,
  },
  icon: {
    fontSize: 22,
    color: 'rgba(226,232,240,0.8)',
  },
  iconActive: {
    color: '#22d3ee',
  },
  iconWrapper: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconWrapperActive: {
    backgroundColor: 'rgba(56,189,248,0.18)',
  },
  indicator: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#22d3ee',
  },
});

export default BottomNav;
