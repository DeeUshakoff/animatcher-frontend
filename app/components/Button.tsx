import React, {useState} from 'react';
import {Pressable, Text, StyleSheet, ViewStyle, TextStyle} from 'react-native';
import {ColorVariants, ApplicationBorderRadius} from '@theme/colors';

type ButtonVariant = 'purple' | 'grey';

interface ButtonProps {
  variant?: ButtonVariant;
  inactive?: boolean;
  light?: boolean;
  onPress?: () => void;
  children: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({
  variant = 'purple',
  inactive = false,
  light = false,
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

  // Новая логика определения состояния
  const getButtonState = () => {
    if (inactive) {
      return 'inactive';
    }
    if (isPressed) {
      return 'pressed';
    }
    if (light) {
      return 'light';
    }
    return 'active';
  };

  const state = getButtonState();
  const style = styles[variant][state];

  return (
    <Pressable
      onPress={handlePress}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      disabled={inactive}
      style={[styles.base.button, style.button]}>
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
  light: {
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
      borderRadius: ApplicationBorderRadius.default,
      justifyContent: 'center',
      alignItems: 'center',
      paddingVertical: 13,
    },
    text: {
      fontFamily: 'Inter',
      fontWeight: '400',
      fontSize: 20,
      letterSpacing: 0,
      textAlign: 'center',
    },
  },
  purple: {
    active: {
      button: {backgroundColor: ColorVariants.purple.default},
      text: {color: 'white'},
    },
    inactive: {
      button: {backgroundColor: ColorVariants.purple.ultraLight},
      text: {color: ColorVariants.purple.dark},
    },
    light: {
      button: {backgroundColor: ColorVariants.purple.ultraLight},
      text: {color: ColorVariants.purple.default},
    },
    pressed: {
      button: {backgroundColor: ColorVariants.purple.dark},
      text: {color: 'white'},
    },
  } as ButtonStyleSet,
  grey: {
    active: {
      button: {backgroundColor: ColorVariants.gray.default},
      text: {color: ColorVariants.darkGray.default},
    },
    inactive: {
      button: {backgroundColor: ColorVariants.gray.light},
      text: {color: ColorVariants.gray.default},
    },
    light: {
      button: {backgroundColor: ColorVariants.gray.ultraLight},
      text: {color: ColorVariants.darkGray.default},
    },
    pressed: {
      button: {backgroundColor: ColorVariants.gray.dark},
      text: {color: 'black'},
    },
  } as ButtonStyleSet,
});

export default Button;
