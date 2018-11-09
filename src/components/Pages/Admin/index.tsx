import AppWrapper from 'components/Layout/AppWrapper';
import { IAppRoute } from 'interfaces/route';
import AccountCircleIcon from 'mdi-react/AccountCircleIcon';
import BullhornIcon from 'mdi-react/BullhornIcon';
import CertificateIcon from 'mdi-react/CertificateIcon';
import * as React from 'react';
import rxjsOperators from 'rxjs-operators';
import authService from 'services/auth';

import AuthorIndexPage from './Author';
import CategoriesIndexPage from './Categories';
import CertificateIndexPage from './Certificate';
import CourseIndexPage from './Course';
import DashboardIndexPage from './Dashboard';
import LessonIndexPage from './Lesson';
import UpsellIndexPage from './Upsell';

interface IState {
  routes: IAppRoute[];
}

export default class AdminModule extends React.PureComponent<{}, IState>  {
  static routes: IAppRoute[] = [
    {
      path: '/',
      // sideDrawer: { display: 'Dashboard', order: 0, icon: ViewDashboardIcon },
      exact: true,
      roles: [],
      component: DashboardIndexPage
    },
    {
      path: '/autores',
      sideDrawer: { display: 'Autores', order: 1, icon: AccountCircleIcon },
      roles: [],
      component: AuthorIndexPage
    },
    {
      path: '/certificados',
      sideDrawer: { display: 'Certificados', order: 1, icon: CertificateIcon },
      roles: [],
      component: CertificateIndexPage
    },
    {
      path: '/upsell',
      sideDrawer: { display: 'Venda Mais', order: 2, icon: BullhornIcon },
      roles: [],
      component: UpsellIndexPage,
    },
    {
      path: '/curso',
      // sideDrawer: { display: 'Curso', order: 2, icon: BullhornIcon },
      roles: [],
      component: CourseIndexPage,
    },
    {
      path: '/aula',
      // sideDrawer: { display: 'Aula', order: 3, icon: AnimationPlayIcon },
      roles: [],
      component: LessonIndexPage,
    },
    {
      path: '/categorias',
      // sideDrawer: { display: 'Categorias', order: 4, icon: TagTextOutlineIcon },
      roles: [],
      component: CategoriesIndexPage,
    },
  ];

  constructor(props: {}) {
    super(props);
    this.state = { routes: [] };
  }

  componentDidMount() {
    authService.getUser().pipe(
      rxjsOperators.logError(),
      rxjsOperators.bindComponent(this)
    ).subscribe(user => {
      if (!user) {
        this.setState({ routes: [] });
        return;
      }

      this.setState({
        routes: AdminModule.routes.filter(route => user.canAccess(...route.roles))
      });
    });
  }

  render() {
    const { routes } = this.state;

    return (
      <AppWrapper routes={routes}>
        {this.props.children}
      </AppWrapper>
    );
  }
}
