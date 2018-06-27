import { IAppRoute } from 'interfaces/route';
import { PureComponent } from 'react';

import PackageListPage from './List';
import PackageNewPage from './New';

export default class StudentIndexPage extends PureComponent {
  public static routes: IAppRoute[] = [{
    path: '/new',
    component: PackageNewPage
  },
  {
    path: '/',
    component: PackageListPage
  }];

  render() {
    return this.props.children;
  }
}