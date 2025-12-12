import React from 'react';
import {View, StyleSheet} from 'react-native';
import {colors} from '../../theme/colors';
import {spacing} from '../../theme/spacing';
import {radius} from '../../theme/radius';

interface GenderBarProps {
  malePercentage: number;
  femalePercentage: number;
  width?: number;
}

const GenderBar: React.FC<GenderBarProps> = ({
  malePercentage,
  femalePercentage,
  width = 96,
}) => {
  return (
    <View style={[styles.container, {width}]}>
      <View style={styles.bar}>
        <View
          style={[
            styles.maleBar,
            {
              width: `${malePercentage}%`,
            },
          ]}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    gap: spacing.xs / 2,
  },
  bar: {
    height: 8,
    width: '100%',
    overflow: 'hidden',
    borderRadius: radius.full,
    backgroundColor: colors.female,
    flexDirection: 'row',
  },
  maleBar: {
    height: '100%',
    backgroundColor: colors.male,
  },
});

export default GenderBar;
