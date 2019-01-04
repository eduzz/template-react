import { IAppRoute } from 'interfaces/route';
import React, { Fragment } from 'react';

import StudentListPage from './List';
import StudentPerfilPage from './Perfil';

export default class StudentsIndexPage extends React.PureComponent {
  public static routes: IAppRoute[] = [
    {
      path: '/',
      exact: true,
      component: StudentListPage,
    },
    {
      path: '/:id',
      exact: true,
      component: StudentPerfilPage,
    }
  ];

  render() {
    return (
      <Fragment>
        {this.props.children}
      </Fragment>
    );
  }
}