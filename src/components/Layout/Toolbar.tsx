import AppBar from '@material-ui/core/AppBar';
import IconButton from '@material-ui/core/IconButton';
import makeStyles from '@material-ui/core/styles/makeStyles';
import CoreToolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import MenuIcon from 'mdi-react/MenuIcon';
import React, { memo, Props, useCallback, useContext } from 'react';

import { DrawerContext } from './Drawer/context';

interface IProps extends Props<{}> {
  title?: string;
}

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
    marginLeft: theme.variables.drawerWidth,
    [theme.breakpoints.up('md')]: {
      width: `calc(100% - ${theme.variables.drawerWidth}px)`,
      backgroundColor: 'white',
      color: theme.palette.text.primary
    }
  },
  iconMenu: {
    marginLeft: '-15px',
    [theme.breakpoints.up('md')]: {
      display: 'none'
    }
  }
}));

const Toolbar = memo((props: IProps) => {
  const classes = useStyle(props);
  const context = useContext(DrawerContext);

  const openDrawer = useCallback(() => context.open(), [context]);

  return (
    <div className={classes.root}>
      <AppBar className={classes.appBar}>
        <CoreToolbar>
          <IconButton color='inherit' onClick={openDrawer} className={classes.iconMenu}>
            <MenuIcon />
          </IconButton>
          {props.children}
          {!props.children && (
            <Typography variant='h6' color='inherit' noWrap>
              {props.title || 'App'}
            </Typography>
          )}
        </CoreToolbar>
      </AppBar>
    </div>
  );
});

export default Toolbar;
