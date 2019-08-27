import AppBar from '@material-ui/core/AppBar';
import makeStyles from '@material-ui/core/styles/makeStyles';
import React, { memo, Props } from 'react';

const useStyle = makeStyles(theme => ({
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
      width: `calc(100% - ${theme.variables.drawerWidth}px)`,
      backgroundColor: 'white',
      color: theme.palette.text.primary
    }
  }
}));

const ToolbarTabs = memo((props: Props<{}>) => {
  const classes = useStyle(props);

  return (
    <div className={classes.root}>
      <AppBar className={classes.appBar}>{props.children}</AppBar>
    </div>
  );
});

export default ToolbarTabs;
