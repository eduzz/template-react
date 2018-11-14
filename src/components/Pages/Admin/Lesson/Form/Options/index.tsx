import React, { PureComponent, Fragment } from 'react';
import FreeLesson from './FreeLesson';
import HiddenLesson from './HiddenLesson';
import ReleaseAt from './ReleaseAt';
import LessonValidity from './LessonValidity';
import { IForm } from '..';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { WithStyles } from 'decorators/withStyles';
import LessonScheduling from './LessonScheduling';
import Author from 'components/Pages/Admin/Course/Form/Content/BasicInfo/Author';
import Divider from '@material-ui/core/Divider';

interface IProps {
  form: IForm;
  classes?: any;
}

@WithStyles(theme => ({
  title: {
    marginBottom: 8,
  },
  authorTitle: {
    fontSize: 14,
    fontWeight: 500,
    marginBottom: -8,
  },
  divider: {
    margin: '32px 0 24px 0',
  },
  container: {
    border: 'solid 1px #d5d5d5',
    borderRadius: 4,
    padding: theme.spacing.unit * 2,
    backgroundColor: '#fff',
  },
}))
export default class Options extends PureComponent<IProps> {
  render() {
    const { classes, form } = this.props;

    return (
      <Fragment>
        <Typography className={classes.title} variant='subtitle1' color='inherit' noWrap>Configurações</Typography>
        <div className={classes.container}>
          <Grid container spacing={16}>
            <Grid item>
              <FreeLesson form={form} />
            </Grid>
            <Grid item>
              <HiddenLesson form={form} />
            </Grid>
            <Grid item>
              <Author
                form={form as any}
                classes={{
                  title: classes.authorTitle,
                }}
              />
            </Grid>
          </Grid>
          <Divider className={classes.divider} />
          <Grid container spacing={16}>
            <Grid item>
              <LessonValidity form={form} />
            </Grid>
            <Grid item>
              <LessonScheduling form={form} />
            </Grid>
            <Grid item>
              <ReleaseAt form={form} />
            </Grid>
          </Grid>
        </div>
      </Fragment>
    );
  }
}