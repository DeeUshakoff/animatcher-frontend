import React, {useMemo} from 'react';
import {TouchableOpacity, Text, StyleSheet} from 'react-native';
import {ColorVariants, ApplicationBorderRadius} from '@theme/colors';
import {TextStyles} from '@theme/fonts';

interface SelectProps {
  selected?: boolean;
  inactive?: boolean;
  onPress?: () => void;
  children: React.ReactNode;
}

export const SelectableItem: React.FC<SelectProps> = ({
  children,
  selected = false,
  inactive = false,
  onPress,
}) => {
  const backgroundColor = useMemo(() => {
    if (inactive) {
      return ColorVariants.gray.light;
    }
    return selected ? ColorVariants.purple.default : ColorVariants.gray.default;
  }, [selected, inactive]);

  const textColor = useMemo(() => {
    if (inactive) {
      return ColorVariants.gray.default;
    }
    return selected ? 'white' : ColorVariants.darkGray.default;
  }, [selected, inactive]);

  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={inactive}
      activeOpacity={0.8}
      style={[
        styles.container,
        {
          backgroundColor: backgroundColor,
        },
      ]}>
      <Text
        style={[
          TextStyles.default.default,
          {
            color: textColor,
          },
        ]}>
        {children}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: 55,
    borderRadius: ApplicationBorderRadius.default,
  },
});
