import IconButton from '@material-ui/core/IconButton';
import Snackbar from '@material-ui/core/Snackbar';
import { WithStyles } from 'decorators/withStyles';
import { errorMessageFormatter } from 'formatters/errorMessage';
import CloseIcon from 'mdi-react/CloseIcon';
import React, { PureComponent } from 'react';
import { TOAST_DEFAULT_TIMEOUT, TOAST_ERROR_TIMEOUT } from 'settings';

import ToastGlobalProvider from './global';

interface IState {
  opened: boolean;
  message?: string;
  isError?: boolean;
}

interface IProps {
  opened: boolean;
  message?: string;
  timeout?: number;
  error?: Error;
  onClose: () => void;
  classes?: any;
}

@WithStyles(theme => ({
  wrapper: {
    [theme.breakpoints.up('sm')]: {
      top: '24px',
      left: 'auto',
      right: '24px'
    }
  },
  contentError: {
    background: theme.palette.error.main
  },
  close: {
    width: theme.spacing.unit * 4,
    height: theme.spacing.unit * 4,
  },
}))
export default class Toast extends PureComponent<IProps, IState> {
  static Global = ToastGlobalProvider;

  constructor(props: IProps) {
    super(props);
    this.state = { opened: false };
  }

  static getDerivedStateFromProps(nextProps: IProps, prevState: IState): IState {
    if (!nextProps.opened) {
      return {
        ...prevState,
        opened: false
      };
    }

    return {
      opened: nextProps.opened,
      message: nextProps.message || errorMessageFormatter(nextProps.error),
      isError: !!nextProps.error
    };
  }

  static show(message: string, timeout?: number) {
    return ToastGlobalProvider.show(message, null, timeout || TOAST_DEFAULT_TIMEOUT);
  }

  static error(error: any) {
    return ToastGlobalProvider.show(null, error, TOAST_ERROR_TIMEOUT);
  }

  handleClose = (event: any, reason: string) => {
    if (reason === 'clickaway') return;
    this.props.onClose();
  }

  public render(): JSX.Element {
    const { opened, message, isError } = this.state;
    const { timeout, classes, onClose } = this.props;

    return (
      <Snackbar
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        open={opened}
        autoHideDuration={timeout}
        onClose={this.handleClose}
        message={<span>{message}</span>}
        className={classes.wrapper}
        ContentProps={{ className: isError ? classes.contentError : null }}
        action={[
          <IconButton
            key='close'
            color='inherit'
            className='close'
            onClick={onClose}
          >
            <CloseIcon />
          </IconButton>
        ]}
      />
    );
  }
}