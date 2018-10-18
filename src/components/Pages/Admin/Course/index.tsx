import { IAppRoute } from 'interfaces/route';
import React, { Fragment } from 'react';
import CourseFormPage from './Form';

export default class CourseIndexPage extends React.PureComponent {
  public static routes: IAppRoute[] = [{
    path: '/novo',
    component: CourseFormPage,
  }, {
    path: '/:id/editar',
    component: CourseFormPage,
  }, {
    path: '/',
    component: CourseFormPage,
  }];

  render() {
    return (
      <Fragment>
        {this.props.children}
      </Fragment>
    );
  }
}