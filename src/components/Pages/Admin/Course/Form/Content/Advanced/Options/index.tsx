import React, { Fragment } from 'react';
import { WithStyles } from 'decorators/withStyles';
import Grid from '@material-ui/core/Grid';
import { IForm } from '../../..';
import CommentsOption from './CommentsOption';
import ProgressOption from './ProgressOption';
import WatchedOption from './WatchedOption';
import LayoutOption from './LayoutOption';
import ReleaseAtOption from './ReleaseAtOption';
import DaysAvailableOption from './DaysAvailableOption';
import DurationOption from './DurationOption';
import CertificateOption from './CertificateOption';
import Divider from '@material-ui/core/Divider';

interface IProps {
  classes?: any;
  form: IForm;
}

@WithStyles(theme => ({
  title: {
    fontSize: 18,
    fontWeight: 500,
  },
  content: {
    display: 'flex',
  },
  optionControl: {
    marginTop: 16,
    marginRight: 16,
  },
  divider: {
    margin: '32px 0 24px 0',
  },
}))
export default class Options extends React.PureComponent<IProps> {
  render() {
    const { classes, form } = this.props;

    return (
      <Fragment>
        {/* <label className={classes.title}>
          Configurações
        </label> */}
        <Grid container className={classes.content}>
          <Grid item className={classes.optionControl}>
            <CommentsOption form={form} />
          </Grid>
          <Grid item className={classes.optionControl}>
            <ProgressOption form={form} />
          </Grid>
          <Grid item className={classes.optionControl}>
            <WatchedOption form={form} />
          </Grid>
          <Grid item className={classes.optionControl}>
            <LayoutOption form={form} />
          </Grid>
        </Grid>
        <Divider className={classes.divider} />
        <Grid container className={classes.content}>
          <Divider className={classes.divider} />
          <Grid item className={classes.optionControl}>
            <ReleaseAtOption form={form} />
          </Grid>
          <Grid item className={classes.optionControl}>
            <DaysAvailableOption form={form} />
          </Grid>
          <Grid item className={classes.optionControl}>
            <DurationOption form={form} />
          </Grid>
          <Grid item className={classes.optionControl}>
            <CertificateOption form={form} />
          </Grid>
        </Grid>
      </Fragment>
    );
  }
}