import React, {Suspense, lazy} from 'react';
import {View, Text, ActivityIndicator, StyleSheet} from 'react-native';
import {Routes, Route, Navigate, useParams, useNavigate} from 'react-router-dom';
import {useAuthStore} from '../stores/authStore';
import {useNavigationStore} from '../stores/navigationStore';
import {colors} from '../theme/colors';
import {spacing} from '../theme/spacing';

// Lazy load screens for code splitting
const OnboardingScreen = lazy(() => import('../screens/auth/OnboardingScreen'));
const LoginScreen = lazy(() => import('../screens/auth/LoginScreen'));
const RegisterScreen = lazy(() => import('../screens/auth/RegisterScreen'));
const HomeScreen = lazy(() => import('../screens/home/HomeScreen'));
const FriendsScreen = lazy(() => import('../screens/friends/FriendsScreen'));
const ProfileScreen = lazy(() => import('../screens/profile/ProfileScreen'));
const SettingsScreen = lazy(() => import('../screens/settings/SettingsScreen'));
const EditProfileScreen = lazy(() => import('../screens/settings/EditProfileScreen'));
const ChangePasswordScreen = lazy(() => import('../screens/settings/ChangePasswordScreen'));
const ChangeEmailScreen = lazy(() => import('../screens/settings/ChangeEmailScreen'));
const RoomScreen = lazy(() => import('../screens/room/RoomScreen'));
const MatchingScreen = lazy(() => import('../screens/matching/MatchingScreen'));
const InviteScreen = lazy(() => import('../screens/invite/InviteScreen'));
const NotificationsScreen = lazy(() => import('../screens/notifications/NotificationsScreen'));

// Loading fallback component
const LoadingFallback: React.FC = () => (
  <View style={styles.loadingContainer}>
    <ActivityIndicator size="large" color={colors.primaryIndigo} />
    <Text style={styles.loadingText}>Yükleniyor...</Text>
  </View>
);

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
    <Suspense fallback={<LoadingFallback />}>
      <Routes>
        {/* Root redirect */}
        <Route path="/" element={<Navigate to="/home" replace />} />

        {/* Auth routes */}
        <Route
          path="/onboarding"
          element={
            <PublicRoute>
              <Suspense fallback={<LoadingFallback />}>
                <OnboardingScreen onComplete={() => navigate('/login')} />
              </Suspense>
            </PublicRoute>
          }
        />
        <Route
          path="/login"
          element={
            <PublicRoute>
              <Suspense fallback={<LoadingFallback />}>
                <LoginScreen onSwitch={() => navigate('/register')} onLogin={() => navigate('/home')} />
              </Suspense>
            </PublicRoute>
          }
        />
        <Route
          path="/register"
          element={
            <PublicRoute>
              <Suspense fallback={<LoadingFallback />}>
                <RegisterScreen onSwitch={() => navigate('/login')} onRegisterSuccess={() => navigate('/home')} />
              </Suspense>
            </PublicRoute>
          }
        />

        {/* Protected main routes */}
        <Route
          path="/home"
          element={
            <ProtectedRoute>
              <Suspense fallback={<LoadingFallback />}>
                <HomeScreen onTabChange={() => {}} />
              </Suspense>
            </ProtectedRoute>
          }
        />
        <Route
          path="/friends"
          element={
            <ProtectedRoute>
              <Suspense fallback={<LoadingFallback />}>
                <FriendsScreen onTabChange={() => {}} />
              </Suspense>
            </ProtectedRoute>
          }
        />
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <Suspense fallback={<LoadingFallback />}>
                <ProfileScreen onTabChange={() => {}} />
              </Suspense>
            </ProtectedRoute>
          }
        />
        <Route
          path="/settings"
          element={
            <ProtectedRoute>
              <Suspense fallback={<LoadingFallback />}>
                <SettingsScreen onTabChange={() => {}} />
              </Suspense>
            </ProtectedRoute>
          }
        />
        <Route
          path="/settings/edit-profile"
          element={
            <ProtectedRoute>
              <Suspense fallback={<LoadingFallback />}>
                <EditProfileScreen />
              </Suspense>
            </ProtectedRoute>
          }
        />
        <Route
          path="/settings/change-password"
          element={
            <ProtectedRoute>
              <Suspense fallback={<LoadingFallback />}>
                <ChangePasswordScreen />
              </Suspense>
            </ProtectedRoute>
          }
        />
        <Route
          path="/settings/change-email"
          element={
            <ProtectedRoute>
              <Suspense fallback={<LoadingFallback />}>
                <ChangeEmailScreen />
              </Suspense>
            </ProtectedRoute>
          }
        />
        <Route
          path="/room/:roomId"
          element={
            <ProtectedRoute>
              <Suspense fallback={<LoadingFallback />}>
                <RoomScreenWrapper />
              </Suspense>
            </ProtectedRoute>
          }
        />
        <Route
          path="/matching"
          element={
            <ProtectedRoute>
              <Suspense fallback={<LoadingFallback />}>
                <MatchingScreen onBack={() => {}} />
              </Suspense>
            </ProtectedRoute>
          }
        />
        <Route
          path="/invite/:roomId"
          element={
            <ProtectedRoute>
              <Suspense fallback={<LoadingFallback />}>
                <InviteScreenWrapper />
              </Suspense>
            </ProtectedRoute>
          }
        />
        <Route
          path="/notifications"
          element={
            <ProtectedRoute>
              <Suspense fallback={<LoadingFallback />}>
                <NotificationsScreen />
              </Suspense>
            </ProtectedRoute>
          }
        />

        {/* 404 fallback */}
        <Route path="*" element={<Navigate to="/home" replace />} />
      </Routes>
    </Suspense>
  );
};

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.backgroundLightMain,
    gap: spacing.md,
  },
  loadingText: {
    fontSize: 16,
    color: colors.textSecondary,
  },
});

export default AppRouter;





