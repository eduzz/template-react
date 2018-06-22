import createMuiTheme from '@material-ui/core/styles/createMuiTheme';

const variables = {
  drawerWidth: 240,
  headerHeight: 56,
  headerHeightUpSm: 64,
  tabbarHeight: 48,
  contentPadding: 12,
  contentPaddingUpSm: 24,
  boxShadow: '0px 3px 5px -1px rgba(0, 0, 0, 0.2), 0px 5px 8px 0px rgba(0, 0, 0, 0.14), 0px 1px 14px 0px rgba(0, 0, 0, 0.12)',
  colors: {
    facebook: '#3b5998',
    google: '#de5245'
  }
};

const primary = {
  light: '#4f5b62',
  main: '#263238',
  dark: '#000a12',
  contrastText: '#fff',
};

const secondary = {
  light: '#7f85ff',
  main: '#3d58f6',
  dark: '#002fc2',
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
      contrastText: '#3a3a3a'
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