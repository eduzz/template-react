import createMuiTheme from '@material-ui/core/styles/createMuiTheme';

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
  variables
});

export const reverseTheme = createMuiTheme({
  palette: { primary: secondary, secondary: primary },
  variables
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
  variables
});