import React from 'react';
import { Route, Switch } from 'react-router-dom';

import StudentListPage from './List';
import StudentPerfilPage from './Perfil';

export default class StudentsIndexPage extends React.PureComponent {
  render() {
    return (
      <Switch>
        <Route path='*/:id/detalhes' exact component={StudentPerfilPage} />
        <Route path='*/' exact component={StudentListPage} />
      </Switch>
    );
  }
}