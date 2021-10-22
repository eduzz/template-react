import { memo, ReactNode, useCallback, useEffect, useMemo, useRef, useState } from 'react';

import CoreDrawer from '@mui/material/Drawer';
import Hidden from '@mui/material/Hidden';
import clsx from 'clsx';
import MoreIcon from 'mdi-react/MoreIcon';
import { useHistory } from 'react-router';

import styled, { IStyledProp, breakpoints } from '@eduzz/houston-ui/styles/styled';

import Content from './Content';
import { DrawerContext } from './context';

import useBreakpoint from '@/hooks/useBreakpoint';

export interface IMenu {
  path: string;
  icon?: typeof MoreIcon;
  display: string;
  action?: string;
  submenu?: IMenu[];
}

interface IProps extends IStyledProp {
  menu: IMenu[];
  children: ReactNode;
}

const Drawer: React.FC<IProps> = ({ menu, children, className }) => {
  const modalProps = useRef({ keepMounted: true }).current;
  const drawerClasses = useRef({ paper: `${className} drawer` }).current;
  const currentBreakpoint = useBreakpoint();

  const history = useHistory();

  const [drawerOpened, setDrawerOpened] = useState(false);
  const [drawerFull, setDrawerFull] = useState(localStorage.getItem('app-drawer-full') !== 'N');

  const navigate = useCallback(
    (url: string) => {
      history.push(url);
      setDrawerOpened(false);
    },
    [history]
  );

  const contextValue = useMemo(
    () => ({
      open: () => {
        currentBreakpoint === 'xs' || currentBreakpoint === 'sm' ? setDrawerOpened(true) : setDrawerFull(true);
      },
      close: () => {
        currentBreakpoint === 'xs' || currentBreakpoint === 'sm' ? setDrawerOpened(false) : setDrawerFull(false);
      },
      toogle: () => {
        currentBreakpoint === 'xs' || currentBreakpoint === 'sm'
          ? setDrawerOpened(!drawerOpened)
          : setDrawerFull(!drawerFull);
      },
      isFull: drawerFull,
      isTemporary: currentBreakpoint === 'xs' || currentBreakpoint === 'sm'
    }),
    [currentBreakpoint, drawerOpened, drawerFull]
  );

  useEffect(() => localStorage.setItem('app-drawer-full', drawerFull ? 'Y' : 'N'), [drawerFull]);

  const content = <Content menu={menu} navigate={navigate} />;
  console.log({ className });

  return (
    <DrawerContext.Provider value={contextValue}>
      <Hidden lgUp>
        <CoreDrawer
          variant='temporary'
          anchor='left'
          open={drawerOpened}
          classes={drawerClasses}
          onClose={contextValue.close}
          ModalProps={modalProps}
        >
          {content}
        </CoreDrawer>
      </Hidden>
      <Hidden mdDown>
        <CoreDrawer
          variant='permanent'
          className={clsx('drawer', className, { drawerFull: drawerFull, drawerMini: !drawerFull })}
          classes={{ paper: clsx(className, { drawerFull: drawerFull, drawerMini: !drawerFull }) }}
        >
          {content}
        </CoreDrawer>
      </Hidden>

      {children}
    </DrawerContext.Provider>
  );
};

export default styled(memo(Drawer))`
  &.drawer {
    width: ${({ theme }) => theme.variables.drawerWidthFull}px;
    border-right: none !important;
    box-shadow: ${({ theme }) => theme.variables.boxShadow} !important;

    ${breakpoints.up('md')} {
      width: ${({ theme }) => theme.variables.drawerWidthFull}px;
      position: relative;
      height: 100vh;
    }
  }

  &.drawerFull {
    width: ${({ theme }) => theme.variables.drawerWidthFull}px;
  }

  &.drawerMini {
    overflow-x: hidden;
    width: ${({ theme }) => theme.variables.drawerWidthMini}px;
  }
`;
