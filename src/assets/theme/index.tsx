import createMuiTheme from '@material-ui/core/styles/createMuiTheme';

import overrides from './overrides';
import variables from './variables';

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

export const theme = createMuiTheme({
  typography: { useNextVariants: true },
  palette: { primary, secondary, background, text },
  variables,
  overrides
});

export const reverseTheme = createMuiTheme({
  typography: { useNextVariants: true },
  palette: { primary: secondary, secondary: primary, background, text },
  variables,
  overrides
});

export const whiteTheme = createMuiTheme({
  typography: { useNextVariants: true },
  palette: {
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
  },
  variables,
  overrides
});