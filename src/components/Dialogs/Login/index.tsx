import Dialog from '@material-ui/core/Dialog';
import Slide from '@material-ui/core/Slide';
import logoWhite from 'assets/images/logo-white.png';
import { WithStyles } from 'decorators/withStyles';
import { PureComponent } from 'react';
import * as React from 'react';
import SwipeableViews from 'react-swipeable-views';
import * as RxOp from 'rxjs-operators';
import authService from 'services/auth';

import LoginDialogForm from './Form';
import LoginDialogRecoveryAccess from './RecoveryAcces';

interface IState {
  opened: boolean;
  currentView: number;
}

interface IProps {
  classes?: any;
}

@WithStyles(theme => ({
  root: {
    background: theme.palette.primary.main,
    minHeight: '100vh',
    minWidth: '100vw',
    position: 'relative'
  },
  container: {
    position: 'absolute',
    top: '0',
    left: '0',
    right: '0',
    bottom: '0',
    margin: 'auto',
    width: 320,
    height: 340,
    maxWidth: 'calc(100% - 30px)',
    color: 'white'
  },
  logo: {
    textAlign: 'center',
    marginBottom: 20
  },
  logoImage: {
    maxWidth: '100%',
    maxHeight: 120
  },
  viewContainer: {
    boxSizing: 'border-box',
    padding: '0 10px',
    height: 310
  }
}))
export default class LoginDialog extends PureComponent<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = { opened: false, currentView: 0 };
  }

  componentDidMount() {
    authService
      .shouldOpenLogin()
      .pipe(
        RxOp.logError(),
        RxOp.bindComponent(this)
      )
      .subscribe(opened => {
        this.setState({ opened });
      });
  }

  changeView = (view: number) => () => {
    this.setState({ currentView: view });
  };

  render() {
    const { opened, currentView } = this.state;
    const { classes } = this.props;

    return (
      <Dialog fullScreen disableBackdropClick disableEscapeKeyDown open={opened} TransitionComponent={Transition}>
        <div className={classes.root}>
          <div className={classes.container}>
            <div className={classes.logo}>
              <img src={logoWhite} className={classes.logoImage} alt='logo' />
            </div>

            <SwipeableViews index={currentView}>
              <div className={classes.viewContainer}>
                <LoginDialogForm onRecoveryAccess={this.changeView(1)} />
              </div>
              <div className={classes.viewContainer}>
                <LoginDialogRecoveryAccess onCancel={this.changeView(0)} onComplete={this.changeView(0)} />
              </div>
            </SwipeableViews>
          </div>
        </div>
      </Dialog>
    );
  }
}

function Transition(props: any) {
  return <Slide direction='up' {...props} />;
}
