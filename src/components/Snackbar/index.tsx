import { errorMessageFormatter } from 'formatters/errorMessage';
import { IconButton, Snackbar } from 'material-ui';
import CloseIcon from 'mdi-react/CloseIcon';
import React, { PureComponent } from 'react';
import { SNACKBAR_DEFAULT_TIMEOUT } from 'settings';

const styles = require('./index.css');

interface IState {
  opened: boolean;
  message?: string;
  isError?: boolean;
}

interface IProps {
  opened: boolean;
  message?: string;
  timeout?: number;
  actions?: JSX.Element[];
  error?: Error;
  onClose: () => void;
}

export default class AppSnackbar extends PureComponent<IProps, IState> {
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

  handleClose(event: any, reason: string) {
    if (reason === 'clickaway') return;
    this.props.onClose();
  }

  public render(): JSX.Element {
    const { opened, message, isError } = this.state;
    const { timeout } = this.props;

    return (
      <span className={styles.component}>
        <Snackbar
          anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
          open={opened}
          autoHideDuration={timeout || (isError ? null : SNACKBAR_DEFAULT_TIMEOUT)}
          onClose={this.handleClose.bind(this)}
          message={<span>{message}</span>}
          ContentProps={{ className: isError ? 'content-error' : null }}
          action={[
            <IconButton
              key='close'
              color='inherit'
              className='close'
              onClick={this.handleClose.bind(this, null, 'close')}>
              <CloseIcon />
            </IconButton>
          ]}
        />
      </span>
    );
  }
}