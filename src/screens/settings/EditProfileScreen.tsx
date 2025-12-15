import React, {useState} from 'react';
import {View, Text, StyleSheet, Pressable, TextInput, ScrollView, Alert} from 'react-native';
import {useNavigate} from 'react-router-dom';
import Icon from '../../components/common/Icon';
import {colors} from '../../theme/colors';
import {spacing} from '../../theme/spacing';
import {typography} from '../../theme/typography';
import {radius} from '../../theme/radius';
import {useAuthStore} from '../../stores/authStore';

const EditProfileScreen: React.FC = () => {
  const navigate = useNavigate();
  const {user, updateProfile, loading} = useAuthStore();
  const [name, setName] = useState(user?.name || '');

  const handleSave = async () => {
    try {
      await updateProfile({name: name.trim() || undefined});
      Alert.alert('Başarılı', 'Profil güncellendi');
      navigate(-1);
    } catch (error) {
      const msg = error instanceof Error ? error.message : 'Profil güncellenemedi';
      Alert.alert('Hata', msg);
    }
  };
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Pressable style={styles.backButton} onPress={() => navigate(-1)} accessibilityRole="button" accessibilityLabel="Geri dön">
          <Icon name="arrow_back_ios_new" style={styles.backIcon} />
        </Pressable>
        <Text style={styles.headerTitle}>Profil Düzenle</Text>
        <View style={styles.headerSpacer} />
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Ad</Text>
          <TextInput
            style={styles.input}
            placeholder="Adınız"
            placeholderTextColor={colors.textSecondary}
            value={name}
            onChangeText={setName}
          />
        </View>
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Kullanıcı Adı</Text>
          <TextInput style={styles.input} placeholder="Kullanıcı adınız" placeholderTextColor={colors.textSecondary} />
        </View>
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Hakkında</Text>
          <TextInput
            style={[styles.input, styles.textArea]}
            placeholder="Kendinizden bahsedin"
            placeholderTextColor={colors.textSecondary}
            multiline
            numberOfLines={4}
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
    backgroundColor: '#0b0d17',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.xl,
    paddingVertical: spacing.lg,
    borderBottomWidth: 1,
    borderBottomColor: '#1f2937',
    backgroundColor: '#0b0d17',
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
    color: '#e2e8f0',
  },
  headerTitle: {
    ...typography.heading,
    fontSize: 20,
    color: '#e2e8f0',
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
    color: '#e2e8f0',
  },
  input: {
    borderWidth: 1,
    borderColor: '#1f2937',
    borderRadius: radius.md,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    backgroundColor: '#0f172a',
    color: '#e2e8f0',
  },
  textArea: {
    height: 120,
    textAlignVertical: 'top',
  },
  saveButton: {
    backgroundColor: '#6366f1',
    borderRadius: radius.full,
    paddingVertical: spacing.md,
    alignItems: 'center',
    shadowColor: '#6366f1',
    shadowOffset: {width: 0, height: 8},
    shadowOpacity: 0.28,
    shadowRadius: 14,
  },
  saveButtonText: {
    ...typography.bodyBold,
    color: '#0b0d17',
  },
});

export default EditProfileScreen;