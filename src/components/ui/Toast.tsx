import React from 'react';
import {View, Text, StyleSheet, ViewStyle, Platform} from 'react-native';
import {colors} from '../../theme/colors';
import {spacing} from '../../theme/spacing';
import {radius} from '../../theme/radius';
import {typography} from '../../theme/typography';
import Icon from '../common/Icon';

interface Props {
  message: string;
  type?: 'info' | 'success' | 'error' | 'warning';
  style?: ViewStyle;
}

export const Toast: React.FC<Props> = ({message, type = 'info', style}) => {
  // Renk ve ikon ayarları
  const getToastConfig = () => {
    switch (type) {
      case 'success':
        return {
          bg: '#10b981',
          bgLight: 'rgba(16, 185, 129, 0.1)',
          textColor: '#ffffff',
          icon: 'check_circle',
          iconColor: '#ffffff',
        };
      case 'error':
        return {
          bg: '#ef4444',
          bgLight: 'rgba(239, 68, 68, 0.1)',
          textColor: '#ffffff',
          icon: 'error',
          iconColor: '#ffffff',
        };
      case 'warning':
        return {
          bg: '#f59e0b',
          bgLight: 'rgba(245, 158, 11, 0.1)',
          textColor: '#ffffff',
          icon: 'warning',
          iconColor: '#ffffff',
        };
      default:
        return {
          bg: colors.primaryIndigo,
          bgLight: 'rgba(100, 103, 242, 0.1)',
          textColor: '#ffffff',
          icon: 'info',
          iconColor: '#ffffff',
        };
    }
  };

  const config = getToastConfig();

  // JSON string'leri temizle ve kullanıcı dostu mesajlara çevir
  const cleanMessage = (msg: string): string => {
    if (!msg || typeof msg !== 'string') {
      return 'Bir hata oluştu';
    }

    const trimmed = msg.trim();
    
    // Eğer mesaj JSON gibi görünüyorsa, parse etmeyi dene
    if (trimmed.startsWith('{') || trimmed.startsWith('[')) {
      try {
        const parsed = JSON.parse(trimmed);
        
        // Eğer direkt message property'si varsa
        if (parsed.message && typeof parsed.message === 'string') {
          return parsed.message;
        }
        
        // Eğer error property'si varsa
        if (parsed.error && typeof parsed.error === 'string') {
          return parsed.error;
        }
        
        // Eğer errors array'i varsa
        if (Array.isArray(parsed.errors) && parsed.errors.length > 0) {
          const firstError = parsed.errors[0];
          if (typeof firstError === 'string') {
            return firstError;
          }
          if (firstError && firstError.message) {
            return firstError.message;
          }
        }
        
        // Eğer direkt array ise (ZodError formatı gibi)
        if (Array.isArray(parsed) && parsed.length > 0) {
          const firstItem = parsed[0];
          // ZodError formatı: { origin, code, path, message }
          if (firstItem && typeof firstItem === 'object') {
            if (firstItem.message && typeof firstItem.message === 'string') {
              return firstItem.message;
            }
            // Eğer path varsa, daha açıklayıcı bir mesaj oluştur
            if (firstItem.path && Array.isArray(firstItem.path) && firstItem.path.length > 0) {
              const fieldName = firstItem.path[0];
              if (firstItem.message) {
                return `${fieldName}: ${firstItem.message}`;
              }
            }
          }
        }
        
        // Eğer object ise ve içinde anlamlı bir mesaj yoksa
        if (typeof parsed === 'object' && parsed !== null) {
          // Tüm string property'leri kontrol et
          for (const key of ['message', 'error', 'msg', 'description']) {
            if (parsed[key] && typeof parsed[key] === 'string') {
              return parsed[key];
            }
          }
        }
      } catch {
        // JSON parse edilemezse, mesajın başında JSON varsa kaldır
        // Örneğin: "[ { "origin": "string"... ]" gibi durumlar için
        if (trimmed.length > 100) {
          // Çok uzun JSON string'ler için genel mesaj
          return 'Bir hata oluştu. Lütfen tekrar deneyin.';
        }
      }
    }
    
    // Eğer mesaj çok uzunsa ve JSON gibi görünüyorsa
    if (msg.length > 200 && (msg.includes('"origin"') || msg.includes('"code"') || msg.includes('"path"'))) {
      return 'Girdiğiniz bilgileri kontrol edin.';
    }
    
    // Normal mesaj ise olduğu gibi döndür
    return msg;
  };

  const displayMessage = cleanMessage(message);

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: config.bg,
          ...Platform.select({
            web: {
              boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
            },
            default: {
              shadowColor: config.bg,
              shadowOffset: {width: 0, height: 4},
              shadowOpacity: 0.3,
              shadowRadius: 8,
              elevation: 8,
            },
          }),
        },
        style,
      ]}>
      <View style={styles.iconContainer}>
        <Icon name={config.icon} style={[styles.icon, {color: config.iconColor}]} />
      </View>
      <Text style={[styles.text, {color: config.textColor}]} numberOfLines={0}>
        {displayMessage}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.lg,
    borderRadius: radius.lg,
    minHeight: 56,
    maxWidth: '100%',
  },
  iconContainer: {
    marginRight: spacing.sm,
    width: 24,
    height: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: {
    fontSize: 24,
  },
  text: {
    ...typography.body,
    flex: 1,
    fontSize: 15,
    fontWeight: '500',
    lineHeight: 20,
    flexWrap: 'wrap', // Allow text to wrap
  },
});

export default Toast;
















