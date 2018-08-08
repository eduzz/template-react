import { Button, CardActions, CardContent, CircularProgress, LinearProgress, Typography } from '@material-ui/core';
import ValidationContext from '@react-form-fields/core/components/ValidationContext';
import FieldText from '@react-form-fields/material-ui/components/Text';
import { FormComponent, IStateForm } from 'components/Abstract/Form';
import Snackbar from 'components/Shared/Snackbar';
import { WithStyles } from 'decorators/withStyles';
import React, { FormEvent, MouseEvent } from 'react';
import rxjsOperators from 'rxjs-operators';
import authService from 'services/auth';

interface IState extends IStateForm<{
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
export default class LoginDialogRecoveryAccess extends FormComponent<IProps, IState>  {
  constructor(props: IProps) {
    super(props);
    this.state = { ...this.state, opened: false, loading: false };
  }

  onSubmit = async (event: FormEvent) => {
    const { model, loading } = this.state;

    event.preventDefault();
    if (loading) return;

    const isValid = await this.isFormValid();
    if (!isValid) return;

    this.setState({ loading: true });

    authService.sendResetPassword(model.email).pipe(
      rxjsOperators.logError(),
      rxjsOperators.bindComponent(this)
    ).subscribe(() => {
      this.setState({ loading: false });
      this.resetForm();
      this.props.onComplete();

      Snackbar.show('Foi enviado um link para seu email para podermos recuperar seu acesso.');
    }, err => {
      Snackbar.error(err);
      this.setState({ loading: false });
    });
  }

  render() {
    const { model, loading } = this.state;
    const { classes, onCancel } = this.props;

    return (
      <form onSubmit={this.onSubmit} noValidate>
        <ValidationContext ref={this.bindValidationContext}>

          <CardContent>
            <Typography>Iremos lhe enviar um email para recuperar seu acesso</Typography>

            <FieldText
              label='Email'
              type='email'
              disabled={loading}
              value={model.email}
              validation='required|email'
              onChange={this.updateModel((model, v) => model.email = v)}
            />

          </CardContent>

          <CardActions className={classes.buttons}>
            <Button disabled={loading} size='small' onClick={onCancel}>Voltar</Button>
            <Button variant='raised' color='secondary' type='submit'>
              {!loading && 'Entrar'}
              {loading && <CircularProgress color='inherit' size={20} />}
            </Button>
          </CardActions>

          {loading && <LinearProgress color='secondary' />}

        </ValidationContext>
      </form>
    );
  }
}