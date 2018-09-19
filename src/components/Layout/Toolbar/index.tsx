import AppBar from '@material-ui/core/AppBar';
import IconButton from '@material-ui/core/IconButton';
import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider';
import CoreToolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { whiteTheme } from 'assets/theme';
import { WithStyles } from 'decorators/withStyles';
import MenuIcon from 'mdi-react/MenuIcon';
import React, { PureComponent } from 'react';

import { DrawerContext, IDrawerContext } from '../Drawer';

interface IProps {
  title?: string;
  classes?: any;
}

@WithStyles(theme => ({
  root: {
    height: theme.variables.headerHeight,
    marginTop: theme.variables.contentPadding * -1,
    marginBottom: theme.variables.contentPadding,
    [theme.breakpoints.up('sm')]: {
      marginTop: theme.variables.contentPaddingUpSm * -1,
      marginBottom: theme.variables.contentPaddingUpSm
    }
  },
  appBar: {
    marginLeft: theme.variables.drawerWidth,
    [theme.breakpoints.up('md')]: {
      width: `calc(100% - ${theme.variables.drawerWidth}px)`
    }
  },
  iconMenu: {
    marginLeft: '-15px',
    [theme.breakpoints.up('md')]: {
      display: 'none',
    }
  },
}))
export default class Toolbar extends PureComponent<IProps> {
  drawer: IDrawerContext;

  openDrawer = () => {
    this.drawer.open();
  }

  render() {
    const { children, title, classes } = this.props;

    return (
      <div className={classes.root}>
        <DrawerContext.Consumer>
          {drawer => (this.drawer = drawer) && null}
        </DrawerContext.Consumer>

        <MuiThemeProvider theme={whiteTheme}>
          <AppBar className={classes.appBar} elevation={1}>
            <CoreToolbar>
              <IconButton
                color='inherit'
                onClick={this.openDrawer}
                className={classes.iconMenu}
              >
                <MenuIcon />
              </IconButton>
              {children}
              {!children &&
                <Typography variant='title' color='inherit' noWrap>
                  {title || 'App'}
                </Typography>
              }
            </CoreToolbar>
          </AppBar>
        </MuiThemeProvider>
      </div>
    );
  }
}