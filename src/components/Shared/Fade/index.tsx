import React, { PureComponent } from 'react';
import { WithStyles } from 'decorators/withStyles';
import OriginalFade, { FadeProps } from '@material-ui/core/Fade';

interface IProps extends FadeProps {
  classes?: any;
  absolute?: boolean;
}

@WithStyles(theme => ({
  root: {
    position: 'relative',
  },
  container: {
    position: 'absolute',
    marginLeft: 'auto',
    marginRight: 'auto',
    left: 0,
    right: 0,
  },
}))
export default class Fade extends PureComponent<IProps> {
  render() {
    const { classes, children, absolute, ...other } = this.props;

    if (!absolute)
      return (
        <OriginalFade {...other}>
          {children}
        </OriginalFade>
      );

    return (
      <OriginalFade {...other}>
        <div className={classes.root}>
          <div className={classes.container}>
            {children}
          </div>
        </div>
      </OriginalFade>
    );
  }
}