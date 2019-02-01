import List from '@material-ui/core/List';
import { darken } from '@material-ui/core/styles/colorManipulator';
import logoWhite from 'assets/images/logo-white.png';
import Toast from 'components/Shared/Toast';
import { WithStyles } from 'decorators/withStyles';
import ExitToAppIcon from 'mdi-react/ExitToAppIcon';
import EyeIcon from 'mdi-react/EyeIcon';
import React, { PureComponent } from 'react';
import * as RxOp from 'rxjs-operators';
import authService from 'services/auth';

import { IMenu } from '..';
import DrawerListItem from './ListItem';
import UserMenu from './UserMenu';

//import { REACT_APP_LEARNER } from 'settings';

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
  goToLearner: { backgroundColor: 'rgba(255,255,255,.2)', },
  list: {
    padding: 0,
    flexGrow: 1,
    display: 'flex',
    flexDirection: 'column',
    '& > div:nth-last-child(2)': { marginBottom: 46, },
    '& > div:first-child': { backgroundColor: 'rgba(255,255,255,.2)', },
    '& > div:last-child': {
      bottom: 0,
      position: 'absolute',
    }
  },
}))
export default class Content extends PureComponent<IProps, {}> {
  constructor(props: any) {
    super(props);
    this.state = { routes: [] };
  }

  componentDidMount() {
    authService.getUser().pipe(
      RxOp.logError(),
      RxOp.bindComponent(this)
    ).subscribe(user => this.setState({ user }));
  }

  navigate = (menu: IMenu) => {
    this.props.navigate(menu.path);
  }

  handleLogout = () => {
    authService.logout().pipe(
      RxOp.logError(),
      RxOp.bindComponent(this)
    ).subscribe(() => { }, err => Toast.error(err));
  }

  render() {
    const { classes, close, menu } = this.props;
    const goToLearner = {
      icon: EyeIcon,
      display: 'Visualizar como Aluno',
      path: 'www.google.com',
    };
    const logoff = {
      icon: ExitToAppIcon,
      display: 'Sair',
    };
    return (
      <div className={classes.root}>
        <div className={classes.header}>
          <img src={logoWhite} className={classes.logo} />
          <UserMenu closeDrawer={close} />
        </div>

        <List className={classes.list}>
          <DrawerListItem key='goToLearner' data={goToLearner} onClick={() => false} />
          {menu.map(item =>
            <DrawerListItem key={item.path || item.display} data={item} onClick={this.navigate} />
          )}
          <DrawerListItem key='logoff' data={logoff} onClick={() => this.handleLogout()} />
        </List>
      </div>
    );
  }
}