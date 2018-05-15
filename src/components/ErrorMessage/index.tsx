import { Button, Typography } from '@material-ui/core';
import { WithStyles } from 'decorators/withStyles';
import { errorMessageFormatter } from 'formatters/errorMessage';
import { AlertCircleIcon } from 'mdi-react';
import React, { PureComponent } from 'react';

interface IProps {
  error: any;
  tryAgain?: Function;
  classes?: any;
}

@WithStyles(theme => ({
  root: {
    textAlign: 'center',
    margin: '20px 0'
  },
  icon: {
    opacity: 0.8,
    color: theme.palette.error.main
  },
  button: {
    marginTop: 20
  }
}))
export default class ErrorMessage extends PureComponent<IProps> {
  render() {
    const { error, classes, tryAgain } = this.props;

    return (
      <div className={classes.root}>
        <AlertCircleIcon size={50} className={classes.icon} />
        <Typography variant='body2'>{errorMessageFormatter(error)}</Typography>

        {tryAgain &&
          <Button
            onClick={() => tryAgain()}
            className={classes.button}
            color='secondary'
            variant='outlined'>
            Tentar novamente
          </Button>
        }
      </div>
    );
  }
}