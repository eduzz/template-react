import { IAppRoute } from 'interfaces/route';
import { PureComponent } from 'react';

import PackageListPage from './List';

export default class StudentIndexPage extends PureComponent {
  public static routes: IAppRoute[] = [{
    path: '/',
    component: PackageListPage
  }];

  render() {
    return this.props.children;
  }
}