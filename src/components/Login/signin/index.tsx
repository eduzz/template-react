import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { requestLogin } from 'actionCreators/auth';

interface IProps {
  requestLogin: any;
}

export class SignIn extends Component<IProps> {
  public refs: any;

  constructor(props: IProps) {
    super(props);

  }

  handleSubmit = (e: any) => {
    e.preventDefault();

    this.props.requestLogin({
      username: this.refs.username.value,
      password: this.refs.password.value
    });
  }
  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <div className='card-panel'>
          <div className='input-box'>
            <div className='input-field'>
              <input
                autoFocus
                tabIndex={1}
                placeholder='E-mail'
                type='email'
                ref='username'
              />
              <label htmlFor='email'>E-mail do Usuário</label>
            </div>
            <a tabIndex={3} href=''>
              Esqueceu sua senha?
            </a>
            <div className='input-field'>
              <input
                tabIndex={2}
                placeholder='Senha'
                type='password'
                ref='password'
              />
              <label htmlFor='email'>Senha</label>
            </div>
          </div>

          <button
            className='waves-effect waves-light button affirmative'
            type='submit'
          >
            {' '}
            <span>Entrar</span>
          </button>
        </div>
        <div className='panel-footer'>
          <p>Não tem uma conta ainda?</p>
          <Link to={`/login/signup`} className='button outline-dark'>
            <span>Comece Agora</span>
          </Link>
        </div>
      </form>
    );
  }
}

export default connect(undefined, { requestLogin })(SignIn);