import List from '@material-ui/core/List';
import { darken } from '@material-ui/core/styles/colorManipulator';
import makeStyles from '@material-ui/core/styles/makeStyles';
import logoWhite from 'assets/images/logo-white.png';
import React, { memo, useCallback } from 'react';

import { IMenu } from '..';
import DrawerListItem from './ListItem';
import UserMenu from './UserMenu';

interface IProps {
  menu: IMenu[];
  navigate: (path: string) => void;
  close: () => void;
}

const useStyle = makeStyles(theme => ({
  root: {
    background: theme.palette.primary.main,
    color: theme.palette.primary.contrastText,
    height: '100vh'
  },
  header: {
    padding: '10px 0',
    textAlign: 'center',
    background: darken(theme.palette.primary.main, 0.15)
  },
  logo: {
    maxWidth: 170,
    maxHeight: 100,
    margin: '10px 0'
  },
  list: {
    padding: 0
  }
}));

const Content = memo((props: IProps) => {
  const classes = useStyle(props);
  const navigate = useCallback((menu: IMenu) => props.navigate(menu.path), [props]);

  return (
    <div className={classes.root}>
      <div className={classes.header}>
        <img src={logoWhite} className={classes.logo} alt='logo' />
        <UserMenu closeDrawer={props.close} />
      </div>

      <List className={classes.list}>
        {props.menu.map(item => (
          <DrawerListItem key={item.path} data={item} onClick={navigate} />
        ))}
      </List>
    </div>
  );
});

export default Content;
