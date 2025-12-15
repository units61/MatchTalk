import React from 'react';
import {View, Text, StyleSheet, Pressable, TextInput, ScrollView} from 'react-native';
import {useNavigate} from 'react-router-dom';
import Icon from '../../components/common/Icon';
import {colors} from '../../theme/colors';
import {spacing} from '../../theme/spacing';
import {typography} from '../../theme/typography';
import {radius} from '../../theme/radius';

const ChangeEmailScreen: React.FC = () => {
  const navigate = useNavigate();

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Pressable style={styles.backButton} onPress={() => navigate(-1)} accessibilityRole="button" accessibilityLabel="Geri dön">
          <Icon name="arrow_back_ios_new" style={styles.backIcon} />
        </Pressable>
        <Text style={styles.headerTitle}>E-posta Değiştir</Text>
        <View style={styles.headerSpacer} />
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Mevcut E-posta</Text>
          <TextInput style={styles.input} placeholder="ornek@mail.com" keyboardType="email-address" placeholderTextColor={colors.textSecondary} />
        </View>
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Yeni E-posta</Text>
          <TextInput style={styles.input} placeholder="yeni@mail.com" keyboardType="email-address" placeholderTextColor={colors.textSecondary} />
        </View>
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Şifre</Text>
          <TextInput style={styles.input} placeholder="Şifreniz" secureTextEntry placeholderTextColor={colors.textSecondary} />
        </View>

        <Pressable style={styles.saveButton} accessibilityRole="button" accessibilityLabel="Kaydet">
          <Text style={styles.saveButtonText}>Kaydet</Text>
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
  saveButtonText: {
    ...typography.bodyBold,
    color: '#fff',
  },
});

export default ChangeEmailScreen;