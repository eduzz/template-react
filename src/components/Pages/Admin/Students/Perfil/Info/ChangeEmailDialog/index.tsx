import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';
import FormValidation from '@react-form-fields/material-ui/components/FormValidation';
import FieldText from '@react-form-fields/material-ui/components/Text';
import { FormComponent, IStateForm } from 'components/Abstract/Form';
import Toast from 'components/Shared/Toast';
import { WithStyles } from 'decorators/withStyles';
import * as React from 'react';
import RxOp from 'rxjs-operators';
import studentService from 'services/student';

interface IState extends IStateForm<{
  email: string;
}> {
  filter: string;
  loading: boolean;
}

interface IProps {
  studentID: number;
  opened: boolean;
  onCancel: () => void;
  classes?: any;
}

@WithStyles({
  content: {
    width: 500,
    maxWidth: 'calc(95vw - 50px)'
  }
})
export default class ChangeEmailDialog extends FormComponent<IProps, IState> {
  constructor(props: IProps) {
    super(props);

    this.state = {
      ...this.state,
      filter: '',
      loading: false,
    };
  }

  onCancel = () => {
    this.props.onCancel();
  }

  onSubmit = async (isValid: boolean) => {
    if (!isValid) return;

    const { model } = this.state;
    this.setState({ loading: true });

    studentService.changeStudentEmail(this.props.studentID, model.email).pipe(
      RxOp.logError(),
      RxOp.bindComponent(this)
    ).subscribe(() => {
      this.setState({ loading: false });
      Toast.show('E-mail alterado com sucesso');
      this.onCancel();
    }, err => {
      Toast.error(err.data.details);
      this.setState({ loading: false });
    });
  }

  handleChange = (e: any) => {
    this.setState({
      filter: e.target.value,
    });
  }

  render() {
    const { classes, opened } = this.props;
    const { loading, model } = this.state;

    return (
      <Dialog
        disableBackdropClick
        disableEscapeKeyDown
        open={opened}
        TransitionComponent={Transition}
      >
        <FormValidation onSubmit={this.onSubmit} ref={this.bindForm}>
          <DialogTitle>Redefinir E-mail</DialogTitle>

          <DialogContent className={classes.content}>
            <FieldText
              autoFocus
              label='Informe o novo e-mail'
              type='email'
              id='new-email'
              disabled={loading}
              value={model.email}
              validation='required|email'
              onChange={this.updateModel((model, v) => model.email = v)}
            />
          </DialogContent>

          <DialogActions>
            <Button disabled={loading} onClick={this.onCancel}>Cancelar</Button>
            <Button color='secondary' type='submit' disabled={loading}>Redefinir</Button>
          </DialogActions>
        </FormValidation>
      </Dialog>
    );
  }
}

function Transition(props: any) {
  return <Slide direction='up' {...props} />;
}