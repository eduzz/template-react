import { memo, useCallback, useState } from 'react';

import makeStyles from '@material-ui/core/styles/makeStyles';
import logoWhite from 'assets/images/logo-white.png';
import splashImage from 'assets/images/splash.png';
import { useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import SwipeableViews from 'react-swipeable-views';
import { selectorIsAuthenticated } from 'store/selectors';

import LoginForm from './Form';
import LoginRecoveryAccess from './RecoveryAcces';

const useStyle = makeStyles({
  root: {
    minHeight: '100vh',
    minWidth: '100vw',
    position: 'relative',
    background: `url(${splashImage}) no-repeat center`,
    backgroundSize: 'cover'
  },
  container: {
    position: 'absolute',
    top: '0',
    left: '0',
    right: '0',
    bottom: '0',
    margin: 'auto',
    width: 320,
    height: 470,
    maxWidth: 'calc(100% - 30px)',
    color: 'white'
  },
  logo: {
    textAlign: 'center',
    marginBottom: 20
  },
  logoImage: {
    width: 220,
    maxWidth: '100%',
    maxHeight: 120
  },
  viewContainer: {
    boxSizing: 'border-box',
    padding: '0 10px',
    height: 325
  }
});

const LoginPage = memo((props: Record<string, never>) => {
  const classes = useStyle(props);
  const [currentView, setCurrentView] = useState(0);

  const isAuthenticated = useSelector(selectorIsAuthenticated);
  const handleChangeView = useCallback((view: number) => () => setCurrentView(view), []);

  return (
    <div className={classes.root}>
      <div className={classes.container}>
        <div className={classes.logo}>
          <img src={logoWhite} className={classes.logoImage} alt='logo' />
        </div>

        {!isAuthenticated ? (
          <SwipeableViews index={currentView}>
            <div className={classes.viewContainer}>
              <LoginForm onRecoveryAccess={handleChangeView(1)} />
            </div>
            <div className={classes.viewContainer}>
              <LoginRecoveryAccess onCancel={handleChangeView(0)} onComplete={handleChangeView(0)} />
            </div>
          </SwipeableViews>
        ) : (
          <Redirect to='/' />
        )}
      </div>
    </div>
  );
});

export default LoginPage;
