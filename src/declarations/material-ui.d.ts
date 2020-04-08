/* eslint-disable @typescript-eslint/interface-name-prefix */
import '@material-ui/core/styles/createMuiTheme';

declare module '@material-ui/core/styles/createMuiTheme' {
  interface ThemeVariables {
    drawerWidthFull: number;
    drawerWidthMini: number;
    headerHeight: number;
    headerHeightUpSm: number;
    tabbarHeight: number;
    contentPadding: number;
    contentPaddingUpSm: number;
    boxShadow: string;
    colors: {
      facebook: string;
      google: string;
    };
  }

  interface Theme {
    variables?: ThemeVariables;
  }

  interface ThemeOptions {
    variables?: ThemeVariables;
  }
}
