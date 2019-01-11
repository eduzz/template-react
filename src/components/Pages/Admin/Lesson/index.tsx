import React from 'react';
import { Route, Switch } from 'react-router-dom';

import LessonFormPage from './Form';

export default class LessonIndexPage extends React.PureComponent {
  render() {
    return (
      <Switch>
        <Route path='*/:moduleId/aulas/novo' exact component={LessonFormPage} />
        <Route path='*/:moduleId/aulas/:lessonId/editar' exact component={LessonFormPage} />
      </Switch>
    );
  }
}