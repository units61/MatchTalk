import React from 'react';
import {View, StyleSheet} from 'react-native';
import {BrowserRouter} from 'react-router-dom';
import AppRouter from './src/router/AppRouter';
import ErrorBoundary from './src/components/common/ErrorBoundary';
import ToastContainer from './src/components/ui/ToastContainer';
import {colors} from './src/theme/colors';

const App: React.FC = () => {
  return (
    <ErrorBoundary>
      <BrowserRouter>
        <View style={styles.container}>
          <AppRouter />
          <ToastContainer />
        </View>
      </BrowserRouter>
    </ErrorBoundary>
  );
};

const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: colors.backgroundDark},
});

export default App;
