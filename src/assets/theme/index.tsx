import createMuiTheme from '@material-ui/core/styles/createMuiTheme';

import overrides from './overrides';
import { palette, reversePalette, whitePalette } from './palette';
import props from './props';
import variables from './variables';

export const theme = createMuiTheme({
  typography: { useNextVariants: true },
  palette,
  variables,
  overrides,
  props
});

export const reverseTheme = createMuiTheme({
  typography: { useNextVariants: true },
  palette: reversePalette,
  variables,
  overrides,
  props
});

export const whiteTheme = createMuiTheme({
  typography: { useNextVariants: true },
  palette: whitePalette,
  variables,
  overrides,
  props
});