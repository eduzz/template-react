import './styles.css';

import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import React, { PureComponent } from 'react';

interface IProps {
  modalTitle: string;
  modalContent?: any;
  open: boolean;
}

export class ModalCustom extends PureComponent<IProps> {
  render() {
    const { modalTitle, modalContent, open } = this.props;

    return (
      <Dialog
        open={open}
        scroll='paper'
        className='modal-root'
      >
        <DialogTitle>{modalTitle}</DialogTitle>
        <DialogContent className='modal-content'>
          {
            !modalContent &&
            <div>Carregando</div>
          }
          {
            modalContent &&
            <DialogContentText>{modalContent}</DialogContentText>
          }
        </DialogContent>
        <DialogActions>{this.props.children}</DialogActions>
      </Dialog>
    );
  }
}

export default ModalCustom;