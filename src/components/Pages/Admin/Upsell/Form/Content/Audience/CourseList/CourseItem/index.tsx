import React, { PureComponent, SyntheticEvent } from 'react';
import ListItem from '@material-ui/core/ListItem';
import { WithStyles } from 'decorators/withStyles';
import Grid from '@material-ui/core/Grid';
import CheckCircleIcon from 'mdi-react/CheckCircleIcon';
import ChevronUpIcon from 'mdi-react/ChevronUpIcon';
import ChevronDownIcon from 'mdi-react/ChevronDownIcon';
import Typography from '@material-ui/core/Typography';
import Collapse from '@material-ui/core/Collapse';
import { IUpsellCourse } from 'interfaces/models/upsell';
import { CDN_URL } from 'settings';

const nutrorLogo = require('assets/svg/nutror-logo.svg');

interface IProps {
  classes?: any;
  course: IUpsellCourse;
}

interface IState {
  isOpen: boolean;
}

@WithStyles(theme => ({
  root: {
    border: '1px solid',
    borderColor: theme.variables.contentBorderColor,
    borderRadius: 4,
    padding: theme.spacing.unit,
    paddingLeft: 0,
    marginBottom: theme.spacing.unit,
    cursor: 'pointer',
  },
  avatar: {
    width: 62,
    height: 49,
    borderRadius: 2,
  },
  icon: {
    fill: theme.palette.text.primary,
  },
  price: {
    color: theme.palette.secondary.light,
  },
  title: {
    color: '#8C9198',
  },
  checkboxContainer: {
    padding: theme.spacing.unit,
    '&:before': {
      content: '""',
      width: 13,
      height: 13,
      position: 'absolute',
      backgroundColor: theme.palette.primary.contrastText,
      top: 5,
      left: 5,
    },
  },
  checkbox: {
    transition: 'all 0.3s ease',
    fill: '#D9D9D9',
  },
  selected: {
    fill: '#009358',
  },
}))
export default class CoruseItem extends PureComponent<IProps, IState> {
  constructor(props: IProps) {
    super(props);

    this.state = {
      isOpen: false,
    };
  }

  handleClick = () => {
    this.setState(state => ({
      isOpen: !state.isOpen,
    }));
  }

  handleImageError = (e: SyntheticEvent<HTMLImageElement>) => {
    e.currentTarget.src = nutrorLogo;
  }

  render() {
    const { classes, course } = this.props;
    const { isOpen } = this.state;

    return (
      <ListItem className={classes.root} onClick={this.handleClick}>
        <Grid container direction='column' wrap='nowrap'>
          <Grid item>
            <Grid container spacing={16} alignItems='center'>
              <Grid item>
                <Grid container alignItems='center'>
                  <Grid item className={classes.checkboxContainer}>
                    <Grid container>
                      <CheckCircleIcon
                        className={`${classes.checkbox}`}
                      />
                    </Grid>
                  </Grid>
                  <Grid item>
                    <Grid container>
                      <img
                        alt=''
                        className={classes.avatar}
                        src={(course.customizations && course.customizations.avatar) ? CDN_URL + course.customizations.avatar : nutrorLogo}
                        onError={this.handleImageError}
                      />
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>

              <Grid item xs={true} zeroMinWidth>
                <Typography variant='subtitle2' className={classes.title} noWrap>{course.title}</Typography>
              </Grid>

              <Grid item xs={false}>
                <Grid container>
                  {isOpen ? <ChevronUpIcon className={classes.icon} /> : <ChevronDownIcon className={classes.icon} />}
                </Grid>
              </Grid>
            </Grid>
          </Grid>
          <Grid item>
            <Collapse in={isOpen}>
              modules and lessons
            </Collapse>
          </Grid>
        </Grid>
      </ListItem>
    );
  }
}