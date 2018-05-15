import '@material-ui/core/styles/createMuiTheme';

declare module '@material-ui/core/styles/createMuiTheme' {
  interface ThemeVariables {
    drawerWidth: number;
    headerHeight: number;
    headerHeightUpSm: number;
    tabbarHeight: number;
    contentPadding: number;
    contentPaddingUpSm: number;
    boxShadow: string;
  }

  interface Theme {
    variables?: ThemeVariables;
  }

  interface ThemeOptions {
    variables?: ThemeVariables;
  }
}