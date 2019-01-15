import Grid from '@material-ui/core/Grid';
import ListItem from '@material-ui/core/ListItem';
import Typography from '@material-ui/core/Typography';
import format from 'date-fns/esm/format';
import { WithRouter } from 'decorators/withRouter';
import { WithStyles } from 'decorators/withStyles';
import { IStudentActivity } from 'interfaces/models/student';
import React, { PureComponent } from 'react';

interface IProps {
  classes?: any;
  activity: IStudentActivity;
}

@WithRouter()
@WithStyles(theme => ({
  root: {
    border: '1px solid',
    borderTop: 0,
    borderRadius: '0 0 2px 2px',
    color: '#8C9198',
    borderColor: theme.variables.contentBorderColor,
  },
}))
export default class CourseItem extends PureComponent<IProps> {
  render() {
    const { classes, activity } = this.props;

    return (
      <ListItem className={classes.root}>
        <Grid container spacing={40}>
          <Grid item sm={4} md={3} lg={2}>
            <Typography variant='subtitle2' color='inherit'>
              {format(activity.date, 'dd/MM/YYYY')} - {format(activity.date, 'HH:mm')}
            </Typography>
          </Grid>
          <Grid item sm={8} md={9} lg={10}>
            <Typography variant='subtitle2' color='inherit'>{activity.data.message}</Typography>
          </Grid>
        </Grid>
      </ListItem>
    );
  }
}