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
import Toast from 'components/Shared/Toast';
import { IEmail } from 'interfaces/models/email';
import * as React from 'react';
import RxOp from 'rxjs-operators';
import studentService from 'services/student';

interface IState extends IStateForm<IEmail> {
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
    const { model } = this.state;

    if (!isValid) return;

    this.setState({ isSending: true });

    studentService.getFilters()
      .pipe(
        RxOp.first(),
        RxOp.switchMap(filters => studentService.sendEmail(
          {
            title: model.title,
            message: model.message,
            course_name: model.course_name || ''
          },
          filters
        ))
      )
      .pipe(
        RxOp.logError(),
        RxOp.bindComponent(this)
      )
      .subscribe(
        () => {
          this.resetForm();
          this.setState({ isSending: false });
          Toast.show('E-mail enviado com sucesso!');
          this.props.onCancel();
        },
        err => {
          Toast.error(err);
          this.setState({ isSending: false });
        }
      );
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

        <FormValidation onSubmit={this.onSubmit} ref={this.bindForm} >
          <DialogTitle><div id='title_enviaEmail'>Enviar E-mail para os alunos</div></DialogTitle>

          <DialogContent>
            <FieldText
              type='text'
              label='Título'
              tabIndex={1}
              validation='required|max:120'
              disabled={isSending}
              value={model.title}
              onChange={this.updateModel((m, v) => m.title = v)}
              id='titulo'
            />

            <FieldText
              multiline
              rows={100}
              className='textarea'
              type='text'
              label='Mensagem'
              tabIndex={2}
              validation='required|max:300'
              helperText={`${(model.message || '').length}/300 caracteres`}
              disabled={isSending}
              value={model.message}
              onChange={this.updateModel((m, v) => m.message = v)}
              id='mensagem'
            />
          </DialogContent>

          <DialogActions>
            <Button disabled={isSending} onClick={this.onCancel} id='btn_cancelar'>Cancelar</Button>
            <Button color='secondary' type='submit' disabled={isSending} id='btn_enviar'>Enviar</Button>
          </DialogActions>

        </FormValidation>
      </Dialog>
    );
  }
}

function Transition(props: any) {
  return <Slide direction='up' {...props} />;
}