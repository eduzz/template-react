import React, { Fragment } from 'react';
import { WithStyles } from 'decorators/withStyles';
import Grid from '@material-ui/core/Grid';
import { IForm } from '../../..';
import CommentsOption from './CommentsOption';
import ProgressOption from './ProgressOption';
import WatchedOption from './WatchedOption';
import LayoutOption from './LayoutOption';
import TermsOption from './TermsOption';

interface IProps {
  classes?: any;
  form: IForm;
}

@WithStyles(theme => ({
  content: {
    display: 'flex',
  },
  optionControl: {
    marginTop: 8,
    marginRight: 32,
  },
}))
export default class Options extends React.PureComponent<IProps> {
  render() {
    const { classes, form } = this.props;

    return (
      <Fragment>
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
          <Grid item className={classes.optionControl}>
            <TermsOption form={form} />
          </Grid>
        </Grid>
      </Fragment>
    );
  }
}