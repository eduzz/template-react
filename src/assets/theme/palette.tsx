const primary = {
  light: '#3e566f',
  main: '#122d44',
  dark: '#00011d',
  contrastText: '#fff',
};

const secondary = {
  light: '#4ec485',
  main: '#27921a',
  dark: '#00642e',
  contrastText: '#fff',
};

const background = {
  default: '#f3f3f3',
  white: '#fff',
};

const text = {
  primary: '#596375',
};

export const palette = {
  primary,
  secondary,
  background,
  text,
};

export const reversePalette = {
  primary: secondary,
  secondary: primary,
  background,
  text,
};