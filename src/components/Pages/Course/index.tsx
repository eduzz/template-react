import { IAppRoute } from 'interfaces/route';
import * as React from 'react';

import CourseFormPage from './Form';
import CourseListPage from './List';

export default class CourseIndexPage extends React.PureComponent {
  public static routes: IAppRoute[] = [{
    path: '/',
    exact: true,
    component: CourseListPage
  }, {
    path: '/new',
    component: CourseFormPage
  }];

  render() {
    return (
      <div>
        {this.props.children}
      </div>
    );
  }
}
