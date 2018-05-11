import Field from 'components/Field';
import { FormComponent, IStateForm } from 'components/FormComponent';
import AppSnackbar from 'components/Snackbar';
import { Button, Card, CardActions, CardContent, Dialog, LinearProgress } from 'material-ui';
import * as React from 'react';
import { connect } from 'react-redux';
import { IS_DEVELOPMENT } from 'settings';
import { IAppStoreState } from 'store';
import { clearLoginError, requestLogin } from 'store/actionsCreators';

import LoginValidator from './validator';

const styles = require('./index.css');

interface IState extends IStateForm<{
  email: string;
  password: string;
}> { }

interface IPropsFromConnect {
  opened: boolean;
  loading: boolean;
  error?: any;
  requestLogin?: typeof requestLogin;
  clearLoginError?: typeof clearLoginError;
}

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
      model: !IS_DEVELOPMENT ? {} : { email: 'daniel.prado@eduzz.com', password: '123mudar' }
    };
  }

  async onSubmit(event: Event) {
    event.preventDefault();

    const { model } = this.state;
    const { requestLogin } = this.props;

    await this.isFormValid();

    requestLogin(model.email, model.password);

    this.setState({ formSubmitted: true });
  }

  render() {
    const { model, formSubmitted } = this.state;
    const { opened, loading, error, clearLoginError } = this.props;

    return (
      <Dialog fullScreen open={opened}>
        <AppSnackbar opened={!!error} error={error} onClose={() => clearLoginError()} />

        <div className={styles.component}>
          <form className='container' onSubmit={this.onSubmit.bind(this)}>
            <div className='logo'>
              <img src={require('assets/images/logo-white.png')} />
            </div>

            <Card className='card'>
              <CardContent>

                <Field
                  label='Email'
                  type='email'
                  disabled={loading}
                  value={model.email}
                  submitted={formSubmitted}
                  error={this.getErrorMessage('email')}
                  onChange={this.updateModel((model, v) => model.email = v)}
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

              <CardActions className='buttons'>
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