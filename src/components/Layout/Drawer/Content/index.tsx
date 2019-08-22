import List from '@material-ui/core/List';
import { darken } from '@material-ui/core/styles/colorManipulator';
import logoWhite from 'assets/images/logo-white.png';
import { WithStyles } from 'decorators/withStyles';
import React, { PureComponent } from 'react';
import * as RxOp from 'rxjs-operators';
import authService from 'services/auth';

import { IMenu } from '..';
import DrawerListItem from './ListItem';
import UserMenu from './UserMenu';

interface IProps {
  menu: IMenu[];
  navigate: (path: string) => void;
  close: () => void;
  classes?: any;
}

@WithStyles(theme => ({
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
}))
export default class Content extends PureComponent<IProps, {}> {
  constructor(props: any) {
    super(props);
    this.state = { routes: [] };
  }

  componentDidMount() {
    authService
      .getUser()
      .pipe(
        RxOp.logError(),
        RxOp.bindComponent(this)
      )
      .subscribe(user => this.setState({ user }));
  }

  navigate = (menu: IMenu) => {
    this.props.navigate(menu.path);
  };

  render() {
    const { classes, close, menu } = this.props;

    return (
      <div className={classes.root}>
        <div className={classes.header}>
          <img src={logoWhite} className={classes.logo} alt='logo' />
          <UserMenu closeDrawer={close} />
        </div>

        <List className={classes.list}>
          {menu.map(item => (
            <DrawerListItem key={item.path} data={item} onClick={this.navigate} />
          ))}
        </List>
      </div>
    );
  }
}
