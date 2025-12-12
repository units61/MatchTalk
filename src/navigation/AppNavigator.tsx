import React, {useState, useEffect} from 'react';
import AuthNavigator from './AuthNavigator';
import HomeScreen from '../screens/home/HomeScreen';
import FriendsScreen from '../screens/friends/FriendsScreen';
import ProfileScreen from '../screens/profile/ProfileScreen';
import SettingsScreen from '../screens/settings/SettingsScreen';
import {useAuthStore} from '../stores/authStore';

type Tab = 'home' | 'friends' | 'profile' | 'settings';

const AppNavigator: React.FC = () => {
  const {isAuthenticated, loadUser} = useAuthStore();
  const [activeTab, setActiveTab] = useState<Tab>('home');

  // Load user on mount
  useEffect(() => {
    loadUser();
  }, [loadUser]);

  const handleAuthSuccess = () => {
    // Auth store will handle the state update
  };

  const handleTabChange = (tab: Tab) => {
    setActiveTab(tab);
  };

  if (!isAuthenticated) {
    return <AuthNavigator onAuthSuccess={handleAuthSuccess} />;
  }

  // Render active screen based on tab
  const renderScreen = () => {
    switch (activeTab) {
      case 'home':
        return <HomeScreen onTabChange={handleTabChange} />;
      case 'friends':
        return <FriendsScreen onTabChange={handleTabChange} />;
      case 'profile':
        return <ProfileScreen onTabChange={handleTabChange} />;
      case 'settings':
        return <SettingsScreen onTabChange={handleTabChange} />;
      default:
        return <HomeScreen onTabChange={handleTabChange} />;
    }
  };

  return renderScreen();
};

export default AppNavigator;
