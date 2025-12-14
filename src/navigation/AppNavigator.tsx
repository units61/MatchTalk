import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import AuthNavigator from './AuthNavigator';
import HomeScreen from '../screens/home/HomeScreen';
import FriendsScreen from '../screens/friends/FriendsScreen';
import ProfileScreen from '../screens/profile/ProfileScreen';
import SettingsScreen from '../screens/settings/SettingsScreen';
import RoomScreen from '../screens/room/RoomScreen';
import MatchingScreen from '../screens/matching/MatchingScreen';
import InviteScreen from '../screens/invite/InviteScreen';
import {useAuthStore} from '../stores/authStore';
import {useNavigationStore} from '../stores/navigationStore';
import {colors} from '../theme/colors';
import {spacing} from '../theme/spacing';
import {typography} from '../theme/typography';

type Tab = 'home' | 'friends' | 'profile' | 'settings';

const AppNavigator: React.FC = () => {
  const {isAuthenticated, loadUser} = useAuthStore();
  
  // Get current screen from navigation store
  const currentScreen = useNavigationStore((state) => {
    const stack = state.stack;
    return stack[stack.length - 1]?.screen || 'home';
  });
  const currentParams = useNavigationStore((state) => {
    const stack = state.stack;
    return stack[stack.length - 1]?.params;
  });

  // Load user on mount
  useEffect(() => {
    loadUser();
  }, [loadUser]);

  const handleAuthSuccess = () => {
    // Auth store will handle the state update
  };

  const handleTabChange = (tab: Tab) => {
    // Update navigation stack for tab screens
    useNavigationStore.getState().replace(tab);
  };

  if (!isAuthenticated) {
    return <AuthNavigator onAuthSuccess={handleAuthSuccess} />;
  }

  // Use currentScreen from navigation store for all screens
  const screenToRender = currentScreen;

  // Render screen based on navigation stack
  const renderScreen = () => {
    switch (screenToRender) {
      // Tab screens
      case 'home':
        return <HomeScreen onTabChange={handleTabChange} />;
      case 'friends':
        return <FriendsScreen onTabChange={handleTabChange} />;
      case 'profile':
        return <ProfileScreen onTabChange={handleTabChange} />;
      case 'settings':
        return <SettingsScreen onTabChange={handleTabChange} />;
      
      // Stack screens
      case 'room':
        return (
          <RoomScreen
            roomId={currentParams?.roomId}
            roomName={currentParams?.roomName}
            onBack={() => useNavigationStore.getState().goBack()}
          />
        );
      case 'matching':
        return (
          <MatchingScreen
            onBack={() => useNavigationStore.getState().goBack()}
          />
        );
      case 'invite':
        return (
          <InviteScreen
            roomId={currentParams?.roomId}
            roomName={currentParams?.roomName}
            onBack={() => useNavigationStore.getState().goBack()}
          />
        );
      case 'notifications':
        // Temporary placeholder for NotificationsScreen
        return (
          <View style={styles.placeholderContainer}>
            <Text style={styles.placeholderText}>Bildirimler</Text>
            <Text style={styles.placeholderSubtext}>Yakında...</Text>
          </View>
        );
      default:
        return <HomeScreen onTabChange={handleTabChange} />;
    }
  };

  return renderScreen();
};

const styles = StyleSheet.create({
  placeholderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.backgroundLightMain,
    padding: spacing.xl,
  },
  placeholderText: {
    ...typography.h2,
    color: colors.textPrimary,
    marginBottom: spacing.sm,
  },
  placeholderSubtext: {
    ...typography.body,
    color: colors.textSecondary,
  },
});

export default AppNavigator;
