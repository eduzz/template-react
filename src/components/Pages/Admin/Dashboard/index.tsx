import React, { PureComponent } from 'react';
import { Redirect } from 'react-router';

export default class DashboardIndexPage extends PureComponent {
  render() {
    return (
      <Redirect to='/certificados' />
    );
  }
}