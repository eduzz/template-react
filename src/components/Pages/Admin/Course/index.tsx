import React from 'react';
import { Route, Switch } from 'react-router-dom';

import CourseFormPage from './Form';

export default class CourseIndexPage extends React.PureComponent {
  render() {
    return (
      <Switch>
        <Route path='*/novo' exact component={CourseFormPage} />
        <Route path='*/:id/editar' exact component={CourseFormPage} />
      </Switch>
    );
  }
}