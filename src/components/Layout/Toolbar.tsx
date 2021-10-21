import { memo, ReactNode } from 'react';

import AppBar from '@mui/material/AppBar';
import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
import CoreToolbar from '@mui/material/Toolbar';
import clsx from 'clsx';
import MenuIcon from 'mdi-react/MenuIcon';
import { useContextSelector } from 'use-context-selector';

import styled, { IStyledProp } from '@eduzz/houston-ui/styles/styled';
import Typography from '@eduzz/houston-ui/Typography';

import { DrawerContext } from './Drawer/context';
import UserMenu from './UserMenu';

interface IProps extends IStyledProp {
  title?: string;
  children?: ReactNode;
}

const Toolbar: React.FC<IProps> = ({ title, children, className }) => {
  const drawerMini = useContextSelector(DrawerContext, context => !context.isTemporary && !context.isFull);
  const toogleDrawer = useContextSelector(DrawerContext, context => context.toogle);

  return (
    <div className={className}>
      <AppBar className={clsx({ appBar: true, appBarDrawerMini: drawerMini })} color='default'>
        <CoreToolbar>
          <IconButton color='inherit' onClick={toogleDrawer}>
            <MenuIcon />
          </IconButton>
          {children}
          {!children && (
            <Grid container alignItems='center'>
              <Grid item xs={true}>
                <Typography size='medium' fontWeight='semibold'>
                  {title || 'App'}
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
};

export default styled(memo(Toolbar))(({ theme }) => ({
  height: theme.variables.headerHeight,
  marginTop: theme.variables.contentPadding * -1,
  marginBottom: theme.variables.contentPadding,
  [theme.breakpoints.up('sm')]: {
    marginTop: theme.variables.contentPaddingUpSm * -1,
    marginBottom: theme.variables.contentPaddingUpSm
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
