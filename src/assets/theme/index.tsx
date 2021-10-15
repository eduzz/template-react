import createTheme from '@material-ui/core/styles/createTheme';

import overrides from './overrides';
import props from './props';
import variables from './variables';

export default createTheme({
  palette: {
    type: 'light',
    primary: {
      light: '#ffff53',
      main: '#ffcc09',
      dark: '#c79c00',
      contrastText: '#fff'
    },
    secondary: {
      light: '#ffff53',
      main: '#ffcc09',
      dark: '#c79c00',
      contrastText: '#fff'
    }
  },
  overrides,
  variables,
  props
});
