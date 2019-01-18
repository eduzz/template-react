import AppBar from '@material-ui/core/AppBar';
import IconButton from '@material-ui/core/IconButton';
import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider';
import CoreToolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { whiteTheme } from 'assets/theme';
import { WithStyles } from 'decorators/withStyles';
import MenuIcon from 'mdi-react/MenuIcon';
import React, { PureComponent } from 'react';

import { DrawerContext, IDrawerContext } from '../Drawer/context';

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
    },
    backgroundColor: '#FFFFFF',
    boxShadow: '0 1px 2px 0 rgba(0,0,0,0.08)',
  },
  iconMenu: {
    marginLeft: '-15px',
    [theme.breakpoints.up('md')]: {
      display: 'none',
    }
  },
}))
export default class Toolbar extends PureComponent<IProps> {
  static contextType = DrawerContext;
  context: IDrawerContext;

  openDrawer = () => {
    this.context.open();
  }

  render() {
    const { children, title, classes } = this.props;

    return (
      <div className={classes.root}>
        <MuiThemeProvider theme={whiteTheme}>
          <AppBar className={classes.appBar}>
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
                <Typography variant='h6' color='inherit' noWrap>
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