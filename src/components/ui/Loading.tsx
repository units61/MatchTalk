import React from 'react';
import {ActivityIndicator, View, StyleSheet} from 'react-native';
import {colors} from '../../theme/colors';

export const Loading: React.FC = () => (
  <View style={styles.container}>
    <ActivityIndicator color={colors.primary} />
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default Loading;




