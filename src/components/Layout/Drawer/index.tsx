import CoreDrawer from '@material-ui/core/Drawer';
import Hidden from '@material-ui/core/Hidden';
import makeStyles from '@material-ui/core/styles/makeStyles';
import { enRoles } from 'interfaces/models/user';
import MoreIcon from 'mdi-react/MoreIcon';
import React, { Fragment, memo, Props, useCallback, useMemo, useRef, useState } from 'react';
import { RouteComponentProps, withRouter } from 'react-router';

import Content from './Content';
import { DrawerContext } from './context';

export interface IMenu {
  path: string;
  icon?: typeof MoreIcon;
  display: string;
  role?: enRoles;
  submenu?: IMenu[];
}

interface IProps extends RouteComponentProps<{}>, Props<{}> {
  menu: IMenu[];
}

const useStyle = makeStyles(theme => ({
  drawer: {
    width: theme.variables.drawerWidth,
    borderRight: 'none !important',
    boxShadow: `${theme.variables.boxShadow} !important`,
    [theme.breakpoints.up('md')]: {
      width: theme.variables.drawerWidth,
      position: 'relative',
      height: '100vh'
    }
  }
}));

const Drawer = memo(
  withRouter((props: IProps) => {
    const classes = useStyle(props);
    const modalProps = useRef({ keepMounted: true }).current;
    const drawerClasses = useRef({ paper: classes.drawer }).current;
    const [drawerOpened, setDrawerOpened] = useState(false);

    const navigate = useCallback(
      (url: string) => {
        props.history.push(url);
        setDrawerOpened(false);
      },
      [props.history]
    );

    const contextValue = useMemo(
      () => ({
        open: () => setDrawerOpened(true),
        close: () => setDrawerOpened(false)
      }),
      []
    );

    const content = <Content menu={props.menu} navigate={navigate} close={contextValue.close} />;

    return (
      <Fragment>
        <DrawerContext.Provider value={contextValue}>
          <Hidden mdUp implementation='css'>
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
          <Hidden smDown implementation='css'>
            <CoreDrawer variant='permanent' open classes={drawerClasses}>
              {content}
            </CoreDrawer>
          </Hidden>

          {props.children}
        </DrawerContext.Provider>
      </Fragment>
    );
  })
);

export default Drawer;
