import Dialog from '@material-ui/core/Dialog';
import Slide from '@material-ui/core/Slide';
import background from 'assets/images/background.jpg';
import logo from 'assets/svg/nutror-logo.svg';
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
    backgroundColor: theme.palette.primary.main,
    backgroundImage: `url(${background})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    minHeight: '100vh',
    minWidth: '100vw',
    height: '100vh',
    width: '100vw',
    position: 'relative'
  },
  container: {
    background: 'white',
    height: '100vh',
    width: '400px',
    maxWidth: '100vw',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    boxShadow: theme.shadows['5'],
  },
  logo: {
    padding: '0 26px',
    marginBottom: 20,
    textAlign: 'center',
  },
  logoImage: {
    width: 150,
    height: 150,
    objectFit: 'contain',
  },
  viewContainer: {
    boxSizing: 'border-box',
    padding: '0 10px',
  }
}))
export default class LoginDialog extends PureComponent<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = { opened: false, currentView: 0 };
  }

  componentDidMount() {
    authService.shouldOpenLogin().pipe(
      RxOp.logError(),
      RxOp.bindComponent(this)
    ).subscribe(opened => {
      this.setState({ opened });
    });
  }

  changeView = (view: number) => () => {
    this.setState({ currentView: view });
  }

  render() {
    const { opened, currentView } = this.state;
    const { classes } = this.props;

    return (
      <Dialog
        fullScreen
        disableBackdropClick
        disableEscapeKeyDown
        open={opened}
        TransitionComponent={Transition}
      >

        <div className={classes.root}>
          <div className={classes.container}>

            <div className={classes.logo}>
              <img src={logo} className={classes.logoImage} />
            </div>

            <SwipeableViews index={currentView}>
              <div className={classes.viewContainer}>
                <LoginDialogForm onRecoveryAccess={this.changeView(1)} />
              </div>
              <div className={classes.viewContainer}>
                <LoginDialogRecoveryAccess
                  onCancel={this.changeView(0)}
                  onComplete={this.changeView(0)}
                />
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