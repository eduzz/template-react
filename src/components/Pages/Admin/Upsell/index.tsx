import React, { PureComponent } from 'react';
import { Route, Switch } from 'react-router-dom';

import UpsellFormPage from './Form';
import UpsellListPage from './List';

export default class UpsellIndexPage extends PureComponent {
  render() {
    return (
      <Switch>
        <Route path='*/novo' exact component={UpsellFormPage} />
        <Route path='*/:id/editar' exact component={UpsellFormPage} />
        <Route path='*/:success?' exact component={UpsellListPage} />
      </Switch>
    );
  }
}