import React, {useState} from 'react';
import {View, Text, StyleSheet, TextInput, Pressable, Platform, Alert} from 'react-native';
import Icon from '../../components/common/Icon';
import {colors} from '../../theme/colors';
import {spacing} from '../../theme/spacing';
import {typography} from '../../theme/typography';
import {radius} from '../../theme/radius';
import {useAuthStore} from '../../stores/authStore';

interface Props {
  onSwitch: () => void;
  onLogin?: () => void;
}

const LoginScreen: React.FC<Props> = ({onSwitch, onLogin}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const {login, loading, error} = useAuthStore();

  const handleLogin = async () => {
    if (!email.trim() || !password.trim()) {
      Alert.alert('Hata', 'Lütfen e-posta ve şifre giriniz');
      return;
    }

    try {
      await login({email: email.trim(), password});
      onLogin?.();
    } catch (err) {
      const message =
        err instanceof Error ? err.message : error || 'Bir hata oluştu';
      Alert.alert('Giriş Başarısız', message);
    }
  };

  return (
    <View style={styles.container}>
      {/* Background Shapes */}
      <View style={styles.backgroundShapes}>
        <View style={styles.blob1} />
        <View style={styles.blob2} />
      </View>

      {/* Main Content */}
      <View style={styles.content}>
        {/* Logo & Header */}
        <View style={styles.header}>
          <View style={styles.logoContainer}>
            <Icon name="graphic_eq" style={styles.logoIcon} />
          </View>
          <Text style={styles.title}>MatchTalk</Text>
          <Text style={styles.subtitle}>Hoş Geldiniz</Text>
        </View>

        {/* Form Section */}
        <View style={styles.form}>
          {/* Email Input */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>E-posta</Text>
            <View style={styles.inputWrapper}>
              <TextInput
                style={styles.input}
                placeholder="ornek@email.com"
                placeholderTextColor={colors.textSecondary}
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
              />
              <View style={styles.inputIcon}>
                <Icon name="mail" style={styles.icon} />
              </View>
            </View>
          </View>

          {/* Password Input */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Şifre</Text>
            <View style={styles.inputWrapper}>
              <TextInput
                style={styles.input}
                placeholder="Şifreniz"
                placeholderTextColor={colors.textSecondary}
                value={password}
                onChangeText={setPassword}
                secureTextEntry={!showPassword}
              />
              <Pressable
                style={styles.visibilityButton}
                onPress={() => setShowPassword(!showPassword)}>
                <Icon
                  name={showPassword ? 'visibility' : 'visibility_off'}
                  style={styles.icon}
                />
              </Pressable>
            </View>
          </View>

          {/* Login Button */}
          <Pressable
            style={[styles.loginButton, loading && styles.loginButtonDisabled]}
            onPress={handleLogin}
            disabled={loading}>
            <Text style={styles.loginButtonText}>
              {loading ? 'Giriş yapılıyor...' : 'Giriş Yap'}
            </Text>
            {!loading && <Icon name="arrow_forward" style={styles.buttonIcon} />}
          </Pressable>
        </View>

        {error ? (
          <Text style={styles.errorText}>{error}</Text>
        ) : null}

        {/* Footer / Sign Up Link */}
        <View style={styles.footer}>
          <Text style={styles.footerText}>
            Hesabın yok mu?{' '}
            <Pressable onPress={onSwitch}>
              <Text style={styles.footerLink}>Kayıt Ol</Text>
            </Pressable>
          </Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.backgroundLight,
    ...Platform.select({
      web: {
        minHeight: '100vh',
      },
    }),
  },
  backgroundShapes: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 0,
  },
  blob1: {
    position: 'absolute',
    top: '-10%',
    right: '-20%',
    width: '80%',
    height: '40%',
    borderRadius: 9999,
    backgroundColor: 'rgba(249, 245, 6, 0.2)',
    ...Platform.select({
      web: {
        filter: 'blur(100px)',
      },
    }),
  },
  blob2: {
    position: 'absolute',
    bottom: '-10%',
    left: '-10%',
    width: '60%',
    height: '30%',
    borderRadius: 9999,
    backgroundColor: 'rgba(249, 245, 6, 0.1)',
    ...Platform.select({
      web: {
        filter: 'blur(80px)',
      },
    }),
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: spacing.xl,
    paddingVertical: spacing.xxl,
    maxWidth: 400,
    width: '100%',
    alignSelf: 'center',
    zIndex: 1,
  },
  header: {
    width: '100%',
    alignItems: 'center',
    marginBottom: spacing.xxl,
  },
  logoContainer: {
    width: 80,
    height: 80,
    backgroundColor: colors.primary,
    borderRadius: radius.lg,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.lg,
    shadowColor: colors.primary,
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 0.3,
    shadowRadius: 8,
    transform: [{rotate: '3deg'}],
  },
  logoIcon: {
    fontSize: 36,
    color: '#000',
    fontWeight: 'bold',
  },
  title: {
    ...typography.h1,
    fontSize: 32,
    color: colors.textPrimary,
    textAlign: 'center',
    marginBottom: spacing.sm,
  },
  subtitle: {
    fontSize: 18,
    fontWeight: '500',
    color: colors.textSecondary,
    textAlign: 'center',
  },
  form: {
    width: '100%',
    gap: spacing.lg,
  },
  inputGroup: {
    gap: spacing.sm,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.textPrimary,
    paddingLeft: spacing.xs,
  },
  inputWrapper: {
    position: 'relative',
    flexDirection: 'row',
    alignItems: 'center',
  },
  input: {
    flex: 1,
    height: 56,
    paddingHorizontal: spacing.xl,
    paddingRight: 48,
    borderRadius: radius.full,
    borderWidth: 1,
    borderColor: colors.borderLight,
    backgroundColor: '#fff',
    fontSize: 16,
    color: colors.textPrimary,
  },
  inputIcon: {
    position: 'absolute',
    right: spacing.xl,
    pointerEvents: 'none',
  },
  visibilityButton: {
    position: 'absolute',
    right: spacing.sm,
    top: spacing.sm,
    bottom: spacing.sm,
    aspectRatio: 1,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: radius.full,
    padding: spacing.xs,
  },
  icon: {
    fontSize: 20,
    color: colors.textSecondary,
  },
  forgotPassword: {
    alignItems: 'flex-end',
    paddingTop: spacing.xs,
  },
  forgotPasswordText: {
    fontSize: 14,
    fontWeight: '500',
    color: colors.textSecondary,
  },
  loginButton: {
    width: '100%',
    height: 56,
    backgroundColor: colors.primary,
    borderRadius: radius.full,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.sm,
    marginTop: spacing.md,
    shadowColor: colors.primary,
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 0.2,
    shadowRadius: 8,
  },
  loginButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
  },
  buttonIcon: {
    fontSize: 20,
    color: '#000',
  },
  footer: {
    marginTop: 'auto',
    paddingTop: spacing.xxl,
    paddingBottom: spacing.md,
  },
  footerText: {
    fontSize: 14,
    fontWeight: '500',
    color: colors.textSecondary,
    textAlign: 'center',
  },
  footerLink: {
    color: colors.textPrimary,
    fontWeight: 'bold',
    textDecorationLine: 'underline',
    textDecorationColor: colors.primary,
  },
  loginButtonDisabled: {
    opacity: 0.6,
  },
  errorText: {
    marginTop: spacing.md,
    color: colors.error || '#d32f2f',
    textAlign: 'center',
    fontSize: 14,
    fontWeight: '600',
  },
});

export default LoginScreen;
