import { createTheme } from '@eduzz/houston-ui/ThemeProvider';

const variables = {};

const theme = createTheme('orbita', variables);

declare module '@eduzz/houston-ui/ThemeProvider' {
  type Variables = typeof variables;
  interface HoustonThemeCustomVariables extends Variables {}
}

export default theme;
