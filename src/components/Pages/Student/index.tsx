import { PureComponent } from 'react';
import StudentListPage from './List';
import { IAppRoute } from 'interfaces/route';

export default class StudentIndexPage extends PureComponent{
  public static routes: IAppRoute[] = [{
    path: '/',
    component: StudentListPage
  }];

  render(){
    return this.props.children;
  }
}