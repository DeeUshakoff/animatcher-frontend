import {TextStyle} from 'react-native';

type FontStyleSet = {
  small: TextStyle;
  default: TextStyle;
  medium: TextStyle;
  large: TextStyle;
};

const FONT_FAMILY = 'Inter';

const defaultFontStyles: FontStyleSet = {
  small: {
    fontFamily: FONT_FAMILY,
    fontWeight: 'regular',
    fontSize: 12,
  },
  default: {
    fontFamily: FONT_FAMILY,
    fontWeight: 'regular',
    fontSize: 20,
  },
  medium: {
    fontFamily: FONT_FAMILY,
    fontWeight: 'regular',
    fontSize: 22,
  },
  large: {
    fontFamily: FONT_FAMILY,
    fontWeight: 'regular',
    fontSize: 24,
  },
};

const headlineFontStyles: FontStyleSet = {
  small: {
    fontFamily: FONT_FAMILY,
    fontWeight: 'bold',
    fontSize: 12,
  },
  default: {
    fontFamily: FONT_FAMILY,
    fontWeight: 'regular',
    fontSize: 20,
  },
  medium: {
    fontFamily: FONT_FAMILY,
    fontWeight: 'bold',
    fontSize: 22,
  },
  large: {
    fontFamily: FONT_FAMILY,
    fontWeight: 'bold',
    fontSize: 24,
  },
};

export const TextStyles = {
  default: defaultFontStyles,
  headline: headlineFontStyles,
};
