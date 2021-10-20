import { memo, useCallback, useContext, ReactNode } from 'react';

import AppBar from '@mui/material/AppBar';
import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
import CoreToolbar from '@mui/material/Toolbar';
import clsx from 'clsx';
import MenuIcon from 'mdi-react/MenuIcon';

import createUseStyles from '@eduzz/houston-ui/styles/createUseStyles';
import Typography from '@eduzz/houston-ui/Typography';

import { DrawerContext } from './Drawer/context';
import UserMenu from './UserMenu';

interface IProps {
  title?: string;
  children?: ReactNode;
}

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
    backgroundColor: theme.colors.grey['900'],
    color: 'white',
    width: '100%',
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

const Toolbar = memo((props: IProps) => {
  const context = useContext(DrawerContext);
  const classes = useStyle(props);

  const openDrawer = useCallback(() => context.toogle(), [context]);

  return (
    <div className={classes.root}>
      <AppBar
        className={clsx({
          [classes.appBar]: true,
          [classes.appBarDrawerMini]: !context.isTemporary && !context.isFull
        })}
        color='default'
      >
        <CoreToolbar>
          <IconButton color='inherit' onClick={openDrawer}>
            <MenuIcon />
          </IconButton>
          {props.children}
          {!props.children && (
            <Grid container alignItems='center'>
              <Grid item xs={true}>
                <Typography size='medium' fontWeight='semibold'>
                  {props.title || 'App'}
                </Typography>
              </Grid>
              <Grid item xs={false}>
                <UserMenu />
              </Grid>
            </Grid>
          )}
        </CoreToolbar>
      </AppBar>
    </div>
  );
});

export default Toolbar;
