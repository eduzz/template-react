import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@material-ui/core';
import { WithStyles } from 'decorators/withStyles';
import * as React from 'react';

import { AlertGlobalProvider } from './global';

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
  global?: boolean;
  onClose: (ok: boolean) => void;
  classes?: any;
}

export interface IAlertShowParams {
  message?: React.ReactNode;
  title?: string;
  confirmation?: boolean;
}

@WithStyles(theme => ({
  root: {
    zIndex: 1600
  },
  content: {
    minWidth: '250px',
    paddingLeft: theme.variables.contentPaddingUpSm,
    paddingRight: theme.variables.contentPaddingUpSm
  }
}))
export default class Alert extends React.PureComponent<IProps, IState> {
  static Global = AlertGlobalProvider;

  constructor(props: IProps) {
    super(props);
    this.state = { opened: false };
  }

  static getDerivedStateFromProps(nextProps: IProps, prevState: IState): IState {
    // prevent any changes before close the dialog. ex: title, message e etc
    if (!nextProps.opened) {
      return { ...prevState, opened: false };
    }

    return nextProps as any;
  }

  static show(params: string): Promise<boolean>;
  static show(params: IAlertShowParams): Promise<boolean>;
  static show(params: string | IAlertShowParams) {
    const paramsData = typeof params === 'string' ? { message: params } : params;
    return AlertGlobalProvider.show(paramsData);
  }

  static confirm(params: string): Promise<boolean>;
  static confirm(params: IAlertShowParams): Promise<boolean>;
  static confirm(params: string | IAlertShowParams) {
    const paramsData = typeof params === 'string' ? { message: params } : params;
    return AlertGlobalProvider.show({ ...paramsData, confirmation: true });
  }

  onClose(ok: boolean) {
    this.props.onClose && this.props.onClose(ok);
  }

  render() {
    const { opened, title, message, confirmation } = this.state;
    const { classes } = this.props;

    return (
      <Dialog
        open={opened}
        keepMounted
        onClose={this.onClose.bind(this, false)}
        className={classes.root}
      >
        <DialogTitle>{title || (confirmation ? 'Confirmação' : 'Atenção')}</DialogTitle>
        <DialogContent>
          <DialogContentText className={classes.content}>
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
