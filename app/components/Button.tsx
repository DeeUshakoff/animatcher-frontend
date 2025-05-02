import React, { useState } from 'react';
import { Pressable, Text, StyleSheet } from 'react-native';
import { PURPLE, GREY, TEXT } from '../theme/colors';

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

  const handlePressIn = () => setIsPressed(true);
  const handlePressOut = () => setIsPressed(false);

  const getButtonState = () => {
    if (inactive) return 'inactive';
    return isPressed ? 'pressed' : 'default';
  };

  const state = getButtonState();
  const colors = variant === 'purple' ? PURPLE : GREY;
  const textColors = {
    default: variant === 'purple' ? TEXT.onPrimary : TEXT.default,
    pressed: variant === 'purple' ? TEXT.onPressed : TEXT.default,
    inactive: variant === 'purple' ? TEXT.onDisabled : GREY.pressed,
  };

  return (
    <Pressable
      onPress={onPress}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      disabled={inactive}
      style={({ pressed }) => [
        styles.base.button,
        {
          backgroundColor: inactive 
            ? colors.disabled 
            : pressed 
              ? colors.pressed 
              : colors.default,
        },
      ]}
    >
      <Text style={[
        styles.base.text,
        {
          color: textColors[state],
        },
      ]}>
        {children}
      </Text>
    </Pressable>
  );
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
});

export default Button;