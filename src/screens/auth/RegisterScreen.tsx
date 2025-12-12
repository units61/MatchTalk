import React, {useState} from 'react';
import {View, Text, StyleSheet, TextInput, Pressable, Platform, ScrollView, Alert} from 'react-native';
import Icon from '../../components/common/Icon';
import {colors} from '../../theme/colors';
import {spacing} from '../../theme/spacing';
import {typography} from '../../theme/typography';
import {radius} from '../../theme/radius';
import {useAuthStore} from '../../stores/authStore';

interface Props {
  onSwitch: () => void;
  onRegisterSuccess?: () => void;
}

const RegisterScreen: React.FC<Props> = ({onSwitch, onRegisterSuccess}) => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [gender, setGender] = useState<'male' | 'female' | null>(null);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const {register, loading, error} = useAuthStore();

  const handleRegister = async () => {
    // Validation
    if (!username.trim()) {
      Alert.alert('Hata', 'Lütfen kullanıcı adı giriniz');
      return;
    }
    if (!email.trim()) {
      Alert.alert('Hata', 'Lütfen e-posta giriniz');
      return;
    }
    if (!password.trim()) {
      Alert.alert('Hata', 'Lütfen şifre giriniz');
      return;
    }
    if (password !== confirmPassword) {
      Alert.alert('Hata', 'Şifreler eşleşmiyor');
      return;
    }
    if (!gender) {
      Alert.alert('Hata', 'Lütfen cinsiyet seçiniz');
      return;
    }

    try {
      await register({
        email: email.trim(),
        name: username.trim(),
        password,
        gender,
      });
      onRegisterSuccess?.();
    } catch (err) {
      Alert.alert('Kayıt Başarısız', error || 'Bir hata oluştu');
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
              style={styles.input}
              placeholder="Kullanıcı adınızı girin"
              placeholderTextColor={colors.textSecondary}
              value={username}
              onChangeText={setUsername}
            />
          </View>
        </View>

        {/* Email Input */}
        <View style={styles.inputGroup}>
          <Text style={styles.label}>E-posta</Text>
          <View style={styles.inputWrapper}>
            <View style={styles.inputIconLeft}>
              <Icon name="mail" style={styles.icon} />
            </View>
            <TextInput
              style={styles.input}
              placeholder="ornek@email.com"
              placeholderTextColor={colors.textSecondary}
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
            />
          </View>
        </View>

        {/* Password Input */}
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Şifre</Text>
          <View style={styles.inputWrapper}>
            <View style={styles.inputIconLeft}>
              <Icon name="lock" style={styles.icon} />
            </View>
            <TextInput
              style={styles.input}
              placeholder="********"
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

        {/* Confirm Password Input */}
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Şifre Tekrar</Text>
          <View style={styles.inputWrapper}>
            <View style={styles.inputIconLeft}>
              <Icon name="lock_reset" style={styles.icon} />
            </View>
            <TextInput
              style={styles.input}
              placeholder="********"
              placeholderTextColor={colors.textSecondary}
              value={confirmPassword}
              onChangeText={setConfirmPassword}
              secureTextEntry={!showConfirmPassword}
            />
            <Pressable
              style={styles.visibilityButton}
              onPress={() => setShowConfirmPassword(!showConfirmPassword)}>
              <Icon
                name={showConfirmPassword ? 'visibility' : 'visibility_off'}
                style={styles.icon}
              />
            </Pressable>
          </View>
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
              onPress={() => setGender('male')}>
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
              onPress={() => setGender('female')}>
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
        </View>

      </ScrollView>

      {/* Footer Actions */}
      <View style={styles.footer}>
        <Pressable
          style={[styles.registerButton, loading && styles.registerButtonDisabled]}
          onPress={handleRegister}
          disabled={loading}>
          <Text style={styles.registerButtonText}>
            {loading ? 'Kayıt yapılıyor...' : 'Kayıt Ol'}
          </Text>
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
    backgroundColor: colors.backgroundLight,
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
    color: colors.textSecondary,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.textPrimary,
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
    backgroundColor: 'rgba(72, 72, 229, 0.2)',
    borderRadius: radius.full,
  },
  inputGroup: {
    gap: spacing.sm,
  },
  label: {
    fontSize: 14,
    fontWeight: '500',
    color: colors.textPrimary,
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
    borderColor: colors.borderDark,
    backgroundColor: '#fff',
    fontSize: 16,
    color: colors.textPrimary,
  },
  visibilityButton: {
    position: 'absolute',
    right: spacing.md,
    padding: spacing.xs,
  },
  icon: {
    fontSize: 20,
    color: colors.textSecondary,
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
    borderColor: colors.borderDark,
    backgroundColor: '#fff',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.sm,
  },
  genderButtonActive: {
    backgroundColor: colors.primaryBlue,
    borderColor: 'transparent',
    shadowColor: colors.primaryBlue,
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 0.2,
    shadowRadius: 8,
  },
  genderIcon: {
    fontSize: 20,
    color: colors.textSecondary,
  },
  genderIconActive: {
    color: '#fff',
  },
  genderText: {
    fontSize: 16,
    fontWeight: '500',
    color: colors.textSecondary,
  },
  genderTextActive: {
    color: '#fff',
  },
  footer: {
    paddingHorizontal: spacing.xl,
    paddingVertical: spacing.lg,
    borderTopWidth: 1,
    borderTopColor: colors.borderDark,
    gap: spacing.md,
  },
  registerButton: {
    width: '100%',
    height: 56,
    backgroundColor: colors.primaryBlue,
    borderRadius: radius.full,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: colors.primaryBlue,
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
    color: '#fff',
  },
  loginLink: {
    alignItems: 'center',
  },
  loginLinkText: {
    fontSize: 14,
    fontWeight: '500',
    color: colors.textSecondary,
  },
});

export default RegisterScreen;
