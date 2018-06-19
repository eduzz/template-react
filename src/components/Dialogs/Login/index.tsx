import { Dialog, Slide } from '@material-ui/core';
import { WithStyles } from 'decorators/withStyles';
import { PureComponent } from 'react';
import * as React from 'react';
import SwipeableViews from 'react-swipeable-views';
import { Subscription } from 'rxjs';
import * as rxjsOperators from 'rxjs-operators';
import { IBindableComponent } from 'rxjs-operators/bindComponent';
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
    width: '300px',
    height: '440px',
    maxWidth: 'calc(100% - 30px)',
    color: 'white'
  },
  logo: {
    textAlign: 'center'
  },
  logoImage: {
    maxWidth: 210,
    maxHeight: 120,
    marginBottom: 20
  },
  viewContainer: {
    boxSizing: 'border-box',
    padding: '0 10px',
    height: 310
  }
}))
export default class LoginDialog extends PureComponent<IProps, IState> implements IBindableComponent {
  subscriptions: Subscription[] = [];

  constructor(props: IProps) {
    super(props);
    this.state = { opened: false, currentView: 0 };
  }

  componentDidMount() {
    authService.shouldOpenLogin().pipe(
      rxjsOperators.logError(),
      rxjsOperators.bindComponent(this)
    ).subscribe(opened => {
      this.setState({ opened });
    });
  }

  componentWillUnmount() {
    this.subscriptions.forEach(s => s.unsubscribe());
  }

  changeView(view: number) {
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
        TransitionComponent={Transition}>

        <div className={classes.root}>
          <div className={classes.container}>

            <div className={classes.logo}>
              <img src={require('assets/images/logo-white.png')} className={classes.logoImage} />
            </div>

            <SwipeableViews index={currentView}>
              <div className={classes.viewContainer}>
                <LoginDialogForm onRecoveryAccess={this.changeView.bind(this, 1)} />
              </div>
              <div className={classes.viewContainer}>
                <LoginDialogRecoveryAccess
                  onCancel={this.changeView.bind(this, 0)}
                  onComplete={this.changeView.bind(this, 0)}
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