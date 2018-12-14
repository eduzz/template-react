const primary = {
  light: '#3e566f',
  main: '#122d44',
  dark: '#00011d',
  contrastText: '#fff',
};

const secondary = {
  light: '#4ec485',
  main: '#009358',
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

export const whitePalette = {
  primary: {
    light: '#ffffff',
    main: '#ffffff',
    dark: '#cccccc',
    contrastText: '##596375'
  },
  secondary: {
    light: '#4ec485',
    main: '#009358',
    dark: '#00642e',
    contrastText: '#fff',
  },
  background,
  text,
};