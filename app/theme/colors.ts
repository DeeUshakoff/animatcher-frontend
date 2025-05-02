const PURPLE_COLOR = '#8356D2';
const GRAY_COLOR = '#E6E6E6';
const DARK_GRAY_COLOR = '#303030';

export type ColorVariant = {
  default: string;
  dark: string;
  light: string;
  ultraLight: string;
};

export const generateColorVariant = (hex: string): ColorVariant => {
  const r = parseInt(hex.slice(1, 3), 16) / 255;
  const g = parseInt(hex.slice(3, 5), 16) / 255;
  const b = parseInt(hex.slice(5, 7), 16) / 255;

  const dark = (c: number) => Math.max(0, c * 0.8);
  const light = (c: number) => Math.min(1, c + 0.6 * (1 - c));
  const ultraLight = (c: number) => Math.min(1, c + 0.9 * (1 - c));

  return {
    default: hex,
    dark: `rgb(${Math.round(dark(r) * 255)}, ${Math.round(
      dark(g) * 255,
    )}, ${Math.round(dark(b) * 255)})`,
    light: `rgb(${Math.round(light(r) * 255)}, ${Math.round(
      light(g) * 255,
    )}, ${Math.round(light(b) * 255)})`,
    ultraLight: `rgb(${Math.round(ultraLight(r) * 255)}, ${Math.round(
      ultraLight(g) * 255,
    )}, ${Math.round(ultraLight(b) * 255)})`,
  };
};

export const ApplicationBorderRadius = {
  default: 20,
  child: 15,
};

export const ColorVariants = {
  purple: generateColorVariant(PURPLE_COLOR),
  gray: generateColorVariant(GRAY_COLOR),
  darkGray: generateColorVariant(DARK_GRAY_COLOR),
};
