import createMuiTheme from '@material-ui/core/styles/createMuiTheme';
import { Overrides } from '@material-ui/core/styles/overrides';

const defaultTheme = createMuiTheme();

const overrides: Overrides = {
  MuiButton: {
    root: {
      borderRadius: 30,
      paddingLeft: 20,
      paddingRight: 20
    },
    sizeSmall: {
      paddingLeft: 15,
      paddingRight: 15
    }
  },
  MuiFormLabel: {
    root: {
      transform: 'none !important',
      fontSize: 12,
    },
  },
  MuiInput: {
    root: {
      borderRadius: 4,
      backgroundColor: defaultTheme.palette.common.white,
      border: '1px solid #ced4da',
      fontSize: 14,
      padding: '7px 10px',
      transition: defaultTheme.transitions.create(['border-color', 'box-shadow']),
      '&:focus': {
        borderColor: '#80bdff',
        boxShadow: '0 0 0 0.2rem rgba(0,123,255,.25)',
      },
      '&:before': {
        display: 'none'
      }
    }
  }
};

const variables = {
  drawerWidth: 240,
  headerHeight: 56,
  headerHeightUpSm: 64,
  tabbarHeight: 48,
  contentPadding: 12,
  contentPaddingUpSm: 24,
  boxShadow: '0px 3px 5px -1px rgba(0, 0, 0, 0.2), 0px 5px 8px 0px rgba(0, 0, 0, 0.14), 0px 1px 14px 0px rgba(0, 0, 0, 0.12)',
  color: {
    sucess: '#009358',
    error: '#dc3f53',
  }
};

const primary = {
  light: '#6d6d6d',
  main: '#424242',
  dark: '#1b1b1b',
  contrastText: '#fff',
};

const secondary = {
  light: '#4ec485',
  main: '#009358',
  dark: '#00642e',
  contrastText: '#fff',
};

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