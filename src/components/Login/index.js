import React, { Component } from 'react';
import { connect } from 'react-redux';
import actions from 'actions';
import styles from './styles.css';

class Login extends Component {
    state = {};

    handleSubmit = e => {
        e.preventDefault();
        this.props.dispatch(actions.submitLogin(this.state.email, this.state.password));
    };

    handleChange = (key, value) => {
        this.setState({
            [key]: value,
        });
    };

    render() {
        return (
            <form className={styles.component} onSubmit={this.handleSubmit}>
                <div className='card-panel teal'>
                    <div className='input-box'>
                        <input placeholder='Email' type='email' onChange={event => this.handleChange('email', event.target.value)} />
                        <input placeholder='Senha' type='password' onChange={event => this.handleChange('password', event.target.value)} />
                    </div>

                    <button className='waves-effect waves-light btn' type='submit'> Entrar </button>
                </div>
            </form>
        );
    }
}

export default connect()(Login);
