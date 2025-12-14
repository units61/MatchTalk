import React, {Component, ErrorInfo, ReactNode} from 'react';
import {View, Text, StyleSheet, Pressable} from 'react-native';
import Icon from './Icon';
import Button from './Button';
import {colors} from '../../theme/colors';
import {spacing} from '../../theme/spacing';
import {typography} from '../../theme/typography';
import {radius} from '../../theme/radius';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
  onError?: (error: Error, errorInfo: ErrorInfo) => void;
}

interface State {
  hasError: boolean;
  error: Error | null;
  errorInfo: ErrorInfo | null;
}

class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
      errorInfo: null,
    };
  }

  static getDerivedStateFromError(error: Error): State {
    return {
      hasError: true,
      error,
      errorInfo: null,
    };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    // Log error to console
    console.error('ErrorBoundary caught an error:', error, errorInfo);
    
    // Call onError callback if provided
    this.props.onError?.(error, errorInfo);

    // Update state with error info
    this.setState({
      error,
      errorInfo,
    });
  }

  handleReset = () => {
    this.setState({
      hasError: false,
      error: null,
      errorInfo: null,
    });
  };

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <View style={styles.container}>
          <View style={styles.content}>
            <View style={styles.iconContainer}>
              <Icon name="error_outline" style={styles.icon} />
            </View>
            <Text style={styles.title}>Bir Hata Oluştu</Text>
            <Text style={styles.message}>
              {this.state.error?.message || 'Beklenmeyen bir hata oluştu'}
            </Text>
            {(typeof __DEV__ !== 'undefined' ? __DEV__ : process.env.NODE_ENV !== 'production') && this.state.error && (
              <View style={styles.errorDetails}>
                <Text style={styles.errorText}>
                  {this.state.error.toString()}
                </Text>
                {this.state.errorInfo && (
                  <Text style={styles.errorStack}>
                    {this.state.errorInfo.componentStack}
                  </Text>
                )}
              </View>
            )}
            <View style={styles.actions}>
              <Button
                title="Yeniden Dene"
                onPress={this.handleReset}
                variant="primary"
                style={styles.button}
              />
            </View>
          </View>
        </View>
      );
    }

    return this.props.children;
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.backgroundDarkMain,
    alignItems: 'center',
    justifyContent: 'center',
    padding: spacing.xl,
  },
  content: {
    alignItems: 'center',
    maxWidth: 400,
    width: '100%',
  },
  iconContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: `${colors.danger}20`,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.xl,
  },
  icon: {
    fontSize: 40,
    color: colors.danger,
  },
  title: {
    ...typography.heading,
    fontSize: 24,
    color: colors.textPrimaryLight,
    marginBottom: spacing.md,
    textAlign: 'center',
  },
  message: {
    ...typography.body,
    color: colors.textSecondaryMain,
    textAlign: 'center',
    marginBottom: spacing.xl,
  },
  errorDetails: {
    width: '100%',
    backgroundColor: colors.cardDark,
    borderRadius: radius.md,
    padding: spacing.md,
    marginBottom: spacing.xl,
    maxHeight: 200,
  },
  errorText: {
    ...typography.caption,
    color: colors.danger,
    fontFamily: 'monospace',
    fontSize: 12,
  },
  errorStack: {
    ...typography.caption,
    color: colors.textSecondaryMain,
    fontFamily: 'monospace',
    fontSize: 10,
    marginTop: spacing.sm,
  },
  actions: {
    width: '100%',
  },
  button: {
    width: '100%',
  },
});

export default ErrorBoundary;









