import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import LinearProgress from '@material-ui/core/LinearProgress';
import Slide from '@material-ui/core/Slide';
import Typography from '@material-ui/core/Typography';
import FormValidation from '@react-form-fields/material-ui/components/FormValidation';
import FieldHtml from '@react-form-fields/material-ui/components/Html';
import FieldText from '@react-form-fields/material-ui/components/Text';
import { FormComponent, IStateForm } from 'components/Abstract/Form';
import Alert from 'components/Shared/Alert';
import Toast from 'components/Shared/Toast';
import { IEmail } from 'interfaces/models/email';
import * as React from 'react';
import RxOp from 'rxjs-operators';
import studentService from 'services/student';

interface IState extends IStateForm<IEmail> {
  isSending: boolean;
  totalStudents: number;
}

interface IProps {
  opened: boolean;
  onComplete: () => void;
  onCancel: () => void;
}

export default class SendEmailDialog extends FormComponent<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = {
      ...this.state,
      isSending: false,
      totalStudents: 0,
    };
  }

  componentDidMount() {
    studentService.getTotalStudents().pipe(
      RxOp.logError(),
      RxOp.bindComponent(this),
    ).subscribe(totalStudents => {
      this.setState({ totalStudents });
    }, error => Toast.error(error));
  }

  handleExit = () => {
    this.resetForm();
  }

  onCancel = () => {
    this.props.onCancel();
  }

  onSubmit = async (isValid: boolean) => {
    const { model, totalStudents } = this.state;
    const plural = !!totalStudents && totalStudents > 1;
    const msg = !!plural
      ? `a todos os ${totalStudents} alunos`
      : 'ao aluno selecionado';

    if (!isValid) return;

    const isOk = await Alert.confirm(`Deseja realmente enviar e-mail ${msg}?`);
    if (!isOk) return;

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

            <FieldHtml
              label='Mensagem'
              tabIndex={2}
              validation='required|max:300'
              helperText={`${(model.message || '').length}/300 caracteres`}
              disabled={isSending}
              value={model.message}
              onChange={this.updateModel((m, v) => m.message = v)}
              id='mensagem'
            />

            <Typography component='em'>
              O e-mail será enviado apenas para os alunos que foram listados com base nos filtros.
            </Typography>
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