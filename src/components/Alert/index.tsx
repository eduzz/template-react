import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from 'material-ui';
import * as React from 'react';

const styles = require('./index.css');

interface IState {
  opened: boolean;
  message?: React.ReactNode;
  title?: string;
  confirmation?: boolean;
}

interface IProps {
  opened: boolean;
  message: React.ReactNode;
  title?: string;
  confirmation?: boolean;
  onClose: (ok: boolean) => void;
}

export default class AppAlert extends React.PureComponent<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = { opened: false };
  }

  static getDerivedStateFromProps(nextProps: IProps, prevState: IState): IState {
    // prevent any changes before close the dialog. ex: title, message e etc
    if (!nextProps.opened) {
      return { ...prevState, opened: false };
    }

    return nextProps;
  }

  onClose(ok: boolean) {
    this.props.onClose(ok);
  }

  render() {
    const { opened, title, message, confirmation } = this.state;

    return (
      <Dialog
        open={opened}
        keepMounted
        onClose={this.onClose.bind(this, false)}
        className={styles.component}
      >
        <DialogTitle>{title || 'Atenção'}</DialogTitle>
        <DialogContent className='content'>
          <DialogContentText>
            {message}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          {confirmation &&
            <Button onClick={this.onClose.bind(this, false)}>
              Cancelar
            </Button>
          }
          <Button id='alert-button' onClick={this.onClose.bind(this, true)} color='primary'>
            OK
          </Button>
        </DialogActions>
      </Dialog>
    );
  }
}