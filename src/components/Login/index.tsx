import React, { Component } from 'react';
import { connect } from 'react-redux';
import { requestLogin } from 'actionCreators/auth';
import Footer from 'components/Footer';

const styles = require('./styles.css');
const loginbg = require('assets/img/login-bg.jpg');

interface IProps {
  requestLogin: any;
}

class Login extends Component<IProps> {
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
      <div className={styles.component}>
        <form className='login-form' onSubmit={this.handleSubmit}>
          <div className='card-panel'>
            <div className='default-logo'>
              <div className='nutror-logo'>
                <svg viewBox='0 0 453 130'>
                  <path
                    d='M172.5 93.7c0 4.3-1 5.4-5.2 5.4h-1.5c-4.1 0-5.2-1.1-5.2-5.4V61.8c0-15.3 8.4-23.1 25-23.1 17.4 0 24.9 7.7 24.9 23.1v31.9c0 4.3-1 5.4-5.2 5.4h-1.5c-4.1 0-5.2-1.1-5.2-5.4V61.8c0-8.1-2.9-11.7-13.1-11.7s-13.2 3.6-13.2 11.7v31.9zM233.3 77.2c0 8.1 3 11.7 13.2 11.7s13.1-3.6 13.1-11.7V45.4c0-4.3 1-5.3 5.2-5.3h1.5c4.1 0 5.2 1.1 5.2 5.3v31.8c0 15.3-7.4 23.2-24.9 23.2-16.6 0-25-7.7-25-23.2V45.4c0-4.3 1-5.3 5.2-5.3h1.5c4.1 0 5.2 1.1 5.2 5.3v31.8zM277.6 46.1c0-3.3.8-4.3 3.9-4.9l6.1-1.2 1.4-11.2c.5-3.4 1.4-4.3 4.7-4.3h1.5c3.3 0 4.1.8 4.1 4.3V40h16c3.8 0 4.8.8 4.8 5v1.4c0 4.2-1 5-4.8 5h-16v27c0 6.9 3 10.3 8.9 10.3 3.4 0 6.5-.4 9.3-1.1 3.8-.8 4.7 0 4.7 4.2v1.4c0 3.9-.9 5.1-4.7 5.9-3.1.6-6.2 1-9.3 1-13.8 0-20.6-7.3-20.6-21.9V51.5h-6c-3.2 0-4-.8-4-4.2v-1.2zM341.4 93.7c0 4.3-1 5.4-5.2 5.4h-1.5c-4.1 0-5.2-1.1-5.2-5.4V59.8c0-14 7.2-21.1 21.7-21.1.9 0 1.7 0 2.3.1 3.8.5 4.8 1.4 4.8 5.6v1.7c0 3.9-.8 4.8-4.8 4.2-.6-.1-1.4-.1-2.3-.1-7.7 0-9.9 3.2-9.9 10.5v33zM361.6 74.7V64.4c0-16.6 8.6-25.7 26.4-25.7 18.2 0 26.1 8.6 26.1 25.7v10.2c0 16.5-8.6 25.7-26.1 25.7-18.3 0-26.4-8.5-26.4-25.6zm40.7-10.3c0-10-3.2-14.3-14.3-14.3-11.1 0-14.6 4.3-14.6 14.3v10.2c0 9.9 3.2 14.2 14.6 14.2 11.1 0 14.3-4.2 14.3-14.2V64.4zM436 93.7c0 4.3-1 5.4-5.2 5.4h-1.5c-4.1 0-5.2-1.1-5.2-5.4V59.8c0-14 7.2-21.1 21.7-21.1.9 0 1.7 0 2.3.1 3.8.5 4.8 1.4 4.8 5.6v1.7c0 3.9-.8 4.8-4.8 4.2-.6-.1-1.4-.1-2.3-.1-7.7 0-9.9 3.2-9.9 10.5v33z'
                    fill='#1e3356'
                  />
                  <g>
                    <path
                      d='M24.4 78.3c.9-2.8 1.8-5.7 2.6-8.7 2.1-7.3 4.2-14.8 7.9-21 3.6-6.1 9-8.7 14.5-7 7 2.3 9.3 10.4 10.9 16.3l.2.7c.9 3.1 1.7 6.2 2.5 9.3l2.7 10.2c.2.6.3 1.2.5 1.9.6 2.5 1.6 6.3 3.2 7.2.3.1.8.3 1.7 0 5.5-2.1 10.5-17.3 12.7-23.7l.6-2c2.1-6.2 4-12.6 5.7-18.8 3-10.5 6.2-21.3 10.7-31.6C86.1 1.3 67.5-2.4 49.2 2.5c-34.4 9-55 44.3-46 78.7 2.4 9.1 6.7 17.2 12.2 24.1l9-27z'
                      fill='#78cc5c'
                    />
                    <path
                      d='M127.8 48.4c-2.8-10.5-8-19.7-14.8-27.2-3.4 8.4-5.9 17.2-8.3 25.8-2.5 8.9-5.1 18.1-8.7 26.9-3.6 8.9-13.2 32.5-28.7 30.2-13.4-2-17.2-20.6-20-34.1-.6-2.9-1.1-5.5-1.7-7.6-.3.8-.5 1.7-.8 2.5-.3 1-.6 1.9-.9 2.9l-16.4 49.1c15.1 11 34.8 15.3 54.3 10.2 34.5-9 55.1-44.2 46-78.7z'
                      fill='#78cc5c'
                    />
                  </g>
                </svg>
              </div>
            </div>
            <div className='input-box'>
              <div className='input-field'>
                <input
                  autoFocus
                  tabIndex={1}
                  placeholder='Email'
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
            <a href='' className='button outline'>
              <span>Comece Agora</span>
            </a>
          </div>
          <Footer />
        </form>
        <div className='login-background'>
          <img src={loginbg} alt='' />
        </div>
      </div>
    );
  }
}

export default connect(undefined, { requestLogin })(Login);