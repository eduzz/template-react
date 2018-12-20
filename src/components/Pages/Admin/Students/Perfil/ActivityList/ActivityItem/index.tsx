import React, { PureComponent } from 'react';
import ListItem from '@material-ui/core/ListItem';
import Grid from '@material-ui/core/Grid';
import { IStudentActivity } from 'interfaces/models/student';
import { WithStyles } from 'decorators/withStyles';
import Typography from '@material-ui/core/Typography';
import { WithRouter } from 'decorators/withRouter';
import format from 'date-fns/esm/format';

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
            <Typography variant='subtitle2' color='inherit' noWrap align='center'>{format(new Date(activity.created_at), 'dd/MM/YYYY')}</Typography>
            <Typography variant='subtitle2' color='inherit' noWrap align='center'>{format(new Date(activity.created_at), 'HH:mm')}</Typography>
          </Grid>
          <Grid item xs={true}>
            <Typography variant='subtitle2' color='inherit' noWrap>{activity.title}</Typography>
          </Grid>
        </Grid>
      </ListItem>
    );
  }
}