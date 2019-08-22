import AppBar from '@material-ui/core/AppBar';
import { WithStyles } from 'decorators/withStyles';
import React, { PureComponent } from 'react';

interface IProps {
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
    position: 'fixed',
    top: theme.variables.headerHeight,
    left: 0,
    boxShadow: '0px 2px 2px 0px rgba(0, 0, 0, 0.29)',
    [theme.breakpoints.up('md')]: {
      left: theme.variables.drawerWidth,
      top: theme.variables.headerHeightUpSm,
      width: `calc(100% - ${theme.variables.drawerWidth}px)`
    }
  }
}))
export class ToolbarTabs extends PureComponent<IProps> {
  render() {
    const { children, classes } = this.props;

    return (
      <div className={classes.root}>
        <AppBar className={classes.appBar} color='default'>
          {children}
        </AppBar>
      </div>
    );
  }
}
