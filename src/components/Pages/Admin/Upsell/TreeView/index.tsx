import React, { Fragment } from 'react';
import { WithStyles } from 'decorators/withStyles';

interface IProps {
  classes?: any;
  onChange?: any;
}

interface IState {

}

@WithStyles(theme => ({

}))
export default class TreeView extends React.PureComponent<IProps, IState> {
  constructor(props: IProps) {
    super(props);

    this.state = {};
  }

  render() {
    // const { classes } = this.props;

    return (
      <Fragment>
        TreeView
      </Fragment>
    );
  }
}