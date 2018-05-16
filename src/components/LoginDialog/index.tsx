import { Button, Card, CardActions, CardContent, Dialog, LinearProgress, Slide } from '@material-ui/core';
import Field from 'components/Field';
import { FormComponent, IStateForm } from 'components/FormComponent';
import Snackbar from 'components/Snackbar';
import { WithStyles } from 'decorators/withStyles';
import * as React from 'react';
import { connect } from 'react-redux';
import { IAppStoreState } from 'store';
import { clearLoginError, requestLogin } from 'store/actionCreators';

import LoginValidator from './validator';

interface IState extends IStateForm<{
  username: string;
  password: string;
}> { }

interface IPropsFromConnect {
  opened: boolean;
  loading: boolean;
  error?: any;
  requestLogin?: typeof requestLogin;
  clearLoginError?: typeof clearLoginError;
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
    width: '300px',
    height: '350px',
    maxWidth: 'calc(100% - 30px)',
    textAlign: 'center',
    color: 'white'
  },
  logo: {
    textAlign: 'center'
  },
  logoImage: {
    maxWidth: '200px',
    marginBottom: '20px'
  },
  buttons: {
    justifyContent: 'space-between'
  }
}))
class LoginDialog extends FormComponent<IPropsFromConnect, IState> {
  validator = new LoginValidator();

  constructor(props: any) {
    super(props);
    this.state = { formSubmitted: false, model: {} };
  }

  static getDerivedStateFromProps(nextProps: IPropsFromConnect, prevState: IState): IState {
    if (nextProps.opened) return prevState;

    return {
      ...prevState,
      model: {}
    };
  }

  async onSubmit(event: Event) {
    event.preventDefault();

    const { model } = this.state;
    const { requestLogin } = this.props;

    const isValid = await this.isFormValid();
    if (!isValid) return;

    requestLogin(model.username, model.password);
  }

  render() {
    const { model, formSubmitted } = this.state;
    const { opened, loading, error, clearLoginError, classes } = this.props;

    return (
      <Dialog fullScreen open={opened} TransitionComponent={Transition}>
        <Snackbar opened={!!error} error={error} onClose={() => clearLoginError()} />

        <div className={classes.root}>
          <form className={classes.container} onSubmit={this.onSubmit.bind(this)}>
            <div className={classes.logo}>
              <img src={require('assets/images/logo-white.png')} className={classes.logoImage} />
            </div>

            <Card>
              <CardContent>

                <Field
                  label='Email'
                  type='email'
                  disabled={loading}
                  value={model.username}
                  submitted={formSubmitted}
                  error={this.getErrorMessage('username')}
                  onChange={this.updateModel((model, v) => model.username = v)}
                  margin='none'
                />

                <Field
                  label='Senha'
                  type='password'
                  disabled={loading}
                  value={model.password}
                  submitted={formSubmitted}
                  error={this.getErrorMessage('password')}
                  onChange={this.updateModel((model, v) => model.password = v)}
                />

              </CardContent>

              <CardActions className={classes.buttons}>
                <Button disabled={loading} size='small'>Recuperar Acesso</Button>
                <Button disabled={loading} color='secondary' type='submit'>Entrar</Button>
              </CardActions>

              {loading && <LinearProgress color='secondary' />}
            </Card>

          </form>
        </div>
      </Dialog>
    );
  }
}

const mapStateToProps = (state: IAppStoreState, ownProps: {}) => {
  return {
    ...ownProps,
    opened: state.auth.isLoginFormOpened,
    loading: state.auth.isFetching,
    error: state.auth.error
  };
};

export default connect<IPropsFromConnect, {}, {}>(mapStateToProps, {
  requestLogin,
  clearLoginError
})(LoginDialog);

function Transition(props: any) {
  return <Slide direction='up' {...props} />;
}