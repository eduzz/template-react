import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';
import Clipboard from 'clipboard';
import { WithStyles } from 'decorators/withStyles';
import * as React from 'react';

import Toast from '../Toast';
import { AlertGlobalProvider } from './global';

interface IState extends IAlertShowParams {
  opened: boolean;
}

interface IProps {
  opened: boolean;
  message: React.ReactNode;
  title?: string;
  confirmation?: boolean;
  global?: boolean;
  onClose: (ok: boolean) => void;
  classes?: any;
  copy?: string;
}

export interface IAlertShowParams {
  message?: React.ReactNode;
  title?: string;
  confirmation?: boolean;
  ok?: string;
  copy?: string;
}

@WithStyles(theme => ({
  root: {
    zIndex: 1600
  },
  content: {
    minWidth: '250px'
  }
}))
export default class Alert extends React.Component<IProps, IState> {
  static Global = AlertGlobalProvider;

  clipboard: Clipboard;
  okRef = React.createRef<HTMLButtonElement>();

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

  handleEnter = () => {
    if (!this.props.copy) return;

    setTimeout(() => {
      this.clipboard = new Clipboard(this.okRef.current, { container: document.activeElement });

      this.clipboard.on('success', () => {
        Toast.show('Copiado');
        this.handleOk();
      });

      this.clipboard.on('error', () => Toast.error('Não foi possível copiar'));
    }, 500);
  }

  handleOk = () => {
    this.clipboard && this.clipboard.destroy();
    this.clipboard = null;

    this.props.onClose(true);
  }

  handleCancel = () => {
    this.clipboard && this.clipboard.destroy();
    this.clipboard = null;

    this.props.onClose(false);
  }

  render() {
    const { opened, title, message, confirmation, ok, copy } = this.state;
    const { classes } = this.props;

    return (
      <Dialog
        open={opened}
        keepMounted
        TransitionComponent={Transition}
        onEnter={this.handleEnter}
        onClose={this.handleCancel}
        className={classes.root}
      >
        <DialogTitle><div id='title_confirmacao'>{title || (confirmation ? 'Confirmação' : 'Atenção')}</div></DialogTitle>
        <DialogContent>
          <DialogContentText className={classes.content}>
            {message}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          {confirmation &&
            <Button onClick={this.handleCancel} autoFocus id='cancelar'>
              Cancelar
            </Button>
          }
          {!!copy &&
            <Button
              autoFocus={!confirmation}
              color='secondary'
              buttonRef={this.okRef}
              data-clipboard-text={copy}
              id='copiar'
            >
              Copiar
            </Button>
          }
          <Button
            autoFocus={!confirmation && !copy}
            onClick={this.handleOk}
            color='secondary'
            id='btn_ok'
          >
            {ok || 'Ok'}
          </Button>
        </DialogActions>
      </Dialog>
    );
  }

}

function Transition(props: any) {
  return <Slide direction='up' {...props} />;
}