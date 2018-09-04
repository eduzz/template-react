import createMuiTheme from '@material-ui/core/styles/createMuiTheme';

import overrides from './overrides';
import variables, { primary, secondary } from './variables';

export const theme = createMuiTheme({
  palette: { primary, secondary },
  variables,
  overrides
});

export const reverseTheme = createMuiTheme({
  palette: { primary: secondary, secondary: primary },
  variables,
  overrides
});

export const whiteTheme = createMuiTheme({
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
    }
  },
  variables,
  overrides
});