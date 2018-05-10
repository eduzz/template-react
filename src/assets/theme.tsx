import createMuiTheme from 'material-ui/styles/createMuiTheme';

// use https://material.io/color/#!/

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