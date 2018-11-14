import React, { PureComponent, Fragment } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';

interface IProps {
  embed: JSX.Element;
}

interface IState {
  open: boolean;
}

export default class VideoDialog extends PureComponent<IProps, IState> {
  constructor(props: IProps) {
    super(props);

    this.state = {
      open: false,
    };
  }

  handleClickOpen = () => {
    this.setState({ open: true });
  }

  handleClose = () => {
    this.setState({ open: false });
  }

  render() {
    const { embed } = this.props;

    return (
      <Fragment>
        <div>
          <Button
            variant='outlined'
            onClick={this.handleClickOpen}
            disabled={!embed}
          >
            Ver Vídeo
          </Button>
        </div>
        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          fullWidth
        >
          <DialogContent>
            {embed}
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color='primary'>
              Fechar
            </Button>
          </DialogActions>
        </Dialog>
      </Fragment>
    );
  }
}