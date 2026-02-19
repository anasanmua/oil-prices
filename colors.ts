export const COLORS = {
  white: "#FFFFFF",
  red: "#FF0000",
  blue: "#0000FF",
  green: "#00FF00",
  black: "#000000",
  gray: "#808080",
  yellow: "#FFFF00",
  orange: "#FFA500",
  purple: "#800080",
  pink: "#FFC0CB",
  // Pastel colors
  pastelRed: "#FFB3BA",
  pastelPink: "#FFCCCB",
  pastelOrange: "#FFDFBA",
  pastelYellow: "#FFFFBA",
  pastelGreen: "#BAFFC9",
  pastelTeal: "#BAE1FF",
  pastelBlue: "#BAC7FF",
  pastelPurple: "#E0BBE4",
  pastelLavender: "#D4A5D4",
  pastelPeach: "#FFDAB9",
} as const;

export type ColorKey = keyof typeof COLORS;
