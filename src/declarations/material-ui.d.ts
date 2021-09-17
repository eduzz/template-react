/* eslint-disable @typescript-eslint/naming-convention */
import '@material-ui/core/styles/createTheme';

declare module '@material-ui/core/styles/createTheme' {
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
