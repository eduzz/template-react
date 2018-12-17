import { IAppRoute } from 'interfaces/route';
import React, { Fragment } from 'react';

import LessonListPage from './List';

export default class StudentsIndexPage extends React.PureComponent {
  public static routes: IAppRoute[] = [{
    path: '/',
    component: LessonListPage,
  }];

  render() {
    return (
      <Fragment>
        {this.props.children}
      </Fragment>
    );
  }
}