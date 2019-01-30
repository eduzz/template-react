import Card from '@material-ui/core/Card';
import Divider from '@material-ui/core/Divider';
import Toolbar from 'components/Layout/Toolbar';
import React, { Fragment, PureComponent } from 'react';

import Filters from './Filters';
import StudentList from './StudentList';

interface IProps {
  classes?: any;
}

export default class List extends PureComponent<IProps> {
  render() {
    return (
      <Fragment>
        <Toolbar title='Alunos' />

        <Card>
          <Filters />
          <Divider />

          <StudentList />
        </Card>
      </Fragment>
    );
  }
}