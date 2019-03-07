import Grid from '@material-ui/core/Grid';
import Hidden from '@material-ui/core/Hidden';
import IconButton from '@material-ui/core/IconButton';
import ListItem from '@material-ui/core/ListItem';
import Typography from '@material-ui/core/Typography';
import Avatar from 'components/Shared/Avatar';
import differenceInDays from 'date-fns/esm/differenceInDays';
import formatDistance from 'date-fns/esm/formatDistance';
import ptLocate from 'date-fns/esm/locale/pt-BR';
import { WithRouter } from 'decorators/withRouter';
import { WithStyles } from 'decorators/withStyles';
import { IStudent } from 'interfaces/models/student';
import ChevronRightIcon from 'mdi-react/ChevronRightIcon';
import React, { PureComponent } from 'react';

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
  },
  view: {
    margin: -15
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
      distance: student.last_used_at ? formatDistance(new Date(), student.last_used_at, { locale: ptLocate }) : 'Nunca',
      avatar: student.avatar || null,
    };
  }

  handleClick = () => {
    this.props.history.push(`alunos/${this.props.student.id}/detalhes`);
  }

  handleImageError = () => {
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
        id={`item-${(student.name).replace(/ /g, '')}`}
      >
        <Grid container alignItems='center' spacing={16}>
          <Hidden smDown>
            <Grid item sm={'auto'}>
              <Avatar src={avatar} text={student.name} />
            </Grid>
          </Hidden>
          <Grid item xs={12} sm={true}>
            <Typography variant='body1'>{student.name}</Typography>
            <Typography variant='body2'>{student.email}</Typography>
          </Grid>
          <Grid item xs={true} sm={'auto'} className={classes.lastAccess}>
            <Typography variant='caption'>Último acesso</Typography>
            <Typography variant='body1'>{distance}</Typography>
          </Grid>
          <Grid item xs={'auto'}>
            <IconButton className={classes.view}>
              <ChevronRightIcon />
            </IconButton>
          </Grid>
        </Grid>
      </ListItem>
    );
  }
}