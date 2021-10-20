import { HoustonThemeBuilder } from '@eduzz/houston-ui/styles/types';

const variables = {
  drawerWidthFull: 240,
  drawerWidthMini: 55,
  headerHeight: 67,
  headerHeightUpSm: 64,
  tabbarHeight: 48,
  contentPadding: 12,
  contentPaddingUpSm: 24,
  boxShadow:
    '0px 3px 5px -1px rgba(0, 0, 0, 0.2), 0px 5px 8px 0px rgba(0, 0, 0, 0.14), 0px 1px 14px 0px rgba(0, 0, 0, 0.12)'
};

const theme: HoustonThemeBuilder = {
  variables
};

declare module '@eduzz/houston-ui/styles/types' {
  interface IHoustonTheme {
    variables: typeof variables;
  }
}

export default theme;
