import { memo, useContext, ReactNode } from 'react';

import AppBar from '@mui/material/AppBar';
import clsx from 'clsx';

import createUseStyles from '@eduzz/houston-ui/styles/createUseStyles';

import { DrawerContext } from './Drawer/context';

const useStyle = createUseStyles(theme => ({
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
    top: theme.variables.headerHeightUpSm,
    backgroundColor: theme.colors.grey['900'],
    color: 'white',
    boxShadow: '0px 2px 2px 0px rgba(0, 0, 0, 0.29)',
    width: '100%',
    // transition: theme.transitions.create('width', {
    //   easing: theme.transitions.easing.sharp,
    //   duration: theme.transitions.duration.leavingScreen
    // }),
    [theme.breakpoints.up('md')]: {
      backgroundColor: 'white',
      color: theme.colors.text.primary,
      width: `calc(100% - ${theme.variables.drawerWidthFull}px)`
    }
  },
  appBarDrawerMini: {
    width: `calc(100% - ${theme.variables.drawerWidthMini}px)`
  }
}));

const ToolbarTabs = memo((props: { children: ReactNode }) => {
  const context = useContext(DrawerContext);
  const classes = useStyle(props);

  return (
    <div className={classes.root}>
      <AppBar
        className={clsx({
          [classes.appBar]: true,
          [classes.appBarDrawerMini]: !context.isTemporary && !context.isFull
        })}
      >
        {props.children}
      </AppBar>
    </div>
  );
});

export default ToolbarTabs;
