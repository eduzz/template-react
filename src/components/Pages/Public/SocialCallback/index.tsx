import queryString from 'query-string';
import React, { PureComponent } from 'react';
import { Redirect, RouteComponentProps } from 'react-router-dom';
import rxjsOperators from 'rxjs-operators';
import tokenService from 'services/token';

export default class SocialCallbackPage extends PureComponent {
  constructor(props: RouteComponentProps<{ t: string }, {}>) {
    super(props);

    const token = queryString.parse(props.location.search).t;
    if (!token) return;

    tokenService.setToken(token).pipe(
      rxjsOperators.logError()
    ).subscribe();
  }

  render() {
    return (
      <Redirect to='/' />
    );
  }
}