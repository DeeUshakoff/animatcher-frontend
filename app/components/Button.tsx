import React from 'react';
import { Pressable, Text, StyleSheet, ViewStyle, TextStyle } from 'react-native';

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
  const state = inactive ? 'inactive' : 'active';
  const style = styles[variant][state];

  return (
    <Pressable
      onPress={onPress}
      inactive={inactive}
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
      button: { backgroundColor: 'rgba(131, 86, 210, 1)' },
      text: { color: 'white' },
    },
    inactive: {
      button: { backgroundColor: 'rgba(205, 187, 237, 1)' },
      text: { color: 'rgba(105, 69, 168, 1)' },
    },
  } as ButtonStyleSet,
  grey: {
    active: {
      button: { backgroundColor: 'rgba(230, 230, 230, 1)' },
      text: { color: 'black' },
    },
    inactive: {
      button: { backgroundColor: 'rgba(245, 245, 245, 1)' },
      text: { color: 'rgba(172, 172, 172, 1)' },
    },
  } as ButtonStyleSet,
});

export default Button;