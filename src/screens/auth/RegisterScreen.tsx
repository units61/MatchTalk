import React, {useState} from 'react';
import {View, Text, StyleSheet, TextInput, Pressable, Platform, ScrollView} from 'react-native';
import Icon from '../../components/common/Icon';
import {colors} from '../../theme/colors';
import {spacing} from '../../theme/spacing';
import {typography} from '../../theme/typography';
import {radius} from '../../theme/radius';
import {useAuthStore} from '../../stores/authStore';
import {registerSchema} from '../../schemas/auth';
import {z} from 'zod';
import {toast} from '../../stores/toastStore';
import {ButtonLoading} from '../../components/ui/Loading';

interface Props {
  onSwitch: () => void;
  onRegisterSuccess?: () => void;
}

const RegisterScreen: React.FC<Props> = ({onSwitch, onRegisterSuccess}) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [gender, setGender] = useState<'male' | 'female' | null>(null);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const {register, loading} = useAuthStore();

  const validateField = (field: keyof typeof registerSchema.shape, value: any) => {
    try {
      const fieldSchema = registerSchema.shape[field];
      if (fieldSchema) {
        fieldSchema.parse(value);
      }
      setErrors((prev) => ({...prev, [field]: ''}));
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

  const handleNameChange = (value: string) => {
    setName(value);
    if (touched.name) {
      validateField('name', value);
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
    // Re-validate confirm password if it's been touched
    if (touched.confirmPassword) {
      validateField('confirmPassword', confirmPassword);
    }
  };

  const handleConfirmPasswordChange = (value: string) => {
    setConfirmPassword(value);
    if (touched.confirmPassword) {
      validateField('confirmPassword', value);
    }
  };

  const handleGenderChange = (value: 'male' | 'female') => {
    setGender(value);
    if (touched.gender) {
      validateField('gender', value);
    }
  };

  const handleBlur = (field: string) => {
    setTouched((prev) => ({...prev, [field]: true}));
    if (field === 'name') {
      validateField('name', name);
    } else if (field === 'email') {
      validateField('email', email);
    } else if (field === 'password') {
      validateField('password', password);
    } else if (field === 'confirmPassword') {
      validateField('confirmPassword', confirmPassword);
    } else if (field === 'gender') {
      validateField('gender', gender);
    }
  };

  const handleRegister = async () => {
    // Mark all fields as touched
    setTouched({
      name: true,
      email: true,
      password: true,
      confirmPassword: true,
      gender: true,
    });

    // Validate entire form
    try {
      const validatedData = registerSchema.parse({
        name: name.trim(),
        email: email.trim(),
        password,
        confirmPassword,
        gender: gender!,
      });
      setErrors({});
      await register({
        email: validatedData.email,
        name: validatedData.name,
        password: validatedData.password,
        gender: validatedData.gender,
      });
      toast.success('Kayıt başarılı!');
      onRegisterSuccess?.();
    } catch (error) {
      if (error instanceof z.ZodError && error.errors && Array.isArray(error.errors)) {
        const fieldErrors: Record<string, string> = {};
        error.errors.forEach((err) => {
          if (err && err.path && Array.isArray(err.path) && err.path.length > 0 && err.path[0] && err.message) {
            fieldErrors[err.path[0] as string] = err.message;
          }
        });
        setErrors(fieldErrors);
      } else if (error instanceof Error) {
        // API veya diğer hatalar için genel hata mesajı göster
        let errorMsg = error.message || 'Kayıt başarısız oldu';
        // Eğer JSON gibi görünüyorsa, temizle
        if (errorMsg.trim().startsWith('{') || errorMsg.trim().startsWith('[')) {
          try {
            const parsed = JSON.parse(errorMsg);
            if (parsed.message) errorMsg = parsed.message;
            else if (Array.isArray(parsed) && parsed.length > 0 && parsed[0].message) {
              errorMsg = parsed[0].message;
            } else {
              errorMsg = 'Kayıt başarısız oldu';
            }
          } catch {
            errorMsg = 'Kayıt başarısız oldu';
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
      {/* Header */}
      <View style={styles.header}>
        <Pressable style={styles.backButton} onPress={onSwitch}>
          <Icon name="arrow_back_ios_new" style={styles.backIcon} />
        </Pressable>
        <Text style={styles.headerTitle}>Hesap Oluştur</Text>
        <View style={styles.headerSpacer} />
      </View>

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}>
        {/* Progress Indicator */}
        <View style={styles.progressContainer}>
          <View style={styles.progressBar} />
        </View>

        {/* Username Input */}
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Kullanıcı Adı</Text>
          <View style={styles.inputWrapper}>
            <View style={styles.inputIconLeft}>
              <Icon name="person" style={styles.icon} />
            </View>
            <TextInput
              style={[
                styles.input,
                errors.name && touched.name && styles.inputError,
              ]}
              placeholder="Kullanıcı adınızı girin"
              placeholderTextColor={colors.textSecondary}
              value={name}
              onChangeText={handleNameChange}
              onBlur={() => handleBlur('name')}
              editable={!loading}
            />
          </View>
          {errors.name && touched.name && (
            <Text style={styles.errorText}>{errors.name}</Text>
          )}
        </View>

        {/* Email Input */}
        <View style={styles.inputGroup}>
          <Text style={styles.label}>E-posta</Text>
          <View style={styles.inputWrapper}>
            <View style={styles.inputIconLeft}>
              <Icon name="mail" style={styles.icon} />
            </View>
            <TextInput
              style={[
                styles.input,
                errors.email && touched.email && styles.inputError,
              ]}
              placeholder="ornek@email.com"
              placeholderTextColor={colors.textSecondary}
              value={email}
              onChangeText={handleEmailChange}
              onBlur={() => handleBlur('email')}
              keyboardType="email-address"
              autoCapitalize="none"
              editable={!loading}
            />
          </View>
          {errors.email && touched.email && (
            <Text style={styles.errorText}>{errors.email}</Text>
          )}
        </View>

        {/* Password Input */}
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Şifre</Text>
          <View style={styles.inputWrapper}>
            <View style={styles.inputIconLeft}>
              <Icon name="lock" style={styles.icon} />
            </View>
            <TextInput
              style={[
                styles.input,
                errors.password && touched.password && styles.inputError,
              ]}
              placeholder="********"
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
          {errors.password && touched.password && (
            <Text style={styles.errorText}>{errors.password}</Text>
          )}
        </View>

        {/* Confirm Password Input */}
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Şifre Tekrar</Text>
          <View style={styles.inputWrapper}>
            <View style={styles.inputIconLeft}>
              <Icon name="lock_reset" style={styles.icon} />
            </View>
            <TextInput
              style={[
                styles.input,
                errors.confirmPassword &&
                  touched.confirmPassword &&
                  styles.inputError,
              ]}
              placeholder="********"
              placeholderTextColor={colors.textSecondary}
              value={confirmPassword}
              onChangeText={handleConfirmPasswordChange}
              onBlur={() => handleBlur('confirmPassword')}
              secureTextEntry={!showConfirmPassword}
              editable={!loading}
            />
            <Pressable
              style={styles.visibilityButton}
              onPress={() => setShowConfirmPassword(!showConfirmPassword)}
              disabled={loading}>
              <Icon
                name={showConfirmPassword ? 'visibility' : 'visibility_off'}
                style={styles.icon}
              />
            </Pressable>
          </View>
          {errors.confirmPassword && touched.confirmPassword && (
            <Text style={styles.errorText}>{errors.confirmPassword}</Text>
          )}
        </View>

        {/* Gender Selection */}
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Cinsiyet</Text>
          <View style={styles.genderContainer}>
            <Pressable
              style={[
                styles.genderButton,
                gender === 'male' && styles.genderButtonActive,
              ]}
              onPress={() => handleGenderChange('male')}
              disabled={loading}>
              <Icon
                name="male"
                style={[
                  styles.genderIcon,
                  gender === 'male' && styles.genderIconActive,
                ]}
              />
              <Text
                style={[
                  styles.genderText,
                  gender === 'male' && styles.genderTextActive,
                ]}>
                Erkek
              </Text>
            </Pressable>
            <Pressable
              style={[
                styles.genderButton,
                gender === 'female' && styles.genderButtonActive,
              ]}
              onPress={() => handleGenderChange('female')}
              disabled={loading}>
              <Icon
                name="female"
                style={[
                  styles.genderIcon,
                  gender === 'female' && styles.genderIconActive,
                ]}
              />
              <Text
                style={[
                  styles.genderText,
                  gender === 'female' && styles.genderTextActive,
                ]}>
                Kadın
              </Text>
            </Pressable>
          </View>
          {errors.gender && touched.gender && (
            <Text style={styles.errorText}>{errors.gender}</Text>
          )}
        </View>

      </ScrollView>

      {/* Footer Actions */}
      <View style={styles.footer}>
        <Pressable
          style={[styles.registerButton, loading && styles.registerButtonDisabled]}
          onPress={handleRegister}
          disabled={loading}>
          {loading ? (
            <ButtonLoading />
          ) : (
            <Text style={styles.registerButtonText}>Kayıt Ol</Text>
          )}
        </Pressable>
        <Pressable onPress={onSwitch} style={styles.loginLink}>
          <Text style={styles.loginLinkText}>
            Zaten hesabın var mı? Giriş yap
          </Text>
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0b0d17',
    ...Platform.select({
      web: {
        minHeight: '100vh',
      },
    }),
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: spacing.xl,
    paddingTop: spacing.xxl + spacing.md,
    paddingBottom: spacing.lg,
    position: 'relative',
    zIndex: 10,
  },
  backButton: {
    position: 'absolute',
    left: spacing.xl,
    top: spacing.xxl + spacing.md,
    padding: spacing.sm,
  },
  backIcon: {
    fontSize: 24,
    color: '#94a3b8',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#e2e8f0',
  },
  headerSpacer: {
    width: 40,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: spacing.xl,
    paddingBottom: spacing.lg,
    gap: spacing.lg,
  },
  progressContainer: {
    alignItems: 'center',
    marginBottom: spacing.sm,
  },
  progressBar: {
    height: 8,
    width: 64,
    backgroundColor: 'rgba(99, 102, 241, 0.25)',
    borderRadius: radius.full,
  },
  inputGroup: {
    gap: spacing.sm,
  },
  label: {
    fontSize: 14,
    fontWeight: '500',
    color: '#e2e8f0',
    marginLeft: spacing.xs,
  },
  inputWrapper: {
    position: 'relative',
    flexDirection: 'row',
    alignItems: 'center',
  },
  inputIconLeft: {
    position: 'absolute',
    left: spacing.md,
    zIndex: 1,
  },
  input: {
    flex: 1,
    height: 56,
    paddingLeft: 48,
    paddingRight: 48,
    paddingVertical: spacing.md + 2,
    borderRadius: radius.xl,
    borderWidth: 1,
    borderColor: '#1f2937',
    backgroundColor: '#0f172a',
    fontSize: 16,
    color: '#e2e8f0',
  },
  visibilityButton: {
    position: 'absolute',
    right: spacing.md,
    padding: spacing.xs,
  },
  icon: {
    fontSize: 20,
    color: '#94a3b8',
  },
  genderContainer: {
    flexDirection: 'row',
    gap: spacing.md,
  },
  genderButton: {
    flex: 1,
    paddingVertical: spacing.md + 2,
    paddingHorizontal: spacing.md,
    borderRadius: radius.xl,
    borderWidth: 1,
    borderColor: '#1f2937',
    backgroundColor: '#0f172a',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.sm,
  },
  genderButtonActive: {
    backgroundColor: '#6366f1',
    borderColor: 'transparent',
    shadowColor: '#6366f1',
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 0.2,
    shadowRadius: 8,
  },
  genderIcon: {
    fontSize: 20,
    color: '#94a3b8',
  },
  genderIconActive: {
    color: '#fff',
  },
  genderText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#94a3b8',
  },
  genderTextActive: {
    color: '#fff',
  },
  footer: {
    paddingHorizontal: spacing.xl,
    paddingVertical: spacing.lg,
    borderTopWidth: 1,
    borderTopColor: '#1f2937',
    gap: spacing.md,
  },
  registerButton: {
    width: '100%',
    height: 56,
    backgroundColor: '#6366f1',
    borderRadius: radius.full,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#6366f1',
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 0.2,
    shadowRadius: 8,
  },
  registerButtonDisabled: {
    opacity: 0.6,
  },
  registerButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#0b0d17',
  },
  loginLink: {
    alignItems: 'center',
  },
  loginLinkText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#94a3b8',
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

export default RegisterScreen;
