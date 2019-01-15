import createMuiTheme from '@material-ui/core/styles/createMuiTheme';

import overrides from './overrides';
import props from './props';
import variables from './variables';

const primary = {
  light: '#3a5885',
  main: '#002f58',
  dark: '#00042f',
  contrastText: '#fff',
};

const secondary = {
  light: '#ffff53',
  main: '#ffcc09',
  dark: '#c79c00',
  contrastText: '#fff',
};

export const theme = createMuiTheme({
  palette: { primary, secondary },
  typography: { useNextVariants: true },
  overrides,
  variables,
  props
});

export const reverseTheme = createMuiTheme({
  palette: { primary: secondary, secondary: primary },
  typography: { useNextVariants: true },
  overrides,
  variables,
  props
});