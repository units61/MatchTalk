import React, {useState} from 'react';
import {View, Text, StyleSheet, TextInput, Pressable, Modal, ScrollView, Platform} from 'react-native';
import Icon from '../common/Icon';
import {colors} from '../../theme/colors';
import {spacing} from '../../theme/spacing';
import {typography} from '../../theme/typography';
import {radius} from '../../theme/radius';
import {CreateRoomInput} from '../../schemas/room';
import {createRoomSchema} from '../../schemas/room';
import {z} from 'zod';

interface CreateRoomModalProps {
  visible: boolean;
  onClose: () => void;
  onSubmit: (input: CreateRoomInput) => Promise<void>;
  loading?: boolean;
}

const CATEGORIES = [
  {id: 'music', name: 'Müzik', icon: 'graphic_eq'},
  {id: 'general', name: 'Genel', icon: 'grid_view'},
  {id: 'gaming', name: 'Oyun', icon: 'sports_esports'},
  {id: 'sports', name: 'Spor', icon: 'sports_basketball'},
  {id: 'cinema', name: 'Sinema', icon: 'movie'},
] as const;

const MAX_NAME_LENGTH = 30;

const CreateRoomModal: React.FC<CreateRoomModalProps> = ({
  visible,
  onClose,
  onSubmit,
  loading = false,
}) => {
  const [name, setName] = useState('');
  const [category, setCategory] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});

  const validateField = (field: keyof CreateRoomInput, value: any) => {
    try {
      const fieldSchema = createRoomSchema.shape[field];
      if (fieldSchema) {
        fieldSchema.parse(value);
      }
      setErrors((prev) => {
        const newErrors = {...prev};
        delete newErrors[field];
        return newErrors;
      });
    } catch (error) {
      if (error instanceof z.ZodError && error.issues && Array.isArray(error.issues) && error.issues.length > 0) {
        const firstError = error.issues[0];
        setErrors((prev) => ({
          ...prev,
          [field]: (firstError && firstError.message) || 'Geçersiz değer',
        }));
      } else {
        setErrors((prev) => ({
          ...prev,
          [field]: 'Geçersiz değer',
        }));
      }
    }
  };

  const handleNameChange = (value: string) => {
    setName(value);
    if (touched.name) {
      validateField('name', value);
    }
  };

  const handleCategorySelect = (categoryId: string) => {
    setCategory(categoryId);
    if (touched.category) {
      validateField('category', categoryId);
    }
  };

  const handleBlur = (field: keyof CreateRoomInput) => {
    setTouched((prev) => ({...prev, [field]: true}));
    if (field === 'name') {
      validateField('name', name);
    } else if (field === 'category') {
      validateField('category', category);
    }
  };

  const handleSubmit = async () => {
    // Mark all fields as touched
    setTouched({name: true, category: true});

    const input: CreateRoomInput = {
      name: name.trim(),
      category: category.trim(),
      maxParticipants: 8, // Default 8
      durationSec: 300, // Sabit 5 dakika
    };

    try {
      // Validate entire form
      createRoomSchema.parse(input);
      await onSubmit(input);
      // Reset form on success
      setName('');
      setCategory('');
      setErrors({});
      setTouched({});
    } catch (error) {
      if (error instanceof z.ZodError) {
        const newErrors: Record<string, string> = {};
        error.issues.forEach((err) => {
          if (err.path && err.path.length > 0) {
            const field = err.path[0] as string;
            newErrors[field] = err.message;
          }
        });
        setErrors(newErrors);
      } else {
        // Re-throw other errors
        throw error;
      }
    }
  };

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
      statusBarTranslucent>
      <View style={styles.overlay} pointerEvents="box-none">
        <Pressable style={styles.backdrop} onPress={onClose} />
        <View style={styles.modal} pointerEvents="auto">
          {/* Header Section */}
          <View style={styles.headerSection}>
            <Text style={styles.title}>Yeni Oda Oluştur</Text>
            <Text style={styles.subtitle}>Sohbetine özel bir başlık belirle.</Text>
          </View>

          {/* Input Section */}
          <View style={styles.inputSection}>
            <View style={styles.inputWrapper}>
              <TextInput
                style={[
                  styles.input,
                  errors.name && touched.name && styles.inputError,
                ]}
                placeholder="Oda başlığı girin..."
                placeholderTextColor="#64748B"
                value={name}
                onChangeText={handleNameChange}
                onBlur={() => handleBlur('name')}
                editable={!loading}
                maxLength={MAX_NAME_LENGTH}
              />
            </View>
            {/* Character Counter */}
            <View style={styles.counterContainer}>
              <Text style={styles.counterText}>
                {name.length}/{MAX_NAME_LENGTH}
              </Text>
            </View>
          </View>

          {/* Category Section */}
          <View style={styles.categorySection}>
            <Text style={styles.categoryTitle}>Oda Türü Seç</Text>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.categoriesContainer}>
              {CATEGORIES.map((cat) => {
                const isSelected = category === cat.id;
                return (
                  <Pressable
                    key={cat.id}
                    style={({pressed}) => [
                      styles.categoryButton,
                      isSelected && styles.categoryButtonSelected,
                      pressed && styles.categoryButtonPressed,
                    ]}
                    onPress={() => handleCategorySelect(cat.id)}
                    disabled={loading}>
                    <Icon
                      name={cat.icon}
                      style={isSelected ? styles.categoryIconSelected : styles.categoryIcon}
                    />
                    <Text
                      style={[
                        styles.categoryText,
                        isSelected && styles.categoryTextSelected,
                      ]}>
                      {cat.name}
                    </Text>
                  </Pressable>
                );
              })}
            </ScrollView>
            {errors.category && touched.category && (
              <Text style={styles.errorText}>{errors.category}</Text>
            )}
          </View>

          {/* Action Buttons */}
          <View style={styles.actions}>
            <Pressable
              style={({pressed}) => [
                styles.cancelButton,
                pressed && styles.buttonPressed,
              ]}
              onPress={onClose}
              disabled={loading}>
              <Text style={styles.cancelButtonText}>İptal</Text>
            </Pressable>
            <Pressable
              style={({pressed}) => [
                styles.createButton,
                pressed && styles.buttonPressed,
                loading && styles.createButtonDisabled,
              ]}
              onPress={handleSubmit}
              disabled={loading || !name.trim() || !category}>
              <Icon name="add" style={styles.createButtonIcon} />
              <Text style={styles.createButtonText}>Oda Oluştur</Text>
            </Pressable>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const overlayBaseStyle = {
  flex: 1,
  backgroundColor: 'rgba(0, 0, 0, 0.6)', // bg-black/60
  justifyContent: 'center',
  alignItems: 'center',
  padding: 16, // p-4
  zIndex: 9999, // Modal en üstte olmalı
};

