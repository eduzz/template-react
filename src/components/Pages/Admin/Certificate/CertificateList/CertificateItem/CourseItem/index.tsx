import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { WithStyles } from 'decorators/withStyles';
import CloseIcon from 'mdi-react/CloseIcon';
import React, { PureComponent } from 'react';

interface IState {
}

interface IProps {
  classes?: any;
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
    '&:hover': { backgroundColor: 'rgba(0,0,0,.02)', },
  },
  crtIcon: {
    flexBasis: '40px',
    display: 'flex',
    alignItems: 'center',
  },
  crtTitle: {
    flexBasis: 'calc(70% - 40px)',
    display: 'flex',
    alignItems: 'center',
    paddingLeft: '10px',
  },
  crtActions: {
    flexBasis: 'calc(30% - 100px)',
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
  }

  handleClick = (e: any) => {
    e.stopPropagation();
  }

  render() {
    const { classes } = this.props;

    return (
      <div className={classes.crtItem}>
        <div className={classes.crtTitle}><Typography component='title'>Título do certificado</Typography></div>
        <div className={classes.crtIcon} />
        <div className={classes.crtDropdown} />
        <div className={classes.crtActions}><IconButton onClick={this.handleClick} color='secondary'><CloseIcon /></IconButton></div>
      </div>
    );
  }
}