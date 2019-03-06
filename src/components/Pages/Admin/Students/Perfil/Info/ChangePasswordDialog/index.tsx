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
import { WithStyles } from 'decorators/withStyles';
import * as React from 'react';
import RxOp from 'rxjs-operators';
import studentService from 'services/student';

interface IState extends IStateForm<{
  password: string;
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
export default class ChangePasswordDialog extends FormComponent<IProps, IState> {
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

    studentService.changeStudentPassword(this.props.studentID, model.password).pipe(
      RxOp.logError(),
      RxOp.bindComponent(this)
    ).subscribe(() => {
      this.setState({ loading: false });
      Toast.show('Senha alterada com sucesso');
      this.onCancel();
    }, err => {
      Toast.error(err.data.details);
      this.setState({ loading: false });
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
        {loading && <LinearProgress color='secondary' />}

        <FormValidation onSubmit={this.onSubmit} ref={this.bindForm}>
          <DialogTitle>Redefinir Senha</DialogTitle>

          <DialogContent className={classes.content}>
            <FieldText
              autoFocus
              placeholder='Informe a nova senha'
              type='password'
              id='new-password'
              disabled={loading}
              value={model.password}
              validation='required|min:5'
              onChange={this.updateModel((model, v) => model.password = v)}
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