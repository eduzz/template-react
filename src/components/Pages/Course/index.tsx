import { IAppRoute } from 'interfaces/route';
import * as React from 'react';

import AuthorDialog from './AuthorDialog';
import CourseCreatePage from './Create';
import CourseEditPage from './Edit';
import CourseListPage from './List';

export default class CourseIndexPage extends React.PureComponent {
  public static routes: IAppRoute[] = [{
    path: '/',
    exact: true,
    component: CourseListPage
  }, {
    path: '/new',
    component: CourseCreatePage
  }, {
    path: '/:id/edit',
    component: CourseEditPage
  }];

  render() {
    return (
      <div>
        <AuthorDialog />
        {this.props.children}
      </div>
    );
  }
}
