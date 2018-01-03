import React, { Component } from 'react';
import { connect } from 'react-redux';
import actions from 'actions';
import styles from './styles.css';

class Login extends Component {
    state = {};

    handleSubmit = e => {
        e.preventDefault();

        this.props.dispatch(actions.requestLogin({
            username: this.refs.username.value,
            password: this.refs.password.value,
        }));
    };

    render() {
        return (
        <div className={styles.component}>
            <form className="login-form" onSubmit={this.handleSubmit}>
                <div class="default-logo">
                    
                </div>
                <div className='card-panel'>
                    <div className='input-box'>
                        <div className='input-field'>
                            <input placeholder='Email' type='email' ref='username'/>
                            <label htmlFor='email'>E-mail do Usuário</label>
                        </div>
                        <div className='input-field'>
                            <input placeholder='Senha' type='password' ref='password'/>
                            <label htmlFor='email'>Senha</label>
                        </div>
                    </div>

                    <button className='waves-effect waves-light button' type='submit'> <span>Entrar</span></button>
                </div>
            </form>
        </div>
        );
    }
}

export default connect()(Login);