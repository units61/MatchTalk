import React, {useState, useEffect} from 'react';
import OnboardingScreen from '../screens/auth/OnboardingScreen';
import LoginScreen from '../screens/auth/LoginScreen';
import RegisterScreen from '../screens/auth/RegisterScreen';
import {useAuthStore} from '../stores/authStore';

type Step = 'onboarding' | 'login' | 'register';

interface AuthNavigatorProps {
  onAuthSuccess?: () => void;
}

const AuthNavigator: React.FC<AuthNavigatorProps> = ({onAuthSuccess}) => {
  const [step, setStep] = useState<Step>('onboarding');
  const {isAuthenticated, loadUser} = useAuthStore();

  // Check if user is already logged in
  useEffect(() => {
    loadUser();
  }, [loadUser]);

  // If authenticated, trigger success callback
  useEffect(() => {
    if (isAuthenticated) {
      onAuthSuccess?.();
    }
  }, [isAuthenticated, onAuthSuccess]);

  const handleAuthSuccess = () => {
    onAuthSuccess?.();
  };

  if (step === 'onboarding') {
    return <OnboardingScreen onComplete={() => setStep('login')} />;
  }

  if (step === 'register') {
    return (
      <RegisterScreen
        onSwitch={() => setStep('login')}
        onRegisterSuccess={handleAuthSuccess}
      />
    );
  }

  return <LoginScreen onSwitch={() => setStep('register')} onLogin={handleAuthSuccess} />;
};

export default AuthNavigator;



