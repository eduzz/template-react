import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { validateForm } from 'actionCreators/validateForm';
import { requestRegister } from 'actionCreators/signup';
import Button from 'material-ui/Button';

const formRules = [
  {
    ref: 'name',
    required: true,
  },
  {
    ref: 'username',
    required: true,
  },
  {
    ref: 'usernameConfirm',
    required: true,
    isSame: 'username',
  },
  {
    ref: 'password',
    required: true,
  },
  {
    ref: 'passwordConfirm',
    required: true,
    isSame: 'password',
  }
];

interface IProps {
  requestRegister: any;
  validateForm: any;
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

  handleChange = (e: any) => {
    let currVal = {
      name: this.refs.name.value,
      username: this.refs.username.value,
      usernameConfirm: this.refs.usernameConfirm.value,
      password: this.refs.password.value,
      passwordConfirm: this.refs.passwordConfirm.value,
    };

    let currField = e.target;

    this.props.validateForm(formRules, currVal, currField);
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
                id='name'
                ref='name'
                onChange={this.handleChange}
              />
              <label htmlFor='name'>Nome</label>
            </div>
            <div className='input-field'>
              <input
                tabIndex={2}
                placeholder='E-mail'
                type='email'
                id='username'
                ref='username'
                onChange={this.handleChange}
              />
              <label htmlFor='email'>E-mail</label>
            </div>
            <div className='input-field'>
              <input
                tabIndex={3}
                placeholder='E-mail'
                type='email'
                id='usernameConfirm'
                ref='usernameConfirm'
                onChange={this.handleChange}
              />
              <label htmlFor='email'>Confirme seu e-mail</label>
            </div>
            <div className='input-field'>
              <input
                tabIndex={4}
                placeholder='Senha'
                type='password'
                id='password'
                ref='password'
                onChange={this.handleChange}
              />
              <label htmlFor='password'>Senha</label>
            </div>
            <div className='input-field'>
              <input
                tabIndex={5}
                placeholder='Senha'
                type='password'
                id='passwordConfirm'
                ref='passwordConfirm'
                onChange={this.handleChange}
              />
              <label htmlFor='password'>Confirme sua senha</label>
            </div>
          </div>

          <Button
            size='medium'
            className='waves-effect waves-light button affirmative'
            onClick={this.handleSubmit}
            disabled={false}
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

export default connect(undefined, { requestRegister, validateForm })(SignUp);