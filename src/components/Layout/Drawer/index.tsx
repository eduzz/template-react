import Divider from '@material-ui/core/Divider';
import Grid from '@material-ui/core/Grid';
import List from '@material-ui/core/List';
import { darken } from '@material-ui/core/styles/colorManipulator';
import logoWhite from 'assets/images/logo-white.png';
import AppRouter, { RouterContext } from 'components/Router';
import { WithStyles } from 'decorators/withStyles';
import { DeepReadonly } from 'helpers/immutable';
import { getUrlV2 } from 'helpers/redirectV2';
import { IAppRoute } from 'interfaces/route';
import { IUserToken } from 'interfaces/userToken';
import AccountGroupIcon from 'mdi-react/AccountGroupIcon';
import BullhornIcon from 'mdi-react/BullhornIcon';
import CommentMultipleIcon from 'mdi-react/CommentMultipleIcon';
import HelpBoxIcon from 'mdi-react/HelpBoxIcon';
import PowerStandbyIcon from 'mdi-react/PowerStandbyIcon';
import SettingsIcon from 'mdi-react/SettingsIcon';
import ViewDashboardIcon from 'mdi-react/ViewDashboardIcon';
import WaterIcon from 'mdi-react/WaterIcon';
import React, { PureComponent } from 'react';
import rxjsOperators from 'rxjs-operators';
import authService from 'services/auth';

import DrawerListItem from './ListItem';
import { IDrawerItem, routeParser } from './routeParser';
import AppDrawerUser from './UserMenu';

interface IState {
  user?: DeepReadonly<IUserToken>;
  items: IDrawerItem[];
  logoffItem: IDrawerItem;
}

interface IProps {
  routes: IAppRoute[];
  classes?: any;
  router?: AppRouter;
  drawer?: IDrawerContext;
}

export interface IDrawerContext {
  open(): void;
  close(): void;
}

export const DrawerContext = React.createContext<IDrawerContext>(null);

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
  gridList: {
    overflowY: 'auto',
    overflowX: 'hidden',
    width: 'max-content'
  },
  list: {
    padding: 0,
    width: theme.variables.drawerWidth
  },
  divider: {
    backgroundColor: '#ffffff36'
  }
}))
class AppDrawer extends PureComponent<IProps, IState> {

  constructor(props: any) {
    super(props);
    this.state = {
      items: [],
      logoffItem: { display: 'Sair', icon: PowerStandbyIcon }
    };
  }

  static getDerivedStateFromProps(props: IProps, currentState: IState): IState {
    return {
      ...currentState,
      items: [
        {
          display: 'Cursos', icon: BullhornIcon, route: { path: getUrlV2('/'), },
          children: [
            { display: 'Meus Cursos', route: { path: getUrlV2('/cursos') } },
            { display: 'Criar um curso', route: { path: getUrlV2('/cursos') } },
            { display: 'Duplicar um curso', route: { path: getUrlV2('/cursos') } },
            { display: 'Criar categoria', route: { path: getUrlV2('/cursos') } }
          ]
        },
        { display: 'Pacotes', icon: ViewDashboardIcon, route: { path: getUrlV2('/user/pacotes') } },
        { display: 'Comentários', icon: CommentMultipleIcon, route: { path: getUrlV2('/comentarios') } },
        { display: 'Alunos', icon: AccountGroupIcon, route: { path: getUrlV2('/alunos') } },
        { display: 'Customização', icon: WaterIcon, route: { path: getUrlV2('/user/customizacao') } },
        { display: 'Controle de Acesso', icon: SettingsIcon, route: { path: getUrlV2('/grupos') } },
        { display: 'Ajuda', icon: HelpBoxIcon, route: { path: getUrlV2('/ajuda') } },
        ...routeParser(props.routes),
      ]
    };
  }

  componentDidMount() {
    authService.getUser().pipe(
      rxjsOperators.logError(),
      rxjsOperators.bindComponent(this)
    ).subscribe(user => this.setState({ user }));
  }

  toRoute = ({ route }: IDrawerItem) => {
    this.props.drawer.close();

    if (route.path.startsWith('http')) {
      window.location.href = route.path;
      return;
    }

    this.props.router.navigate(route.path);
  }

  logoff = () => {
    authService.logout().pipe(
      rxjsOperators.logError(),
      rxjsOperators.bindComponent(this)
    ).subscribe();
  }

  render() {
    const { items, user, logoffItem } = this.state;
    const { classes } = this.props;

    return (
      <Grid container wrap='nowrap' direction='column' className={classes.root}>
        <Grid item xs={false} className={classes.header}>
          <img src={logoWhite} className={classes.logo} />
          <AppDrawerUser user={user} />
        </Grid>

        <Grid item xs={true} className={classes.gridList}>
          <List className={classes.list}>
            {items.map(route =>
              <DrawerListItem key={route.display} user={user} item={route} onClick={this.toRoute} />
            )}
          </List>
        </Grid>

        <Grid item xs={false}>
          <Divider className={classes.divider} />
          <DrawerListItem user={user} item={logoffItem} onClick={this.logoff} />
        </Grid>
      </Grid>
    );
  }
}

export default React.forwardRef((props: IProps, ref: any) => (
  <RouterContext.Consumer>
    {router =>
      <DrawerContext.Consumer>
        {drawer => <AppDrawer {...props} ref={ref} router={router} drawer={drawer} />}
      </DrawerContext.Consumer>
    }
  </RouterContext.Consumer>
));
