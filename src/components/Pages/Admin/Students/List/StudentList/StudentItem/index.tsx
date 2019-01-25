import Avatar from '@material-ui/core/Avatar';
import Grid from '@material-ui/core/Grid';
import Hidden from '@material-ui/core/Hidden';
import ListItem from '@material-ui/core/ListItem';
import Typography from '@material-ui/core/Typography';
import differenceInDays from 'date-fns/esm/differenceInDays';
import formatDistance from 'date-fns/esm/formatDistance';
import ptLocate from 'date-fns/esm/locale/pt-BR';
import { WithRouter } from 'decorators/withRouter';
import { WithStyles } from 'decorators/withStyles';
import { IStudent } from 'interfaces/models/student';
import React, { PureComponent } from 'react';
import { CDN_URL } from 'settings';

interface IState {
  isActive: boolean;
  distance?: string;
  avatar?: string;
}

interface IProps {
  classes?: any;
  student: IStudent;
  history?: any;
}

@WithRouter()
@WithStyles(theme => ({
  root: {
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
  },
  lastAccess: {
    textAlign: 'right'
  }
}))
export default class StudentItem extends PureComponent<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = { isActive: false };
  }

  static getDerivedStateFromProps({ student }: IProps, state: IState) {
    return {
      ...state,
      isActive: differenceInDays(new Date(), student.last_used_at) <= 30,
      distance: formatDistance(new Date(), student.last_used_at, { locale: ptLocate }),
      avatar: student.avatar ? CDN_URL + student.avatar : null
    };
  }

  handleClick = () => {
    this.props.history.push(`alunos/${this.props.student.id}/detalhes`);
  }

  handleImageError = () => {
    console.log('olá');
    this.setState({ avatar: null });
  }

  render() {
    const { isActive, distance, avatar } = this.state;
    const { classes, student } = this.props;

    return (
      <ListItem
        className={`${classes.root} ${isActive ? classes.active : ''}`}
        button
        onClick={this.handleClick}
      >
        <Grid container alignItems='center' spacing={16}>
          <Hidden smDown>
            <Grid item sm={'auto'}>
              <Avatar src={avatar} onError={this.handleImageError}>
                {student.name.substring(0, 1)}
              </Avatar>
            </Grid>
          </Hidden>
          <Grid item xs={12} sm={true}>
            <Typography variant='body1'>{student.name}</Typography>
            <Typography variant='body2'>{student.email}</Typography>
          </Grid>
          <Grid item xs={12} sm={'auto'} className={classes.lastAccess}>
            <Typography variant='caption'>Último acesso</Typography>
            <Typography variant='body1'>{distance}</Typography>
          </Grid>
        </Grid>
      </ListItem>
    );
  }
}