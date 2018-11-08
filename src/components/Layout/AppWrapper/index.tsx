import Drawer from '@material-ui/core/Drawer';
import Hidden from '@material-ui/core/Hidden';
import { WithStyles } from 'decorators/withStyles';
import { IAppRoute } from 'interfaces/route';
import React, { PureComponent } from 'react';

import AppDrawer, { DrawerContext, IDrawerContext } from '../Drawer';

interface IState {
  drawerOpened: boolean;
}

interface IProps {
  routes: IAppRoute[];
  classes?: any;
}

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
      height: '100vh',
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
  drawerContext: IDrawerContext;

  constructor(props: IProps) {
    super(props);
    this.drawerContext = {
      open: this.openDrawer,
      close: this.closeDrawer
    };

    this.state = { drawerOpened: false };
  }

  scrollTop = () => {
    setTimeout(() => this.mainContent.scrollTo(0, 0), 100);
  }

  openDrawer = () => {
    this.setState({ drawerOpened: true });
  }

  closeDrawer = () => {
    this.setState({ drawerOpened: false });
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
              ModalProps={{ keepMounted: true }}
            >
              {items}
            </Drawer>
          </Hidden>
          <Hidden smDown implementation='css'>
            <Drawer
              variant='permanent'
              open
              classes={{ paper: classes.drawer }}
            >
              {items}
            </Drawer>
          </Hidden>
          <ScrollTopContext.Provider value={this.scrollTop}>
            <main ref={ref => this.mainContent = ref} className={classes.content}>
              {children}
            </main>
          </ScrollTopContext.Provider>
        </DrawerContext.Provider>
      </div>
    );
  }
}