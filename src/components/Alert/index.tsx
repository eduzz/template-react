import { WithStyles } from 'decorators/withStyles';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from 'material-ui';
import * as React from 'react';

interface IState {
  openned: boolean;
  message?: string;
  title?: string;
  confirmation?: boolean;
}

@WithStyles({
  root: {
    zIndex: 1600
  },
  content: {
    minWidth: '250px',
  }
})
export default class AlertComponent extends React.PureComponent<{ classes?: any, innerRef?: any }, IState> {
  resultResolve: (result: boolean) => void;
  button: HTMLElement;

  constructor(props: any) {
    super(props);
    this.state = { openned: false, title: 'Alerta' };
  }

  componentDidMount() {
    setTimeout(() => this.button = document.getElementById('alert-button'));
  }

  show(message: string, title: string, confirmation: boolean = false): Promise<boolean> {
    this.setState({ openned: true, message, title, confirmation });

    setTimeout(() => this.button.focus(), 500);

    return new Promise<boolean>(resolve => {
      this.resultResolve = resolve;
    });
  }

  onClose(ok: boolean) {
    this.setState({ openned: false });
    this.resultResolve(ok);
  }

  render() {
    const { openned, title, message, confirmation } = this.state;
    const { classes } = this.props;

    return (
      <Dialog
        open={openned}
        keepMounted
        onClose={this.onClose.bind(this, false)}
        className={classes.root}
      >
        <DialogTitle>{title}</DialogTitle>
        <DialogContent className={classes.content}>
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