import React from 'react';
import {View, StyleSheet} from 'react-native';
import AppNavigator from './src/navigation/AppNavigator';
import {colors} from './src/theme/colors';

const App: React.FC = () => {
  return (
    <View style={styles.container}>
      <AppNavigator />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: colors.backgroundDark},
});

export default App;
