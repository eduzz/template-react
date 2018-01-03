import React, { Component } from 'react';
import { connect } from 'react-redux';
import actions from 'actions';
import styles from './styles.css';
import loginbg from 'assets/img/login-bg.jpg';

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
                <div className='card-panel'>
                    <div class="default-logo">
                        <div class="nutror-logo">
                            <svg viewBox="0 0 376 376">
                              <path d="M186 5C86 5 5 86 5 186s81 181 181 181 181-81 181-181S286 5 186 5zm-46.9 174.3v67l-46.9 46.9V92.1l174.3 181-127.4-93.8zm147.5 100.6l-174.3-181 127.4 93.9v-67l46.9-46.9v201z" fill="#1f3154"/>
                            </svg>
                           <svg viewBox="0 0 1094 343">
                              <path d="M220.2 156.9c0-22.4-.3-62.5-72.3-62.5-4.2 0-39.8 0-65.1 13.3-12.9 6.5-15.2 13.3-15.2 27.6V288c0 6.5 1.9 7.6 7.2 7.2h18.5c5.3 0 8-.8 8-7.6V147.8c0-9.4.3-33.8 40.9-33.8 44.3 0 44.3 28.4 44.3 46.2v127.3c0 6.8 2.3 7.6 8.3 7.6h20.8c4.2-.8 4.5-4.2 4.5-7.6l.1-130.6zm180.4-50.7c-.3-5.7-2.3-7.2-8.3-7.2-7.2 0-19.7 0-20.8.3-4.2.8-4.5 3.8-4.5 7.6v129.6c0 18.2 0 40.6-39 40.6-41.7 0-42.1-27.3-42.4-45.1V106.2c0-6.5-2.3-7.2-7.6-7.2h-19.7c-5.7 0-6.8 1.9-6.8 6.8v134.1c0 19 3.4 33.3 17.4 45.1 9.1 7.2 23.1 14.8 53.8 14.8 35.2 0 56.4-10.2 62.1-13.3 14.4-8.7 15.6-19.3 15.9-38.3l-.1-142zm117.8 9.4c5.7 0 5.7-1.1 5.7-11.4 0-4.9-1.5-5.3-6-5.3h-33V52.8c0-4.5-.3-9.4-4.2-9.4-1.1 0-2.6.8-6.5 4.2L457 63.1c-4.5 4.5-5.7 6.5-5.7 13.3V99h-20.1c-5.7.3-5.7 1.1-5.7 11 0 5.3.8 5.7 5.7 5.7h20.1v129.9c0 11.7.3 24.2 9.1 36 8 10.2 21.6 17.4 39.8 17.4 8.7 0 29.6-2.6 29.6-12.5 0-2.3-.8-7.6-7.6-7.6-1.5 0-8.3.3-9.9.3-11.4 0-18.5-5.3-22.7-13.3-4.2-7.2-4.2-11.4-4.5-27.3v-123h33.3zm63.4 23.9c.3-9.9.8-26.5 23.1-26.5 11 0 15.9 4.5 20.8 9.4 6.5 7.2 9.1 10.2 15.9 10.2 9.4 0 15.6-7.6 15.6-16.3 0-17.8-20.5-21.9-39-21.9-24.7 0-48.9 6.5-60.2 13.3-8.3 4.9-9.9 9.4-9.9 22.7v158.4c0 6 2.3 6.5 7.6 6.5H575c4.5 0 6.5-.3 6.8-6.5V139.5zM826.3 196c-1.1-44-26.9-101.5-86.4-101.5-54.9 0-86.7 50-86.7 103 0 50.8 29.9 102.3 87.1 102.3 56.1 0 86.8-53.1 86-103.8zm-36-2.7c2.3 52.3-20.1 83.3-48.5 83.3-27.3 0-53.4-31.5-53.4-84.5 0-45.1 19.3-76.5 49.2-76.5 25.4 0 50.4 25.4 52.7 77.7zm90.2-53.8c.3-9.9.8-26.5 23.1-26.5 11 0 15.9 4.5 20.8 9.4 6.5 7.2 9.1 10.2 15.9 10.2 9.4 0 15.6-7.6 15.6-16.3 0-17.8-20.5-21.9-39-21.9-24.7 0-48.9 6.5-60.2 13.3-8.3 4.9-9.9 9.4-9.9 22.7v158.4c0 6 2.3 6.5 7.6 6.5h19.3c4.5 0 6.5-.3 6.8-6.5V139.5z" fill="#4e595e"/>
                            </svg>
                        </div>
                    </div>
                    <div className='input-box'>
                        <div className='input-field'>
                            <input placeholder='Email' type='email' ref='username'/>
                            <label htmlFor='email'>E-mail do Usuário</label>
                        </div>
                        <a href="">Esqueceu sua senha?</a>
                        <div className='input-field'>
                            <input placeholder='Senha' type='password' ref='password'/>
                            <label htmlFor='email'>Senha</label> 
                        </div>
                    </div>

                    <button className='waves-effect waves-light button affirmative' type='submit'> <span>Entrar</span></button>
                </div>
                <div class="panel-footer">
                    <p>Não tem uma conta ainda?</p>
                    <a href="" class="button outline"><span>Comece Agora</span></a>
                </div>
                
            </form>
            <div className="login-background">
                <img src={loginbg} alt="" />
            </div>
        </div>
        );
    }
}

export default connect()(Login);