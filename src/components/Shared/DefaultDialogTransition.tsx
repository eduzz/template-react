import { memo, forwardRef } from 'react';

import Slide from '@material-ui/core/Slide';

const DefaultDialogTransition = memo(
  forwardRef((props: any, ref: any) => {
    return <Slide direction='up' {...props} ref={ref} />;
  })
);

export default DefaultDialogTransition;
