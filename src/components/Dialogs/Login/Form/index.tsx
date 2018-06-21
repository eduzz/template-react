import { Button, Card, CardActions, CardContent, LinearProgress } from '@material-ui/core';
import { FormComponent, IStateForm } from 'components/Abstract/Form';
import Snackbar from 'components/Snackbar';
import { WithStyles } from 'decorators/withStyles';
import FieldText from 'material-ui-form-fields/components/Text';
import ValidationContext from 'material-ui-form-fields/components/ValidationContext';
import React, { MouseEvent } from 'react';
import rxjsOperators from 'rxjs-operators';
import authService from 'services/auth';

interface IState extends IStateForm<{
  email: string;
  password: string;
}> {
  opened: boolean;
  loading: boolean;
}

interface IProps {
  classes?: any;
  onRecoveryAccess: (e: MouseEvent<HTMLElement>) => void;
}

@WithStyles(theme => ({
  buttons: {
    justifyContent: 'space-between'
  }
}))
export default class LoginDialogForm extends FormComponent<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = { ...this.state, opened: false, loading: false };
  }

  async onSubmit(event: Event) {
    const { model } = this.state;

    event.preventDefault();

    const isValid = await this.isFormValid();
    if (!isValid) return;

    this.setState({ loading: true });

    authService.login(model.email, model.password).pipe(
      rxjsOperators.logError(),
      rxjsOperators.bindComponent(this)
    ).subscribe(() => {
      this.setState({ loading: false });
      this.resetForm();
    }, err => {
      Snackbar.error(err);
      this.setState({ loading: false });
    });
  }

  render() {
    const { model, loading } = this.state;
    const { classes, onRecoveryAccess } = this.props;

    return (
      <form onSubmit={this.onSubmit.bind(this)} noValidate>
        <ValidationContext ref={this.bindValidationContext.bind(this)}>

          <Card>
            <CardContent>

              <FieldText
                label='Email'
                type='email'
                disabled={loading}
                value={model.email}
                validation='required|email'
                onChange={this.updateModel((model, v) => model.email = v)}
                margin='none'
              />

              <FieldText
                label='Senha'
                type='password'
                disabled={loading}
                value={model.password}
                validation='required'
                onChange={this.updateModel((model, v) => model.password = v)}
              />

            </CardContent>

            <CardActions className={classes.buttons}>
              <Button disabled={loading} size='small' onClick={onRecoveryAccess}>Recuperar Acesso</Button>
              <Button disabled={loading} color='secondary' type='submit'>Entrar</Button>
            </CardActions>

            {loading && <LinearProgress color='secondary' />}
          </Card>

        </ValidationContext>
      </form>
    );
  }
}