import { memo, ReactNode, useCallback, useEffect, useMemo, useRef, useState } from 'react';

import CoreDrawer from '@mui/material/Drawer';
import Hidden from '@mui/material/Hidden';
import clsx from 'clsx';
import MoreIcon from 'mdi-react/MoreIcon';
import { RouteComponentProps, withRouter } from 'react-router';

import createUseStyles from '@eduzz/houston-ui/styles/createUseStyles';

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

interface IProps extends RouteComponentProps<Record<string, never>> {
  menu: IMenu[];
  children: ReactNode;
}

const useStyle = createUseStyles(theme => ({
  drawer: {
    width: theme.variables.drawerWidthFull,
    borderRight: 'none !important',
    boxShadow: `${theme.variables.boxShadow} !important`,
    [theme.breakpoints.up('md')]: {
      width: theme.variables.drawerWidthFull,
      position: 'relative',
      height: '100vh'
    }
  },
  drawerFull: {
    width: theme.variables.drawerWidthFull
  },
  drawerMini: {
    overflowX: 'hidden',
    width: theme.variables.drawerWidthMini
  }
}));

const Drawer = memo((props: IProps) => {
  const classes = useStyle(props);
  const modalProps = useRef({ keepMounted: true }).current;
  const drawerClasses = useRef({ paper: classes.drawer }).current;
  const currentBreakpoint = useBreakpoint();

  const [drawerOpened, setDrawerOpened] = useState(false);
  const [drawerFull, setDrawerFull] = useState(localStorage.getItem('app-drawer-full') !== 'N');

  const navigate = useCallback(
    (url: string) => {
      props.history.push(url);
      setDrawerOpened(false);
    },
    [props.history]
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

  const content = <Content menu={props.menu} navigate={navigate} close={contextValue.close} />;

  return (
    <>
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
            className={clsx(classes.drawer, {
              [classes.drawerFull]: drawerFull,
              [classes.drawerMini]: !drawerFull
            })}
            classes={{
              paper: clsx({
                [classes.drawerFull]: drawerFull,
                [classes.drawerMini]: !drawerFull
              })
            }}
          >
            {content}
          </CoreDrawer>
        </Hidden>

        {props.children}
      </DrawerContext.Provider>
    </>
  );
});

export default withRouter(Drawer);
