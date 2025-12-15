import React, {useEffect, useRef} from 'react';
import {View, StyleSheet, Animated, ViewStyle} from 'react-native';
import {colors} from '../../theme/colors';
import {radius} from '../../theme/radius';

interface SkeletonProps {
  width?: number | string;
  height?: number | string;
  borderRadius?: number;
  style?: ViewStyle;
}

const Skeleton: React.FC<SkeletonProps> = ({
  width = '100%',
  height = 20,
  borderRadius = radius.md,
  style,
}) => {
  const animatedValue = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const animation = Animated.loop(
      Animated.sequence([
        Animated.timing(animatedValue, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
        }),
        Animated.timing(animatedValue, {
          toValue: 0,
          duration: 1000,
          useNativeDriver: true,
        }),
      ]),
    );
    animation.start();
    return () => animation.stop();
  }, [animatedValue]);

  const opacity = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [0.3, 0.7],
  });

  return (
    <Animated.View
      style={[
        styles.skeleton,
        {
          width,
          height,
          borderRadius,
          opacity,
        },
        style,
      ]}
    />
  );
};

export const RoomCardSkeleton: React.FC = () => {
  return (
    <View style={styles.cardContainer}>
      <View style={styles.cardHeader}>
        <View style={styles.cardTitleContainer}>
          <Skeleton width={120} height={20} />
          <Skeleton width={80} height={14} style={styles.marginTop} />
        </View>
        <Skeleton width={60} height={24} borderRadius={radius.full} />
      </View>
      <View style={styles.avatarsContainer}>
        <Skeleton width={40} height={40} borderRadius={radius.full} />
        <Skeleton width={40} height={40} borderRadius={radius.full} />
        <Skeleton width={40} height={40} borderRadius={radius.full} />
        <Skeleton width={40} height={40} borderRadius={radius.full} />
      </View>
      <View style={styles.cardFooter}>
        <Skeleton width={60} height={16} />
        <Skeleton width={96} height={8} borderRadius={radius.full} />
        <Skeleton width={60} height={32} borderRadius={radius.full} />
      </View>
    </View>
  );
};

export const AvatarSkeleton: React.FC<{size?: number}> = ({size = 40}) => {
  return <Skeleton width={size} height={size} borderRadius={radius.full} />;
};

const styles = StyleSheet.create({
  skeleton: {
    backgroundColor: colors.cardDark,
  },
  cardContainer: {
    backgroundColor: '#fff',
    borderRadius: radius.xl,
    padding: 20,
    marginBottom: 16,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  cardTitleContainer: {
    flex: 1,
  },
  marginTop: {
    marginTop: 8,
  },
  avatarsContainer: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 20,
  },
  cardFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: '#f1f5f9',
  },
});

export default Skeleton;











