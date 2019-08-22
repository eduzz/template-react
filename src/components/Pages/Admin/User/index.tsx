import React, { PureComponent } from 'react';
import { Route, Switch } from 'react-router-dom';

import UserListPage from './List';

export default class UserIndexPage extends PureComponent {
  render() {
    return (
      <Switch>
        <Route path='/' component={UserListPage} />
      </Switch>
    );
  }
}
