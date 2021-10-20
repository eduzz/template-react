import { memo, useCallback } from 'react';

import List from '@mui/material/List';

import createUseStyles from '@eduzz/houston-ui/styles/createUseStyles';

import { IMenu } from '..';
import DrawerListItem from './ListItem';

import logoWhite from '@/assets/images/logo-white.png';

interface IProps {
  menu: IMenu[];
  navigate: (path: string) => void;
  close: () => void;
}

const useStyle = createUseStyles(theme => ({
  root: {
    background: theme.colors.grey['900'],
    color: theme.colors.primary.contrastText,
    height: '100vh'
  },
  header: {
    padding: '10px 0',
    textAlign: 'center'
  },
  headerLogo: {
    minHeight: theme.variables.headerHeight - 11
  },
  logo: {
    maxWidth: 'calc(100% - 10px)',
    width: 150,
    maxHeight: 100
  },
  list: {
    padding: 0
  },
  name: {
    fontFamily: 'Montserrat, sans-serif',
    fontWeight: 600,
    color: 'white',
    marginBottom: 15
  }
}));

const Content = memo((props: IProps) => {
  const classes = useStyle(props);
  const navigate = useCallback((menu: IMenu) => props.navigate(menu.path), [props]);

  return (
    <div className={classes.root}>
      <div className={classes.header}>
        <div className={classes.headerLogo}>
          <img src={logoWhite} className={classes.logo} alt='logo' />
        </div>
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
