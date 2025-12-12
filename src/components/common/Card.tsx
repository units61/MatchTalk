import React from 'react';
import {View, StyleSheet, ViewStyle} from 'react-native';
import {colors} from '../../theme/colors';
import {radius} from '../../theme/radius';

interface Props {
  children: React.ReactNode;
  style?: ViewStyle;
}

export const Card: React.FC<Props> = ({children, style}) => {
  return <View style={[styles.card, style]}>{children}</View>;
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.cardDark,
    borderRadius: radius.md,
    borderWidth: 1,
    borderColor: colors.border,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 8},
    shadowOpacity: 0.1,
    shadowRadius: 16,
    elevation: 4,
  },
});

export default Card;




