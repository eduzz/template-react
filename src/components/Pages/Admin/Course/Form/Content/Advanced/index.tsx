import React, { Fragment } from 'react';
import Divider from '@material-ui/core/Divider';
import { WithStyles } from 'decorators/withStyles';
import Options from './Options';
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
        <Options form={form} />
        <Divider className={classes.divider} />
      </Fragment>
    );
  }
}