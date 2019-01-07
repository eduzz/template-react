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
import { IRouteProps } from 'decorators/withRouter';
import { WithStyles } from 'decorators/withStyles';
import IResetPasswordToken from 'interfaces/tokens/resetPasswordToken';
import queryString from 'query-string';
import * as React from 'react';
import { Redirect } from 'react-router-dom';
import * as RxOp from 'rxjs-operators';
import authService from 'services/auth';
import tokenService from 'services/token';

interface IState extends IStateForm<{
  password: string;
  confirmPassword: string;
}> {
  token: string;
  tokenData: IResetPasswordToken;
  loading: boolean;
}

interface IProps extends IRouteProps<{ t: string }> {
  classes?: any;
}

@WithStyles(theme => ({
  root: {
    background: theme.palette.primary.main,
    minHeight: '100vh',
    minWidth: '100vw',
    position: 'relative'
  },
  container: {
    position: 'absolute',
    top: '0',
    left: '0',
    right: '0',
    bottom: '0',
    margin: 'auto',
    width: '320px',
    height: '400px',
    maxWidth: 'calc(100% - 30px)',
    color: 'white'
  },
  logo: {
    textAlign: 'center',
    marginBottom: 20
  },
  logoImage: {
    maxWidth: '100%',
    maxHeight: 120
  },
  viewContainer: {
    boxSizing: 'border-box',
    padding: '0 10px',
    height: 310
  },
  buttons: {
    justifyContent: 'flex-end'
  }
}))
export default class NewPasswordPage extends FormComponent<IProps, IState> {
  constructor(props: IProps) {
    super(props);

    const token = queryString.parse(props.location.search).t as string;
    const tokenData = tokenService.decode<IResetPasswordToken>(token);

    this.state = {
      ...this.state,
      token,
      tokenData,
      loading: false,
    };
  }

  onSubmit = (isValid: boolean) => {
    if (!isValid) return;

    const { model, token, tokenData } = this.state;
    this.setState({ loading: true });

    authService.resetPassword(token, model.password).pipe(
      RxOp.switchMap(() => authService.login(tokenData.email, model.password)),
      RxOp.logError(),
      RxOp.bindComponent(this)
    ).subscribe(() => {
      Toast.show('Senha alterada com sucesso!');
      this.props.history.push('/');
    }, err => {
      Toast.error(err);
      this.setState({ loading: false });
    });
  }

  render() {
    const { model, loading, tokenData } = this.state;
    const { classes } = this.props;

    if (!tokenData) {
      return (
        <Redirect to='/' />
      );
    }

    return (
      <div className={classes.root}>
        <div className={classes.container}>

          <div className={classes.logo}>
            <img src={require('assets/images/logo-white.png')} className={classes.logoImage} />
          </div>

          <FormValidation onSubmit={this.onSubmit} ref={this.bindForm}>

            <Card>
              <CardContent>
                <Typography>Olá {tokenData.firstName}, informe sua nova senha:</Typography>

                <FieldText
                  label='Nova senha'
                  type='password'
                  disabled={loading}
                  value={model.password}
                  validation='required|min:5'
                  onChange={this.updateModel((model, v) => model.password = v)}
                />

                <FieldText
                  label='Repita a senha'
                  type='password'
                  disabled={loading}
                  value={model.confirmPassword}
                  validation='required|same:nova senha'
                  validationContext={{ 'nova senha': model.password }}
                  onChange={this.updateModel((model, v) => model.confirmPassword = v)}
                />

              </CardContent>

              <CardActions className={classes.buttons}>
                <Button disabled={loading} color='secondary' type='submit'>Salvar</Button>
              </CardActions>

              {loading && <LinearProgress color='secondary' />}
            </Card>

          </FormValidation>

        </div>
      </div>
    );
  }
}