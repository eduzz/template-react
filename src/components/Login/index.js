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
            <form className={styles.component} onSubmit={this.handleSubmit}>
                <div className='card-panel teal'>
                    <div className='input-box'>
                        <input placeholder='Email' type='email' ref='username'/>
                        <input placeholder='Senha' type='password' ref='password'/>
                    </div>

                    <button className='waves-effect waves-light btn' type='submit'> Entrar </button>
                </div>
            </form>
        );
    }
}

export default connect()(Login);
