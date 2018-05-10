import { whiteTheme } from 'assets/theme';
import AppDrawer from 'components/Drawer';
import { IAppRoute } from 'interfaces/route';
import { AppBar, Drawer, Hidden, IconButton, MuiThemeProvider, Toolbar, Typography } from 'material-ui';
import MenuIcon from 'mdi-react/MenuIcon';
import React, { PureComponent } from 'react';

const styles = require('./index.css');

interface IState {
  drawerOpened: boolean;
}

interface IProps {
  routes: IAppRoute[];
}

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
    const { children, routes } = this.props;
    const items = <AppDrawer routes={routes} closeDrawer={this.toggleMenu.bind(this)} />;

    return (
      <div className={styles.component}>
        <Hidden mdUp>
          <Drawer
            variant='temporary'
            anchor='left'
            open={drawerOpened}
            classes={{ paper: styles.drawer }}
            onClose={this.toggleMenu.bind(this)}
            ModalProps={{ keepMounted: true }}>
            {items}
          </Drawer>
        </Hidden>
        <Hidden smDown implementation='css'>
          <Drawer
            variant='permanent'
            open
            classes={{ paper: styles.drawer }}>
            {items}
          </Drawer>
        </Hidden>
        <main className='content'>
          <MuiThemeProvider theme={whiteTheme}>
            <AppBar className='app-bar' elevation={1}>
              <Toolbar>
                <IconButton color='inherit'
                  onClick={this.toggleMenu.bind(this)}
                  className='icon-menu'>
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