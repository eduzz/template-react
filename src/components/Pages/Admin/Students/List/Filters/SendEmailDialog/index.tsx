import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import LinearProgress from '@material-ui/core/LinearProgress';
import Slide from '@material-ui/core/Slide';
import FormValidation from '@react-form-fields/material-ui/components/FormValidation';
import FieldText from '@react-form-fields/material-ui/components/Text';
import { FormComponent, IStateForm } from 'components/Abstract/Form';
import { IAuthor } from 'interfaces/models/author';
import * as React from 'react';

/* import Toast from 'components/Shared/Toast'; */
/* import RxOp from 'rxjs-operators'; */

interface IState extends IStateForm<IAuthor> {
  isSending: boolean;
}

interface IProps {
  opened: boolean;
  onComplete: () => void;
  onCancel: () => void;
}

export default class SendEmailDialog extends FormComponent<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = { ...this.state, isSending: false };
  }

  handleExit = () => {
    this.resetForm();
  }

  onCancel = () => {
    this.props.onCancel();
  }

  onSubmit = async (isValid: boolean) => {
    if (!isValid) return;

    this.setState({ isSending: true });

    /* authorService.save(this.state.model).pipe(
      RxOp.logError(),
      RxOp.bindComponent(this)
    ).subscribe(author => {
      this.setState({ isSending: false });

      Toast.show('Salvo com sucesso');
      this.props.onComplete(author);
    }, err => {
      Toast.error(err);
      this.setState({ isSending: false });
    }); */
  }

  render() {
    const { isSending, model } = this.state;
    const { opened } = this.props;

    return (
      <Dialog
        open={opened || false}
        disableBackdropClick
        disableEscapeKeyDown
        onExited={this.handleExit}
        TransitionComponent={Transition}
      >
        {isSending && <LinearProgress color='secondary' />}

        <FormValidation onSubmit={this.onSubmit} ref={this.bindForm}>
          <DialogTitle>Eniar E-amail para os alunos</DialogTitle>

          <DialogContent>
            <FieldText
              type='text'
              label='Nome'
              tabIndex={1}
              validation='required|max:120'
              disabled={isSending}
              value={model.name}
              onChange={this.updateModel((m, v) => m.name = v)}
            />

            <FieldText
              multiline
              rows={100}
              className='textarea'
              type='text'
              label='Resumo'
              tabIndex={2}
              validation='required|max:300'
              helperText={`${(model.description || '').length}/300 caracteres`}
              disabled={isSending}
              value={model.description}
              onChange={this.updateModel((m, v) => m.description = v)}
            />
          </DialogContent>

          <DialogActions>
            <Button disabled={isSending} onClick={this.onCancel}>Cancelar</Button>
            <Button color='secondary' type='submit' disabled={isSending}>Enviar</Button>
          </DialogActions>

        </FormValidation>
      </Dialog>
    );
  }
}

function Transition(props: any) {
  return <Slide direction='up' {...props} />;
}