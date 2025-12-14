import React, {useState} from 'react';
import {View, Text, StyleSheet, TextInput, Pressable, Platform} from 'react-native';
import Icon from '../../components/common/Icon';
import {colors} from '../../theme/colors';
import {spacing} from '../../theme/spacing';
import {typography} from '../../theme/typography';
import {radius} from '../../theme/radius';
import {useAuthStore} from '../../stores/authStore';
import {loginSchema} from '../../schemas/auth';
import {z} from 'zod';
import {toast} from '../../stores/toastStore';
import {ButtonLoading} from '../../components/ui/Loading';

interface Props {
  onSwitch: () => void;
  onLogin?: () => void;
}

const LoginScreen: React.FC<Props> = ({onSwitch, onLogin}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const {login, loading} = useAuthStore();

  const validateField = (field: 'email' | 'password', value: string) => {
    try {
      const fieldSchema = loginSchema.shape[field];
      if (fieldSchema) {
        fieldSchema.parse(value);
      }
      setErrors((prev) => {
        const newErrors = {...prev};
        delete newErrors[field];
        return newErrors;
      });
    } catch (error) {
      if (error instanceof z.ZodError && error.errors && Array.isArray(error.errors) && error.errors.length > 0) {
        const firstError = error.errors[0];
        setErrors((prev) => ({
          ...prev,
          [field]: (firstError && firstError.message) || 'Geçersiz değer',
        }));
      } else {
        setErrors((prev) => ({
          ...prev,
          [field]: 'Geçersiz değer',
        }));
      }
    }
  };

  const handleEmailChange = (value: string) => {
    setEmail(value);
    if (touched.email) {
      validateField('email', value);
    }
  };

  const handlePasswordChange = (value: string) => {
    setPassword(value);
    if (touched.password) {
      validateField('password', value);
    }
  };

  const handleBlur = (field: 'email' | 'password') => {
    setTouched((prev) => ({...prev, [field]: true}));
    validateField(field, field === 'email' ? email : password);
  };

  const handleLogin = async () => {
    // Mark all fields as touched
    setTouched({email: true, password: true});

    // Validate entire form
    try {
      const validatedData = loginSchema.parse({
        email: email.trim(),
        password,
      });
      setErrors({});
      
      // Debug logging
      if (process.env.NODE_ENV === 'development') {
        console.log('[LoginScreen] Attempting login with:', {email: validatedData.email});
      }
      
      await login(validatedData);
      toast.success('Giriş başarılı!');
      onLogin?.();
    } catch (error) {
      // Debug logging
      if (process.env.NODE_ENV === 'development') {
        console.error('[LoginScreen] Login error:', error);
      }
      if (error instanceof z.ZodError && error.errors && Array.isArray(error.errors)) {
        const fieldErrors: Record<string, string> = {};
        error.errors.forEach((err) => {
          if (err && err.path && Array.isArray(err.path) && err.path.length > 0 && err.path[0] && err.message) {
            fieldErrors[err.path[0] as string] = err.message;
          }
        });
        setErrors(fieldErrors);
        // İlk hatayı toast olarak göster
        if (error.errors && Array.isArray(error.errors) && error.errors.length > 0) {
          const firstError = error.errors[0];
          if (firstError && firstError.message) {
            const fieldName = firstError.path && Array.isArray(firstError.path) && firstError.path.length > 0 
              ? firstError.path[0] 
              : 'Alan';
            toast.error(`${fieldName}: ${firstError.message}`);
          }
        }
      } else if (error instanceof Error) {
        // API veya diğer hatalar için genel hata mesajı göster
        // error.message'ı temizle (JSON string olabilir)
        let errorMsg = error.message || 'Giriş başarısız oldu';
        // Eğer JSON gibi görünüyorsa, temizle
        if (errorMsg.trim().startsWith('{') || errorMsg.trim().startsWith('[')) {
          try {
            const parsed = JSON.parse(errorMsg);
            if (parsed.message) errorMsg = parsed.message;
            else if (Array.isArray(parsed) && parsed.length > 0 && parsed[0].message) {
              errorMsg = parsed[0].message;
            } else {
              errorMsg = 'Giriş başarısız oldu';
            }
          } catch {
            errorMsg = 'Giriş başarısız oldu';
          }
        }
        toast.error(errorMsg);
      } else {
        toast.error('Beklenmeyen bir hata oluştu');
      }
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
                style={[
                  styles.input,
                  errors.email && typeof errors.email === 'string' && errors.email.trim() !== '' && touched.email ? styles.inputError : null,
                ].filter(Boolean)}
                placeholder="ornek@email.com"
                placeholderTextColor={colors.textSecondary}
                value={email}
                onChangeText={handleEmailChange}
                onBlur={() => handleBlur('email')}
                keyboardType="email-address"
                autoCapitalize="none"
                editable={!loading}
              />
              <View style={styles.inputIcon}>
                <Icon name="mail" style={styles.icon} />
              </View>
            </View>
            {touched.email && errors.email && typeof errors.email === 'string' && errors.email.trim() !== '' ? (
              <Text style={styles.errorText}>{errors.email}</Text>
            ) : null}
          </View>

          {/* Password Input */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Şifre</Text>
            <View style={styles.inputWrapper}>
              <TextInput
                style={[
                  styles.input,
                  errors.password && typeof errors.password === 'string' && errors.password.trim() !== '' && touched.password ? styles.inputError : null,
                ].filter(Boolean)}
                placeholder="Şifreniz"
                placeholderTextColor={colors.textSecondary}
                value={password}
                onChangeText={handlePasswordChange}
                onBlur={() => handleBlur('password')}
                secureTextEntry={!showPassword}
                editable={!loading}
              />
              <Pressable
                style={styles.visibilityButton}
                onPress={() => setShowPassword(!showPassword)}
                disabled={loading}>
                <Icon
                  name={showPassword ? 'visibility' : 'visibility_off'}
                  style={styles.icon}
                />
              </Pressable>
            </View>
            {touched.password && errors.password && typeof errors.password === 'string' && errors.password.trim() !== '' ? (
              <Text style={styles.errorText}>{errors.password}</Text>
            ) : null}
          </View>

          {/* Forgot Password */}
          <View style={styles.forgotPassword}>
            <Pressable>
              <Text style={styles.forgotPasswordText}>Şifremi Unuttum?</Text>
            </Pressable>
          </View>

          {/* Login Button */}
          <Pressable
            style={[
              styles.loginButton,
              loading ? styles.loginButtonDisabled : null,
            ].filter(Boolean)}
            onPress={handleLogin}
            disabled={loading}>
            {loading ? (
              <ButtonLoading />
            ) : (
              <>
                <Text style={styles.loginButtonText}>Giriş Yap</Text>
                <View style={styles.buttonIconContainer}>
                  <Icon name="arrow_forward" style={styles.buttonIcon} />
                </View>
              </>
            )}
          </Pressable>
        </View>

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
  },
  inputGroup: {
    marginBottom: spacing.lg,
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
  buttonIconContainer: {
    marginLeft: spacing.sm,
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
  inputError: {
    borderColor: colors.danger,
  },
  errorText: {
    ...typography.caption,
    color: colors.danger,
    marginTop: spacing.xs,
    paddingLeft: spacing.xs,
  },
});

export default LoginScreen;
