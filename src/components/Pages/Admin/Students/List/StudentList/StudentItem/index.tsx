import React, { PureComponent, SyntheticEvent } from 'react';
import ListItem from '@material-ui/core/ListItem';
import Grid from '@material-ui/core/Grid';
import { IStudent } from 'interfaces/models/student';
import { WithStyles } from 'decorators/withStyles';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import { differenceInDays } from 'date-fns/esm';

interface IProps {
  classes?: any;
  student: IStudent;
}

@WithStyles(theme => ({
  root: {
    border: '1px solid',
    borderRadius: 2,
    color: '#8C9198',
    borderColor: theme.variables.contentBorderColor,
    marginBottom: theme.spacing.unit,
    padding: theme.spacing.unit,
    paddingRight: theme.spacing.unit * 4,
    '&:before': {
      content: '""',
      width: 4,
      height: 'calc(100% + 2px)',
      backgroundColor: theme.variables.colors.disabled,
      position: 'absolute',
      left: -1,
      borderRadius: '2px 0 0 2px',
    },
  },
  active: {
    '&:before': {
      backgroundColor: theme.palette.secondary.light,
    },
  }
}))
export default class StudentItem extends PureComponent<IProps> {
  handleImageError = (e: SyntheticEvent<HTMLImageElement>) => {
    e.currentTarget.src = '';
  }

  render() {
    const { classes, student } = this.props;

    return (
      <ListItem className={`${classes.root} ${differenceInDays(new Date(), new Date(student.last_used_at)) <= 30 && classes.active}`} button>
        <Grid container alignItems='center' spacing={16}>
          <Grid item>
            <Avatar alt={student.name} src={student.avatar} onError={this.handleImageError}>{student.name.substring(0, 1)}</Avatar>
          </Grid>
          <Grid item xs={5}>
            <Typography variant='subtitle2' color='inherit'>{student.name}</Typography>
          </Grid>
          <Grid item xs={true}>
            <Typography variant='subtitle2' color='inherit'>{student.email}</Typography>
          </Grid>
          <Grid item xs={false}>
            <Typography variant='subtitle2' color='inherit'>2 horas atrás</Typography>
          </Grid>
        </Grid>
      </ListItem>
    );
  }
}