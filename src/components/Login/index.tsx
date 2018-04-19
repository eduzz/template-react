import React, { Component } from 'react';
import SignIn from './signin';

const styles = require('./styles.css');
const loginbg = require('assets/img/login-bg.jpg');

class Login extends Component {
  render() {
    return (
      <div className={styles.component}>
        <SignIn />
        <div className='login-background'>
          <img src={loginbg} alt='' />
        </div>
      </div>
    );
  }
}

export default Login;