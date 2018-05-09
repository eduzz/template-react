import { whiteTheme } from 'assets/theme';
import AppDrawer from 'components/Drawer';
import { WithStyles } from 'decorators/withStyles';
import { IAppRoute } from 'interfaces/route';
import { AppBar, Drawer, Hidden, IconButton, MuiThemeProvider, Toolbar, Typography } from 'material-ui';
import MenuIcon from 'mdi-react/MenuIcon';
import React, { PureComponent } from 'react';

const drawerWidth = 240;

interface IState {
  drawerOpened: boolean;
}

interface IProps {
  routes: IAppRoute[];
  classes?: any;
}

@WithStyles(theme => ({
  appFrame: {
    position: 'relative',
    display: 'flex',
    width: '100vw',
    height: '100vh',
  },
  appBar: {
    position: 'absolute',
    marginLeft: drawerWidth,
    [theme.breakpoints.up('md')]: {
      width: `calc(100% - ${drawerWidth}px)`,
    }
  },
  iconMenu: {
    marginLeft: '-15px',
    marginRight: '10px',
    [theme.breakpoints.up('md')]: {
      display: 'none',
    }
  },
  drawer: {
    width: 250,
    borderRight: 'none',
    boxShadow: theme.shadows['5'],
    [theme.breakpoints.up('md')]: {
      width: drawerWidth,
      position: 'relative',
      height: '100vh',
    }
  },
  content: {
    backgroundColor: theme.palette.background.default,
    width: '100vw',
    padding: theme.spacing.unit * 3,
    height: 'calc(100vh - 56px)',
    overflow: 'auto',
    marginTop: 56,
    [theme.breakpoints.up('sm')]: {
      height: 'calc(100vh - 64px)',
      marginTop: 64,
    }
  },
}))
export default class AppWrapper extends PureComponent<IProps, IState> {
  constructor(props: any) {
    super(props);
    this.state = { drawerOpened: false };
  }

  toggleMenu() {
    this.setState({ drawerOpened: !this.state.drawerOpened });
  }

  render() {
    const { drawerOpened } = this.state;
    const { classes, children, routes } = this.props;
    const items = <AppDrawer routes={routes} closeDrawer={this.toggleMenu.bind(this)} />;

    return (
      <div className={classes.appFrame}>
        <Hidden mdUp>
          <Drawer
            variant='temporary'
            anchor='left'
            open={drawerOpened}
            classes={{ paper: classes.drawer }}
            onClose={this.toggleMenu.bind(this)}
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
        <main className={classes.content}>
          <MuiThemeProvider theme={whiteTheme}>
            <AppBar className={classes.appBar} elevation={1}>
              <Toolbar>
                <IconButton color='inherit'
                  onClick={this.toggleMenu.bind(this)}
                  className={classes.iconMenu}>
                  <MenuIcon />
                </IconButton>
                <Typography variant='title' color='inherit' noWrap>
                  App
            </Typography>
              </Toolbar>
            </AppBar>
          </MuiThemeProvider>
          {children}
        </main>
      </div>
    );
  }
}