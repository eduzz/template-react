import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import LinearProgress from '@material-ui/core/LinearProgress';
import Typography from '@material-ui/core/Typography';
import FormValidation from '@react-form-fields/material-ui/components/FormValidation';
import FieldText from '@react-form-fields/material-ui/components/Text';
import { FormComponent, IStateForm } from 'components/Abstract/Form';
import Toast from 'components/Shared/Toast';
import { WithStyles } from 'decorators/withStyles';
import React, { MouseEvent } from 'react';
import * as RxOp from 'rxjs-operators';
import authService from 'services/auth';

interface IState
  extends IStateForm<{
    email: string;
  }> {
  opened: boolean;
  loading: boolean;
}

interface IProps {
  classes?: any;
  onCancel: (e: MouseEvent<HTMLElement>) => void;
  onComplete: () => void;
}

@WithStyles({
  buttons: {
    justifyContent: 'space-between'
  }
})
export default class LoginDialogRecoveryAccess extends FormComponent<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = { ...this.state, opened: false, loading: false };
  }

  onSubmit = (isValid: boolean) => {
    if (!isValid) return;

    const { model } = this.state;
    this.setState({ loading: true });

    authService
      .sendResetPassword(model.email)
      .pipe(
        RxOp.logError(),
        RxOp.bindComponent(this)
      )
      .subscribe(
        () => {
          this.setState({ loading: false });
          this.resetForm();
          this.props.onComplete();

          Toast.show('Foi enviado um link para seu email para podermos recuperar seu acesso.');
        },
        err => {
          Toast.error(err);
          this.setState({ loading: false });
        }
      );
  };

  render() {
    const { model, loading } = this.state;
    const { classes, onCancel } = this.props;

    return (
      <FormValidation onSubmit={this.onSubmit} ref={this.bindForm}>
        <Card>
          <CardContent>
            <Typography>Iremos lhe enviar um email para recuperar seu acesso</Typography>

            <FieldText
              label='Email'
              type='email'
              disabled={loading}
              value={model.email}
              validation='required|email'
              onChange={this.updateModel((model, v) => (model.email = v))}
            />
          </CardContent>

          <CardActions className={classes.buttons}>
            <Button disabled={loading} size='small' onClick={onCancel}>
              Voltar
            </Button>
            <Button disabled={loading} color='secondary' type='submit'>
              Enviar
            </Button>
          </CardActions>

          {loading && <LinearProgress color='secondary' />}
        </Card>
      </FormValidation>
    );
  }
}
