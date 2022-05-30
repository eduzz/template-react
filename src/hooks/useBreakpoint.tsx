import useMediaQuery from '@mui/material/useMediaQuery';

import { Breakpoints } from '@eduzz/houston-tokens/types';
import { breakpoints, breakpoinstUtils } from '@eduzz/houston-tokens/variables/breakpoints';

export default function useBreakpoint() {
  const keys = Object.keys(breakpoints).reverse() as Array<keyof Breakpoints>;

  return (
    keys.reduce((output, key) => {
      // eslint-disable-next-line react-hooks/rules-of-hooks
      const matches = useMediaQuery(breakpoinstUtils.up(key));
      return !output && matches ? key : output;
    }, null) || 'xs'
  );
}
