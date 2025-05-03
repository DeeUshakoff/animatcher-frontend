import React, { useState } from 'react';
import { Pressable, Text, StyleSheet, ViewStyle, TextStyle } from 'react-native';
import {ColorVariants} from '@theme/colors';

type ButtonVariant = 'purple' | 'grey';

interface ButtonProps {
  variant?: ButtonVariant;
  inactive?: boolean;
  onPress?: () => void;
  children: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({
  variant = 'purple',
  inactive = false,
  onPress,
  children,
}) => {
  const [isPressed, setIsPressed] = useState(false);

  const handlePressIn = () => {
    setIsPressed(true);
  };

  const handlePressOut = () => {
    setIsPressed(false);
  };

  const handlePress = () => {
    if (!inactive && onPress) {
      onPress();
    }
  };

  const state = inactive ? 'inactive' : isPressed ? 'pressed' : 'active';
  const style = styles[variant][state];

  return (
    <Pressable
      onPress={handlePress}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      disabled={inactive}
      style={[styles.base.button, style.button]}
    >
      <Text style={[styles.base.text, style.text]}>{children}</Text>
    </Pressable>
  );
};

type ButtonStyleSet = {
  active: {
    button: ViewStyle;
    text: TextStyle;
  };
  inactive: {
    button: ViewStyle;
    text: TextStyle;
  };
  pressed: {
    button: ViewStyle;
    text: TextStyle;
  };
};

const styles = StyleSheet.create({
  base: {
    button: {
      width: '100%',
      borderRadius: 25,
      justifyContent: 'center',
      alignItems: 'center',
      paddingVertical: 20,
    },
    text: {
      fontFamily: 'Inter',
      fontWeight: '400',
      fontSize: 20,
      lineHeight: 20,
      letterSpacing: 0,
      textAlign: 'center',
    },
  },
  purple: {
    active: {
      button: { backgroundColor: ColorVariants.purple.default },
      text: { color: 'white' },
    },
    inactive: {
      button: { backgroundColor: ColorVariants.purple.ultraLight },
      text: { color: ColorVariants.purple.dark },
    },
    pressed: {
      button: { backgroundColor: ColorVariants.purple.dark },
      text: { color: 'white' },
    },
  } as ButtonStyleSet,
  grey: {
    active: {
      button: { backgroundColor: ColorVariants.gray.default },
      text: { color: 'black' },
    },
    inactive: {
      button: { backgroundColor: ColorVariants.gray.ultraLight },
      text: { color: ColorVariants.darkGray.default },
    },
    pressed: {
      button: { backgroundColor: ColorVariants.gray.dark },
      text: { color: 'black' },
    },
  } as ButtonStyleSet,
});

export default Button;