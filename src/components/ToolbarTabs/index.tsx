import { AppBar, MuiThemeProvider } from '@material-ui/core';
import { variables, whiteTheme } from 'assets/theme';
import { WithStyles } from 'decorators/withStyles';
import React, { PureComponent } from 'react';

interface IProps {
  classes?: any;
}

@WithStyles(theme => ({
  root: {
    height: variables.headerHeight,
    marginTop: variables.contentPadding * -1,
    marginBottom: variables.contentPadding,
    [theme.breakpoints.up('sm')]: {
      marginTop: variables.contentPaddingUpSm * -1,
      marginBottom: variables.contentPaddingUpSm
    }
  },
  appBar: {
    position: 'fixed',
    top: variables.headerHeight,
    left: 0,
    boxShadow: '0px 2px 2px 0px rgba(0, 0, 0, 0.29)',
    [theme.breakpoints.up('md')]: {
      left: variables.drawerWidth,
      top: variables.headerHeightUpSm,
      width: `calc(100% - ${variables.drawerWidth}px)`
    }
  }
}))
export class ToolbarTabs extends PureComponent<IProps> {
  render() {
    const { children, classes } = this.props;

    return (
      <div className={classes.root}>
        <MuiThemeProvider theme={whiteTheme}>
          <AppBar className={classes.appBar}>
            {children}
          </AppBar>
        </MuiThemeProvider>
      </div>
    );
  }
}