import Button from '@material-ui/core/Button';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CircularProgress from '@material-ui/core/CircularProgress';
import { FormValidation } from '@react-form-fields/material-ui/components/FormValidation';
import FieldText from '@react-form-fields/material-ui/components/Text';
import { FormComponent, IStateForm } from 'components/Abstract/Form';
import Toast from 'components/Shared/Toast';
import { WithStyles } from 'decorators/withStyles';
import React, { MouseEvent } from 'react';
import rxjsOperators from 'rxjs-operators';
import authService from 'services/auth';

interface IState extends IStateForm<{
  username: string;
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

  onSubmit = async (isValid: boolean) => {
    const { model, loading } = this.state;
    if (!isValid || loading) return;

    this.setState({ loading: true });

    authService.login(model.username, model.password).pipe(
      rxjsOperators.logError(),
      rxjsOperators.bindComponent(this)
    ).subscribe(() => {
      this.setState({ loading: false });
      this.resetForm();
    }, err => {
      Toast.error(err);
      this.setState({ loading: false });
    });
  }

  render() {
    const { model, loading } = this.state;
    const { classes, onRecoveryAccess } = this.props;

    return (
      <FormValidation onSubmit={this.onSubmit} ref={this.bindForm}>

        <CardContent>
          <FieldText
            label='Email'
            type='email'
            disabled={loading}
            value={model.username}
            validation='required|email'
            onChange={this.updateModel((model, v) => model.username = v)}
            margin='dense'
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
          <Button variant='raised' color='secondary' type='submit'>
            {!loading && 'Entrar'}
            {loading && <CircularProgress color='inherit' size={20} />}
          </Button>
        </CardActions>

      </FormValidation>
    );
  }
}