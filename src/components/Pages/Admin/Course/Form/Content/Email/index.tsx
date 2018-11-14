import React, { Fragment } from 'react';
import Divider from '@material-ui/core/Divider';
import { WithStyles } from 'decorators/withStyles';
import { IForm } from '../..';
import Typography from '@material-ui/core/Typography';

interface IProps {
  classes?: any;
  form: IForm;
}

@WithStyles(theme => ({
  divider: {
    margin: '32px 0 24px 0',
  }
}))
export default class Email extends React.PureComponent<IProps> {
  render() {
    const { classes } = this.props;

    return (
      <Fragment>
        <Typography variant='subtitle1' color='inherit' noWrap>Opções de Email</Typography>
        <Divider className={classes.divider} />
      </Fragment>
    );
  }
}