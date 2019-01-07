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
    padding: theme.spacing.unit,
    paddingLeft: theme.spacing.unit * 4,
  },
}))
export default class CourseItem extends PureComponent<IProps> {
  render() {
    const { classes, activity } = this.props;

    return (
      <ListItem className={classes.root}>
        <Grid container alignItems='center' spacing={40}>
          <Grid item xs='auto'>
            <Typography variant='subtitle2' color='inherit' noWrap align='center'>{format(activity.date, 'dd/MM/YYYY')}</Typography>
            <Typography variant='subtitle2' color='inherit' noWrap align='center'>{format(activity.date, 'HH:mm')}</Typography>
          </Grid>
          <Grid item xs={true}>
            <Typography variant='subtitle2' color='inherit' noWrap>{activity.data.message}</Typography>
          </Grid>
        </Grid>
      </ListItem>
    );
  }
}