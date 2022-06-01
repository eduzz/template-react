import { memo, ReactNode } from 'react';

import AppBar from '@mui/material/AppBar';
import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
import CoreToolbar from '@mui/material/Toolbar';
import clsx from 'clsx';
import MenuIcon from 'mdi-react/MenuIcon';
import { useContextSelector } from 'use-context-selector';

import styled, { IStyledProp, breakpoints } from '@eduzz/houston-styles';
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
                <Typography size='sm' weight='semibold'>
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

export default styled(memo(Toolbar))`
  height: ${({ theme }) => theme.variables.headerHeight}px;
  margin-top: ${({ theme }) => theme.variables.contentPadding * -1}px;
  margin-bottom: ${({ theme }) => theme.variables.contentPadding}px;

  ${breakpoints.up('sm')} {
    margin-top: ${({ theme }) => theme.variables.contentPaddingUpSm * -1}px;
    margin-bottom: ${({ theme }) => theme.variables.contentPaddingUpSm}px;
  }

  & .appBar {
    background-color: ${({ theme }) => theme.neutralColor.low.pure};
    color: white;
    width: 100%;
    ${breakpoints.up('md')} {
      background-color: white;
      color: ${({ theme }) => theme.brandColor.primary.pure};
      width: ${({ theme }) => `calc(100% - ${theme.variables.drawerWidthFull}px)`};
    }
  }

  & .appBarDrawerMini {
    width: ${({ theme }) => `calc(100% - ${theme.variables.drawerWidthMini}px)`};
  }
`;
