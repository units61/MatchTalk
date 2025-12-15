import React, {useState} from 'react';
import {View, Text, StyleSheet, Pressable, TextInput, ScrollView, Alert} from 'react-native';
import {useNavigate} from 'react-router-dom';
import Icon from '../../components/common/Icon';
import {colors} from '../../theme/colors';
import {spacing} from '../../theme/spacing';
import {typography} from '../../theme/typography';
import {radius} from '../../theme/radius';
import {useAuthStore} from '../../stores/authStore';

const ChangePasswordScreen: React.FC = () => {
  const navigate = useNavigate();
  const {changePassword, loading} = useAuthStore();
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSave = async () => {
    if (newPassword !== confirmPassword) {
      Alert.alert('Hata', 'Yeni şifreler eşleşmiyor');
      return;
    }
    try {
      await changePassword({oldPassword, newPassword});
      Alert.alert('Başarılı', 'Şifre güncellendi');
      navigate(-1);
    } catch (error) {
      const msg = error instanceof Error ? error.message : 'Şifre güncellenemedi';
      Alert.alert('Hata', msg);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Pressable style={styles.backButton} onPress={() => navigate(-1)} accessibilityRole="button" accessibilityLabel="Geri dön">
          <Icon name="arrow_back_ios_new" style={styles.backIcon} />
        </Pressable>
        <Text style={styles.headerTitle}>Şifre Değiştir</Text>
        <View style={styles.headerSpacer} />
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Mevcut Şifre</Text>
          <TextInput
            style={styles.input}
            placeholder="Mevcut şifreniz"
            secureTextEntry
            placeholderTextColor={colors.textSecondary}
            value={oldPassword}
            onChangeText={setOldPassword}
          />
        </View>
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Yeni Şifre</Text>
          <TextInput
            style={styles.input}
            placeholder="Yeni şifre"
            secureTextEntry
            placeholderTextColor={colors.textSecondary}
            value={newPassword}
            onChangeText={setNewPassword}
          />
        </View>
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Yeni Şifre (tekrar)</Text>
          <TextInput
            style={styles.input}
            placeholder="Yeni şifreyi tekrar girin"
            secureTextEntry
            placeholderTextColor={colors.textSecondary}
            value={confirmPassword}
            onChangeText={setConfirmPassword}
          />
        </View>

        <Pressable
          style={[styles.saveButton, loading && styles.saveButtonDisabled]}
          accessibilityRole="button"
          accessibilityLabel="Kaydet"
          onPress={handleSave}
          disabled={loading}>
          <Text style={styles.saveButtonText}>{loading ? 'Kaydediliyor...' : 'Kaydet'}</Text>
        </Pressable>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.backgroundLightMain,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.xl,
    paddingVertical: spacing.lg,
    borderBottomWidth: 1,
    borderBottomColor: '#e2e8f0',
  },
  backButton: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: radius.full,
  },
  backIcon: {
    fontSize: 22,
    color: colors.textPrimary,
  },
  headerTitle: {
    ...typography.heading,
    fontSize: 20,
    color: colors.textPrimary,
    flex: 1,
    textAlign: 'center',
  },
  headerSpacer: {width: 40},
  content: {
    padding: spacing.xl,
    gap: spacing.lg,
  },
  inputGroup: {
    gap: spacing.xs,
  },
  label: {
    ...typography.bodyBold,
    color: colors.textPrimary,
  },
  input: {
    borderWidth: 1,
    borderColor: '#e2e8f0',
    borderRadius: radius.md,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    backgroundColor: '#fff',
    color: colors.textPrimary,
  },
  saveButton: {
    backgroundColor: colors.primary,
    borderRadius: radius.full,
    paddingVertical: spacing.md,
    alignItems: 'center',
  },
  saveButtonDisabled: {
    opacity: 0.7,
  },
  saveButtonText: {
    ...typography.bodyBold,
    color: '#fff',
  },
});

export default ChangePasswordScreen;