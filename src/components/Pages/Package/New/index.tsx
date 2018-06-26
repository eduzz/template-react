import React, { Fragment, PureComponent } from 'react';

interface IState {
}

interface IProps {
  classes?: any;
}

export default class PackageListPage extends PureComponent<IProps, IState> {
  constructor(props: any) {
    super(props);
  }
  render() {
    return (
      <Fragment>
        novo pacote
      </Fragment >
    );

  }
}