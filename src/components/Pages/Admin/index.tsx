import Drawer, { IMenu } from 'components/Layout/Drawer';
import { WithStyles } from 'decorators/withStyles';
import { getUrlV2 } from 'helpers/redirectV2';
import AccountGroupIcon from 'mdi-react/AccountGroupIcon';
import AlertCircleIcon from 'mdi-react/AlertCircleIcon';
import BullhornIcon from 'mdi-react/BullhornIcon';
import CartIcon from 'mdi-react/CartIcon';
import CertificateIcon from 'mdi-react/CertificateIcon';
import CommentMultipleIcon from 'mdi-react/CommentMultipleIcon';
import HelpCircleIcon from 'mdi-react/HelpCircleIcon';
import SettingsIcon from 'mdi-react/SettingsIcon';
import ViewDashboardIcon from 'mdi-react/ViewDashboardIcon';
// import WaterIcon from 'mdi-react/WaterIcon';
import React, { PureComponent } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';

import AuthorIndexPage from './Author';
import CategoriesIndexPage from './Categories';
import CertificateIndexPage from './Certificate';
import CourseIndexPage from './Course';
import DashboardIndexPage from './Dashboard';
import LessonIndexPage from './Lesson';
import StudentsIndexPage from './Students';
import UpsellIndexPage from './Upsell';

interface IProps {
  classes?: any;
}

export const ScrollTopContext = React.createContext<Function>((() => { }));

@WithStyles(theme => ({
  root: {
    position: 'relative',
    display: 'flex',
    width: '100vw',
    height: '100vh'
  },
  content: {
    backgroundColor: theme.palette.background.default,
    width: '100vw',
    height: '100vh',
    overflow: 'auto',
    padding: theme.variables.contentPadding,
    [theme.breakpoints.up('sm')]: {
      padding: theme.variables.contentPaddingUpSm,
    }
  }
}))
export default class AdminPage extends PureComponent<IProps, {}> {
  mainContent: React.RefObject<HTMLMainElement> = React.createRef();
  menu: IMenu[] = [
    { display: 'Venda Mais', icon: CartIcon, path: '/upsell', },
    { display: 'Cursos', icon: BullhornIcon, path: getUrlV2('/'), },
    { display: 'Pacotes', icon: ViewDashboardIcon, path: getUrlV2('/user/pacotes') },
    { display: 'Comentários', icon: CommentMultipleIcon, path: getUrlV2('/comentarios') },
    {
      display: 'Alunos',
      icon: AccountGroupIcon,
      submenu: [
        { display: 'Gerenciar', path: getUrlV2('/alunos') },
        { display: 'Histórico', path: '/alunos' }
      ]
    },
    // { display: 'Customização', icon: WaterIcon, path: getUrlV2('/user/customizacao') },
    { display: 'Controle de Acesso', icon: SettingsIcon, path: getUrlV2('/grupos') },
    { display: 'Certificados', icon: CertificateIcon, path: '/certificados' },
    { display: 'Novidades', icon: AlertCircleIcon, path: getUrlV2('/newzz') },
    { display: 'Ajuda', icon: HelpCircleIcon, path: getUrlV2('/ajuda') },
  ];

  scrollTop = () => {
    setTimeout(() => this.mainContent.current.scrollTo(0, 0), 100);
  }

  renderRedirect = () => <Redirect to='/' />;

  render() {
    const { classes } = this.props;

    return (
      <div className={classes.root}>
        <ScrollTopContext.Provider value={this.scrollTop}>
          <Drawer menu={this.menu}>
            <main ref={this.mainContent} className={classes.content}>
              <Switch>
                <Route path='/autores' component={AuthorIndexPage} />
                <Route path='/certificados' component={CertificateIndexPage} />
                <Route path='/upsell' component={UpsellIndexPage} />
                <Route path='/curso' component={CourseIndexPage} />
                <Route path='/modulos' component={LessonIndexPage} />
                <Route path='/categorias' component={CategoriesIndexPage} />
                <Route path='/alunos' component={StudentsIndexPage} />
                <Route path='/' component={DashboardIndexPage} />
                <Route render={this.renderRedirect} />
              </Switch>
            </main>
          </Drawer>
        </ScrollTopContext.Provider>
      </div>
    );
  }
}
