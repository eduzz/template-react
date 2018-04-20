import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class SignUp extends Component {
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

          <button
            className='waves-effect waves-light button affirmative'
            type='submit'
          >
            {' '}
            <span>Entrar</span>
          </button>
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