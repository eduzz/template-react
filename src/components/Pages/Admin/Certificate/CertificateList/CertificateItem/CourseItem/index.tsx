import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { WithStyles } from 'decorators/withStyles';
import { ICertificateCourse } from 'interfaces/models/certificate';
import TrashCanIcon from 'mdi-react/TrashCanIcon';
import React, { PureComponent, SyntheticEvent } from 'react';

interface IState {
}

interface IProps {
  classes?: any;
  course: ICertificateCourse;
  onDelete: (course: ICertificateCourse) => void;
}

@WithStyles(theme => ({
  root: {
    width: '100%',
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
  },
  secondaryHeading: {
    fontSize: theme.typography.pxToRem(15),
    color: theme.palette.text.secondary,
  },
  icon: {
    verticalAlign: 'bottom',
    height: 20,
    width: 20,
  },
  details: {
    display: 'block',
  },
  crtItem: {
    flexBasis: '100%',
    display: 'flex',
    alignItems: 'center',
    padding: '5px 10px',
    '&:hover': { backgroundColor: 'rgba(0,0,0,.02)', },
  },
  crtIcon: {
    flexBasis: '40px',
    display: 'flex',
    alignItems: 'center',
  },
  crtTitle: {
    flexBasis: 'calc(100% - 220px)',
    display: 'flex',
    alignItems: 'center',
    paddingLeft: '10px',
  },
  crtActions: {
    flexBasis: '180px',
    textAlign: 'right',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  crtDropdown: {
    flexBasis: '100px',
    textAlign: 'right',
  },
}))

export default class CourseItem extends PureComponent<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    console.log('aqui');
  }

  handleDelete = (e: SyntheticEvent) => {
    e.stopPropagation();
    this.props.onDelete(this.props.course);
  }

  render() {
    const { classes } = this.props;

    return (
      <div className={classes.crtItem}>
        <div className={classes.crtTitle}><Typography component='title'>{this.props.course.title}</Typography></div>
        <div className={classes.crtIcon} />
        <div className={classes.crtDropdown} />
        <div className={classes.crtActions}>
          <IconButton onClick={this.handleDelete}><TrashCanIcon /></IconButton>
        </div>
      </div>
    );
  }
}