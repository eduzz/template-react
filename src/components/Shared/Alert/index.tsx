import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';
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

@WithStyles({
  root: {
    zIndex: 1600
  },
  content: {
    minWidth: '250px'
  }
})
export default class Alert extends React.Component<IProps, IState> {
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

    return nextProps;
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

  handleOk = () => {
    this.props.onClose(true);
  };

  handleCancel = () => {
    this.props.onClose(false);
  };

  render() {
    const { opened, title, message, confirmation } = this.state;
    const { classes } = this.props;

    return (
      <Dialog
        open={opened}
        keepMounted
        TransitionComponent={Transition}
        onClose={this.handleCancel}
        className={classes.root}
      >
        <DialogTitle>{title || (confirmation ? 'Confirmação' : 'Atenção')}</DialogTitle>
        <DialogContent>
          <DialogContentText className={classes.content}>{message}</DialogContentText>
        </DialogContent>
        <DialogActions>
          {confirmation && (
            <Button onClick={this.handleCancel} autoFocus>
              Cancelar
            </Button>
          )}
          <Button autoFocus={!confirmation} onClick={this.handleOk} color='primary'>
            OK
          </Button>
        </DialogActions>
      </Dialog>
    );
  }
}

function Transition(props: any) {
  return <Slide direction='up' {...props} />;
}
