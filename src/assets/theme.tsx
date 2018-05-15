import createMuiTheme from '@material-ui/core/styles/createMuiTheme';

export const theme = createMuiTheme({
  palette: {
    primary: {
      light: '#636672',
      main: '#393C47',
      dark: '#131620',
      contrastText: '#fff',
    },
    secondary: {
      light: '#4ec485',
      main: '#009358',
      dark: '#00642e',
      contrastText: '#fff',
    }
  },
  variables: {
    drawerWidth: 240,
    headerHeight: 56,
    headerHeightUpSm: 64,
    tabbarHeight: 48,
    contentPadding: 12,
    contentPaddingUpSm: 24,
    boxShadow: '0px 3px 5px -1px rgba(0, 0, 0, 0.2), 0px 5px 8px 0px rgba(0, 0, 0, 0.14), 0px 1px 14px 0px rgba(0, 0, 0, 0.12)'
  }
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
  }
});