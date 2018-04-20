import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { requestRegister } from 'actionCreators/signup';
import Button from 'material-ui/Button';

interface IProps {
  requestRegister: any;
}

export class SignUp extends Component<IProps> {
  public refs: any;

  constructor(props: IProps) {
    super(props);
  }

  handleSubmit = (e: any) => {
    e.preventDefault();

    this.props.requestRegister({
      name: this.refs.name.value,
      username: this.refs.username.value,
      password: this.refs.password.value,
    });
  }

  render() {
    return (
      <form>
        <div className='card-panel'>
          <h1 className='title'>Nova Conta</h1>
          <div className='input-box'>
            <div className='input-field'>
              <input
                autoFocus
                tabIndex={1}
                placeholder='Nome'
                type='text'
                ref='name'
              />
              <label htmlFor='name'>Nome</label>
            </div>
            <div className='input-field'>
              <input
                tabIndex={2}
                placeholder='E-mail'
                type='email'
                ref='username'
              />
              <label htmlFor='email'>E-mail</label>
            </div>
            <div className='input-field'>
              <input
                tabIndex={3}
                placeholder='E-mail'
                type='email'
                ref='usernameConfirm'
              />
              <label htmlFor='email'>Confirme seu e-mail</label>
            </div>
            <div className='input-field'>
              <input
                tabIndex={4}
                placeholder='Senha'
                type='password'
                ref='password'
              />
              <label htmlFor='password'>Senha</label>
            </div>
            <div className='input-field'>
              <input
                tabIndex={5}
                placeholder='Senha'
                type='password'
                ref='passwordConfirm'
              />
              <label htmlFor='password'>Confirme sua senha</label>
            </div>
          </div>

          <Button
            size='medium'
            className='waves-effect waves-light button affirmative'
            onClick={this.handleSubmit}
          >
            Entrar
          </Button>
        </div>
        <div className='panel-footer'>
          <p>Já possui uma conta?</p>
          <Link to={`/login`} className='button outline-dark'>
            <span>Acesse Agora</span>
          </Link>
        </div>
      </form>
    );
  }
}

export default connect(undefined, { requestRegister })(SignUp);