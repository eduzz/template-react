import { useCallback, useState } from 'react';

import { useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import SwipeableViews from 'react-swipeable-views';

import styled, { IStyledProp } from '@eduzz/houston-ui/styles/styled';

import LoginForm from './Form';
import LoginRecoveryAccess from './RecoveryAcces';

import logoWhite from '@/assets/images/logo-white.png';
import splashImage from '@/assets/images/splash.png';
import { selectorIsAuthenticated } from '@/store/selectors';

const LoginPage: React.FC<IStyledProp> = ({ className }) => {
  const [currentView, setCurrentView] = useState(0);

  const isAuthenticated = useSelector(selectorIsAuthenticated);
  const handleChangeView = useCallback((view: number) => () => setCurrentView(view), []);

  return (
    <div className={className}>
      <div className='container'>
        <div className='logo'>
          <img src={logoWhite} className='logoImage' alt='logo' />
        </div>

        {!isAuthenticated ? (
          <SwipeableViews index={currentView}>
            <div className='viewContainer'>
              <LoginForm onRecoveryAccess={handleChangeView(1)} />
            </div>
            <div className='viewContainer'>
              <LoginRecoveryAccess onCancel={handleChangeView(0)} onComplete={handleChangeView(0)} />
            </div>
          </SwipeableViews>
        ) : (
          <Redirect to='/' />
        )}
      </div>
    </div>
  );
};

export default styled(LoginPage)`
  min-height: 100vh;
  min-width: 100vw;
  position: relative;
  background: url(${splashImage}) no-repeat center;
  background-size: cover;

  & .container {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    margin: auto;
    width: 320px;
    height: 470px;
    max-width: calc(100% - 30px);
    color: white;
  }

  & .logo {
    text-align: center;
    margin-bottom: 20px;
  }

  & .logoImage {
    width: 220px;
    max-width: 100%;
    max-height: 120px;
  }

  & .viewContainer {
    box-sizing: border-box;
    padding: 0 10px;
    height: 325px;
  }
`;
