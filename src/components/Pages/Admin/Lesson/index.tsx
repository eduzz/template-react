import { IAppRoute } from 'interfaces/route';
import React, { Fragment } from 'react';

import LessonFormPage from './Form';

export default class LessonIndexPage extends React.PureComponent {
  public static routes: IAppRoute[] = [{
    path: '/:moduleId/aulas/novo',
    component: LessonFormPage,
  }, {
    path: '/:moduleId/aulas/:lessonId/editar',
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