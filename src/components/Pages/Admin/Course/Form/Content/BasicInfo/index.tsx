import React, { Fragment } from 'react';
import Divider from '@material-ui/core/Divider';
import AccessType from './AccessType';
import Description from './Description';
import { WithStyles } from 'decorators/withStyles';
import Category from './Category';
import { IForm } from '../..';

interface IProps {
  classes?: any;
  form: IForm;
}

@WithStyles(theme => ({
  divider: {
    margin: '32px 0 24px 0',
  }
}))
export default class BasicInfo extends React.PureComponent<IProps> {
  render() {
    const { classes, form } = this.props;

    return (
      <Fragment>
        <Category form={form} />
        <Divider className={classes.divider} />
        <Description form={form} />
        <Divider className={classes.divider} />
        <AccessType form={form} />
        <Divider className={classes.divider} />
      </Fragment>
    );
  }
}