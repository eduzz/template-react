import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Footer from 'components/Footer';
import NutrorLogo from 'components/NutrorLogo';
import SignIn from './signin';
import SignUp from './signup';

const styles = require('./styles.css');
const loginbg = require('assets/img/login-bg.jpg');

const producer = () => (
  <div className={styles.component}>
    <div className='login-form'>
      <div>
        <div className='card-panel'>
          <div className='default-logo'>
            <div className='nutror-logo'>
              <NutrorLogo />
            </div>
          </div>
        </div>

        <Switch>
          <Route exact path='/login' component={SignIn} />
          <Route exact path='/login/signup' component={SignUp} />
        </Switch>
      </div>
      <Footer />
    </div>

    <div className='login-background'>
      <img src={loginbg} alt='' />
    </div>
  </div>
);

export default producer;