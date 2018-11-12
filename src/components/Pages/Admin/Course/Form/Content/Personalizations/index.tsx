import React, { Fragment } from 'react';
import Divider from '@material-ui/core/Divider';
import { WithStyles } from 'decorators/withStyles';
import { IForm } from '../..';
import Course from './Course';
import Login from './Login';

interface IProps {
  classes?: any;
  form: IForm;
}

@WithStyles(theme => ({
  divider: {
    margin: '32px 0 24px 0',
  },
}))
export default class Personalizations extends React.PureComponent<IProps> {
  render() {
    const { classes, form } = this.props;

    return (
      <Fragment>
        <Course form={form} />
        <Divider className={classes.divider} />
        <Login form={form} />
        <Divider className={classes.divider} />
      </Fragment>
    );
  }
}