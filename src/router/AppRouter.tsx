import React from 'react';
import {View} from 'react-native';
import {Routes, Route, Navigate, useParams, useNavigate} from 'react-router-dom';
import {useAuthStore} from '../stores/authStore';
import {useNavigationStore} from '../stores/navigationStore';

// Auth screens
import OnboardingScreen from '../screens/auth/OnboardingScreen';
import LoginScreen from '../screens/auth/LoginScreen';
import RegisterScreen from '../screens/auth/RegisterScreen';

// Main screens
import HomeScreen from '../screens/home/HomeScreen';
import FriendsScreen from '../screens/friends/FriendsScreen';
import ProfileScreen from '../screens/profile/ProfileScreen';
import SettingsScreen from '../screens/settings/SettingsScreen';
import RoomScreen from '../screens/room/RoomScreen';
import MatchingScreen from '../screens/matching/MatchingScreen';
import InviteScreen from '../screens/invite/InviteScreen';

// Wrapper component for RoomScreen to get params
const RoomScreenWrapper: React.FC = () => {
  const {roomId} = useParams<{roomId: string}>();
  const navigate = useNavigate();
  
  return (
    <RoomScreen
      roomId={roomId}
      onBack={() => navigate(-1)}
      onLeave={() => navigate('/home')}
    />
  );
};

// Wrapper component for InviteScreen to get params
const InviteScreenWrapper: React.FC = () => {
  const {roomId} = useParams<{roomId: string}>();
  const navigate = useNavigate();
  
  return (
    <InviteScreen
      roomId={roomId}
      onBack={() => navigate(-1)}
    />
  );
};

// Protected route wrapper
const ProtectedRoute: React.FC<{children: React.ReactNode}> = ({children}) => {
  const {isAuthenticated, loadUser} = useAuthStore();
  const [loading, setLoading] = React.useState(true);
  const navigate = useNavigate();

  React.useEffect(() => {
    const checkAuth = async () => {
      await loadUser();
      setLoading(false);
    };
    checkAuth();
  }, [loadUser]);

  React.useEffect(() => {
    if (!loading && !isAuthenticated) {
      navigate('/login', {replace: true});
    }
  }, [loading, isAuthenticated, navigate]);

  if (loading) {
    return <View />; // Empty view while loading
  }

  if (!isAuthenticated) {
    return <View />; // Empty view while redirecting
  }

  return <>{children}</>;
};

// Public route wrapper (redirects to home if authenticated)
const PublicRoute: React.FC<{children: React.ReactNode}> = ({children}) => {
  const {isAuthenticated, loadUser} = useAuthStore();
  const [loading, setLoading] = React.useState(true);
  const navigate = useNavigate();

  React.useEffect(() => {
    const checkAuth = async () => {
      await loadUser();
      setLoading(false);
    };
    checkAuth();
  }, [loadUser]);

  React.useEffect(() => {
    if (!loading && isAuthenticated) {
      navigate('/home', {replace: true});
    }
  }, [loading, isAuthenticated, navigate]);

  if (loading) {
    return <View />; // Empty view while loading
  }

  if (isAuthenticated) {
    return <View />; // Empty view while redirecting
  }

  return <>{children}</>;
};

const AppRouter: React.FC = () => {
  const navigate = useNavigate();
  const setRouterNavigate = useNavigationStore((state) => state.setRouterNavigate);

  // Set router navigate function in navigation store
  React.useEffect(() => {
    setRouterNavigate(navigate);
  }, [navigate, setRouterNavigate]);

  return (
    <Routes>
      {/* Root redirect */}
      <Route path="/" element={<Navigate to="/home" replace />} />

      {/* Auth routes */}
      <Route
        path="/onboarding"
        element={
          <PublicRoute>
            <OnboardingScreen onComplete={() => navigate('/login')} />
          </PublicRoute>
        }
      />
      <Route
        path="/login"
        element={
          <PublicRoute>
            <LoginScreen onSwitch={() => navigate('/register')} onLogin={() => navigate('/home')} />
          </PublicRoute>
        }
      />
      <Route
        path="/register"
        element={
          <PublicRoute>
            <RegisterScreen onSwitch={() => navigate('/login')} onRegisterSuccess={() => navigate('/home')} />
          </PublicRoute>
        }
      />

      {/* Protected main routes */}
      <Route
        path="/home"
        element={
          <ProtectedRoute>
            <HomeScreen onTabChange={() => {}} />
          </ProtectedRoute>
        }
      />
      <Route
        path="/friends"
        element={
          <ProtectedRoute>
            <FriendsScreen onTabChange={() => {}} />
          </ProtectedRoute>
        }
      />
      <Route
        path="/profile"
        element={
          <ProtectedRoute>
            <ProfileScreen onTabChange={() => {}} />
          </ProtectedRoute>
        }
      />
      <Route
        path="/settings"
        element={
          <ProtectedRoute>
            <SettingsScreen onTabChange={() => {}} />
          </ProtectedRoute>
        }
      />
      <Route
        path="/room/:roomId"
        element={
          <ProtectedRoute>
            <RoomScreenWrapper />
          </ProtectedRoute>
        }
      />
      <Route
        path="/matching"
        element={
          <ProtectedRoute>
            <MatchingScreen onBack={() => {}} />
          </ProtectedRoute>
        }
      />
      <Route
        path="/invite/:roomId"
        element={
          <ProtectedRoute>
            <InviteScreenWrapper />
          </ProtectedRoute>
        }
      />

      {/* 404 fallback */}
      <Route path="*" element={<Navigate to="/home" replace />} />
    </Routes>
  );
};

export default AppRouter;


