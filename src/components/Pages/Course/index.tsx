import { IAppRoute } from 'interfaces/route';
import * as React from 'react';

import AuthorDialog from './AuthorDialog';
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
        <AuthorDialog />
        {this.props.children}
      </div>
    );
  }
}
