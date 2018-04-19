import React, { Component } from 'react';
import SignIn from './signin';
import Footer from 'components/Footer';
import NutrorLogo from 'components/NutrorLogo';

const styles = require('./styles.css');
const loginbg = require('assets/img/login-bg.jpg');

export default class Login extends Component {
  render() {
    return (
      <div className={styles.component}>
        <div className='login-form'>
          <div className='card-panel'>
            <div className='default-logo'>
              <div className='nutror-logo'>
                <NutrorLogo />
              </div>
            </div>
          </div>
          <SignIn />
          <Footer />
        </div>

        <div className='login-background'>
          <img src={loginbg} alt='' />
        </div>
      </div>
    );
  }
}