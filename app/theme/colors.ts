export type ColorVariants = {
  default: string;
  pressed: string;
  disabled: string;
  ultraLight: string;
};

export const generateColorVariants = (hex: string): ColorVariants => {
  const r = parseInt(hex.slice(1, 3), 16) / 255;
  const g = parseInt(hex.slice(3, 5), 16) / 255;
  const b = parseInt(hex.slice(5, 7), 16) / 255;

  const pressed = (c: number) => Math.max(0, c * 0.8);
  const disabled = (c: number) => Math.min(1, c + 0.6 * (1 - c));
  const ultraLight = (c: number) => Math.min(1, c + 0.9 * (1 - c));

  return {
    default: hex,
    pressed: `rgb(${Math.round(pressed(r) * 255)}, ${Math.round(
      pressed(g) * 255,
    )}, ${Math.round(pressed(b) * 255)})`,
    disabled: `rgb(${Math.round(disabled(r) * 255)}, ${Math.round(
      disabled(g) * 255,
    )}, ${Math.round(disabled(b) * 255)})`,
    ultraLight: `rgb(${Math.round(ultraLight(r) * 255)}, ${Math.round(
      ultraLight(g) * 255,
    )}, ${Math.round(ultraLight(b) * 255)})`,
  };
};

export const PRIMARY_COLOR = '#8356D2';
export const PRIMARY = generateColorVariants(PRIMARY_COLOR);

export const SECONDARY_COLOR = '#E6E6E6';
export const SECONDARY = generateColorVariants(SECONDARY_COLOR);

export const TEXT = {
  default: '#303030',
  onPrimary: '#FFFFFF',
  onPressed: '#FFFFFF',
  onDisabled: PRIMARY.pressed,
};

export const BORDER_RADIUS = {
  default: 20,
};
