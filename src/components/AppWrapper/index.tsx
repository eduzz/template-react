import { Drawer, Hidden } from '@material-ui/core';
import AppDrawer from 'components/Drawer';
import { WithStyles } from 'decorators/withStyles';
import { IAppRoute } from 'interfaces/route';
import React, { PureComponent } from 'react';

interface IState {
  drawerOpened: boolean;
}

interface IProps {
  routes: IAppRoute[];
  classes?: any;
}

export interface IDrawerContext {
  open(): void;
  close(): void;
}

export const DrawerContext = React.createContext<IDrawerContext>(null);
export const ScrollTopContext = React.createContext<Function>((() => { }));

@WithStyles(theme => ({
  root: {
    position: 'relative',
    display: 'flex',
    width: '100vw',
    height: '100vh'
  },
  drawer: {
    width: theme.variables.drawerWidth,
    borderRight: 'none !important',
    boxShadow: `${theme.variables.boxShadow} !important`,
    [theme.breakpoints.up('md')]: {
      width: theme.variables.drawerWidth,
      position: 'relative',
      height: '100vh'
    }
  },
  content: {
    backgroundColor: theme.palette.background.default,
    width: '100vw',
    height: '100vh',
    overflow: 'auto',
    padding: theme.variables.contentPadding,
    [theme.breakpoints.up('sm')]: {
      padding: theme.variables.contentPaddingUpSm,
    }
  }
}))
export default class AppWrapper extends PureComponent<IProps, IState> {
  mainContent: HTMLMainElement;
  drawerContext = {
    open: this.toogleDrawer.bind(this, true),
    close: this.toogleDrawer.bind(this, false)
  };

  constructor(props: IProps) {
    super(props);
    this.state = { drawerOpened: false };
  }

  scrollTop() {
    setTimeout(() => this.mainContent.scrollTo(0, 0), 100);
  }

  toogleDrawer(drawerOpened: boolean) {
    this.setState({ drawerOpened });
  }

  render() {
    const { drawerOpened } = this.state;
    const { children, routes, classes } = this.props;
    const items = <AppDrawer routes={routes} />;

    return (
      <div className={classes.root}>
        <DrawerContext.Provider value={this.drawerContext}>
          <Hidden mdUp implementation='css'>
            <Drawer
              variant='temporary'
              anchor='left'
              open={drawerOpened}
              classes={{ paper: classes.drawer }}
              onClose={this.drawerContext.close}
              ModalProps={{ keepMounted: true }}>
              {items}
            </Drawer>
          </Hidden>
          <Hidden smDown implementation='css'>
            <Drawer
              variant='permanent'
              open
              classes={{ paper: classes.drawer }}>
              {items}
            </Drawer>
          </Hidden>
          <ScrollTopContext.Provider value={this.scrollTop.bind(this)}>
            <main ref={ref => this.mainContent = ref} className={classes.content}>
              {children}
            </main>
          </ScrollTopContext.Provider>
        </DrawerContext.Provider>
      </div>
    );
  }
}