const overlayWebStyle = Platform.select({
  web: {
    backdropFilter: 'blur(4px)',
    position: 'fixed' as any,
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  default: {},
});

const styles = StyleSheet.create({
  overlay: {
    ...overlayBaseStyle,
    ...overlayWebStyle,
  } as any,
  backdrop: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  modal: {
    width: '100%',
    maxWidth: 384, // max-w-sm
    backgroundColor: '#1E293B', // bg-modal-bg
    borderRadius: 24, // rounded-[24px]
    padding: 32, // p-8
    gap: 24, // gap-6
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.05)', // border-white/5
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 8},
    shadowOpacity: 0.5,
    shadowRadius: 24,
    elevation: 16,
    zIndex: 10000, // Modal içeriği overlay'in üstünde
  },
  headerSection: {
    alignItems: 'center',
    gap: 4, // gap-1
  },
  title: {
    fontSize: 22, // text-[22px]
    fontWeight: '700', // font-bold
    color: '#fff', // text-white
    textAlign: 'center',
    letterSpacing: -0.33, // tracking-[-0.015em]
    lineHeight: 28, // leading-tight
  },
  subtitle: {
    fontSize: 14, // text-sm
    fontWeight: '400', // font-normal
    color: '#94A3B8', // text-secondary-text
    textAlign: 'center',
    lineHeight: 20, // leading-normal
  },
  inputSection: {
    gap: 8, // gap-2
  },
  inputWrapper: {
    position: 'relative',
  },
  input: {
    width: '100%',
    height: 56, // h-14
    backgroundColor: '#0F172A', // bg-input-bg
    borderWidth: 1,
    borderColor: '#334155',
    borderRadius: 16, // rounded-2xl
    paddingHorizontal: 15, // px-[15px]
    fontSize: 16, // text-base
    color: '#fff', // text-white
    ...Platform.select({
      web: {
        outlineStyle: 'none',
        outlineWidth: 0,
        transition: 'all 0.2s',
        ':focus': {
          borderColor: '#6467f2',
          boxShadow: '0 0 0 2px rgba(100, 103, 242, 0.5)',
        },
      },
    }),
  },
  inputError: {
    borderColor: '#ef4444',
  },
  counterContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    paddingHorizontal: 4, // px-1
  },
  counterText: {
    fontSize: 12, // text-xs
    fontWeight: '500', // font-medium
    color: '#94A3B8', // text-secondary-text
  },
  categorySection: {
    gap: 12, // gap-3
  },
  categoryTitle: {
    fontSize: 16, // text-base
    fontWeight: '600', // font-semibold
    color: '#fff', // text-white
    lineHeight: 24, // leading-tight
  },
  categoriesContainer: {
    flexDirection: 'row',
    gap: 12, // gap-3
    paddingBottom: 8, // pb-2
    paddingHorizontal: 8, // -mx-2 px-2
  },
  categoryButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8, // gap-2
    paddingHorizontal: 16, // px-4
    paddingVertical: 10, // py-2.5
    backgroundColor: '#334155', // bg-[#334155]
    borderRadius: 12, // rounded-xl
    ...Platform.select({
      web: {
        cursor: 'pointer',
        transition: 'background-color 0.2s',
        ':hover': {
          backgroundColor: '#475569', // hover:bg-[#475569]
        },
      },
    }),
  },
  categoryButtonSelected: {
    backgroundColor: '#6467f2', // bg-primary
    shadowColor: '#6467f2',
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 0.25,
    shadowRadius: 8,
    elevation: 4,
  },
  categoryButtonPressed: {
    transform: [{scale: 0.95}], // active:scale-95
  },
  categoryIcon: {
    fontSize: 18, // text-[18px]
    color: '#94A3B8', // text-[#94A3B8]
  },
  categoryIconSelected: {
    color: '#fff', // text-white
  },
  categoryText: {
    fontSize: 14, // text-sm
    fontWeight: '500', // font-medium
    color: '#CBD5E1', // text-[#CBD5E1]
    ...Platform.select({
      web: {
        whiteSpace: 'nowrap',
      },
    }),
  },
  categoryTextSelected: {
    color: '#fff', // text-white
  },
  errorText: {
    fontSize: 12,
    color: '#ef4444',
    marginTop: 4,
  },
  actions: {
    flexDirection: 'row',
    gap: 16, // gap-4
    paddingTop: 8, // pt-2
  },
  cancelButton: {
    flex: 1,
    height: 56, // h-[56px]
    borderRadius: 12, // rounded-xl
    borderWidth: 1,
    borderColor: '#334155', // border-[#334155]
    alignItems: 'center',
    justifyContent: 'center',
    ...Platform.select({
      web: {
        cursor: 'pointer',
        transition: 'background-color 0.2s',
        ':hover': {
          backgroundColor: 'rgba(255, 255, 255, 0.05)', // hover:bg-white/5
        },
      },
    }),
  },
  cancelButtonText: {
    fontSize: 16, // text-base
    fontWeight: '600', // font-semibold
    color: '#fff', // text-white
  },
  createButton: {
    flex: 2, // flex-[2]
    height: 56, // h-[56px]
    backgroundColor: '#6467f2', // bg-primary
    borderRadius: 12, // rounded-xl
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8, // gap-2
    shadowColor: '#6467f2',
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 4,
    ...Platform.select({
      web: {
        cursor: 'pointer',
        transition: 'all 0.2s',
        ':hover': {
          backgroundColor: '#5558e6', // hover:bg-[#5558e6]
        },
      },
    }),
  },
  createButtonDisabled: {
    opacity: 0.5,
  },
  createButtonIcon: {
    fontSize: 20, // text-[20px]
    color: '#fff',
  },
  createButtonText: {
    fontSize: 16, // text-base
    fontWeight: '600', // font-semibold
    color: '#fff', // text-white
  },
  buttonPressed: {
    transform: [{scale: 0.95}], // active:scale-95
  },
});

export default CreateRoomModal;






