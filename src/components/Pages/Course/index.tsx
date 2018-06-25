import { IAppRoute } from 'interfaces/route';
import { PureComponent } from 'react';

import CourseCreatePage from './Create';
import CourseEditPage from './Edit';
import CourseListPage from './List';

export default class CourseIndexPage extends PureComponent {
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
    return this.props.children;
  }
}
