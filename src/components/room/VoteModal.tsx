import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {colors} from '../../theme/colors';
import {spacing} from '../../theme/spacing';
import {typography} from '../../theme/typography';
import {radius} from '../../theme/radius';
import Button from '../common/Button';

interface Props {
  visible: boolean;
  onVote: (vote: 'yes' | 'no') => void;
  onClose: () => void;
}

export const VoteModal: React.FC<Props> = ({visible, onVote, onClose}) => {
  if (!visible) {
    return null;
  }
  return (
    <View style={styles.overlay}>
      <View style={styles.modal}>
        <Text style={styles.title}>Süreyi uzatalım mı?</Text>
        <Text style={styles.desc}>10 sn içinde oy ver</Text>
        <View style={styles.actions}>
          <Button
            title="Hayır"
            variant="outline"
            onPress={() => onVote('no')}
            fullWidth
          />
          <Button title="Evet +3 dk" onPress={() => onVote('yes')} fullWidth />
        </View>
        <Button title="Kapat" variant="ghost" onPress={onClose} fullWidth />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: colors.overlay,
    alignItems: 'center',
    justifyContent: 'center',
    padding: spacing.xl,
  },
  modal: {
    width: '100%',
    maxWidth: 400,
    backgroundColor: colors.cardDark,
    borderRadius: radius.lg,
    padding: spacing.xl,
    borderWidth: 1,
    borderColor: colors.border,
  },
  title: {
    ...typography.h2,
    color: colors.textPrimary,
    marginBottom: spacing.sm,
    textAlign: 'center',
  },
  desc: {
    ...typography.body,
    color: colors.textSecondary,
    marginBottom: spacing.lg,
    textAlign: 'center',
  },
  actions: {flexDirection: 'row', gap: spacing.md, marginBottom: spacing.md},
});

export default VoteModal;



