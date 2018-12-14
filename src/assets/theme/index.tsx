import createMuiTheme from '@material-ui/core/styles/createMuiTheme';

import overrides from './overrides';
import variables from './variables';
import { palette, reversePalette, whitePalette } from './palette';

export const theme = createMuiTheme({
  typography: { useNextVariants: true },
  palette,
  variables,
  overrides
});

export const reverseTheme = createMuiTheme({
  typography: { useNextVariants: true },
  palette: reversePalette,
  variables,
  overrides
});

export const whiteTheme = createMuiTheme({
  typography: { useNextVariants: true },
  palette: whitePalette,
  variables,
  overrides
});