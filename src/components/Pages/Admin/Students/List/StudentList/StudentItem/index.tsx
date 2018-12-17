import React, { PureComponent } from 'react';
import ListItem from '@material-ui/core/ListItem';
import Grid from '@material-ui/core/Grid';
import { IStudent } from 'interfaces/models/student';
import { WithStyles } from 'decorators/withStyles';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';

interface IProps {
  classes?: any;
  student: IStudent;
}

@WithStyles(theme => ({
  root: {
    border: '1px solid',
    borderRadius: 4,
    borderColor: theme.variables.contentBorderColor,
    marginBottom: theme.spacing.unit,
    padding: theme.spacing.unit,
  },
}))
export default class StudentItem extends PureComponent<IProps> {
  render() {
    const { classes, student } = this.props;

    return (
      <ListItem className={classes.root}>
        <Grid container alignItems='center' spacing={16}>
          <Grid item>
            <Avatar alt={student.name} src={student.avatar} />
          </Grid>
          <Grid item>
            <Typography variant='subtitle1'>{student.name}</Typography>
          </Grid>
        </Grid>
      </ListItem>
    );
  }
}