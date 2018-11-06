import { IAppRoute } from 'interfaces/route';
import React, { Fragment } from 'react';
import LessonFormPage from './Form';

export default class LessonIndexPage extends React.PureComponent {
  public static routes: IAppRoute[] = [{
    path: '/novo',
    component: LessonFormPage,
  }, {
    path: '/:id/editar',
    component: LessonFormPage,
  }];

  render() {
    return (
      <Fragment>
        {this.props.children}
      </Fragment>
    );
  }
}