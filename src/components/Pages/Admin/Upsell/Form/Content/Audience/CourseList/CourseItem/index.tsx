import Collapse from '@material-ui/core/Collapse';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Typography from '@material-ui/core/Typography';
import { WithStyles } from 'decorators/withStyles';
import { IUpsellCourse } from 'interfaces/models/upsell';
import CheckCircleIcon from 'mdi-react/CheckCircleIcon';
import ChevronDownIcon from 'mdi-react/ChevronDownIcon';
import ChevronUpIcon from 'mdi-react/ChevronUpIcon';
import React, { PureComponent, SyntheticEvent } from 'react';
import { BASEURL_V2 } from 'settings';
import { IUpsellFormContext, UpsellFormContext } from '../../../../Context';
import ModuleItem from './ModuleItem';

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
  checkboxPlaceholder: {
    width: theme.spacing.unit,
  },
  selected: {
    fill: '#009358',
  },
  disabled: {
    opacity: 0.5,
    cursor: 'not-allowed',
  },
}))
export default class CourseItem extends PureComponent<IProps, IState> {
  static contextType = UpsellFormContext;
  context: IUpsellFormContext;

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

  handleCourseSelect = (e: SyntheticEvent) => {
    e.stopPropagation();

    if (this.context.model.has_selected_courses)
      this.context.updateModel(model =>
        model.courses = model.courses.map(course => {
          if (course.id === this.props.course.id)
            return {
              ...course,
              course_page: !course.course_page,
            };
          return course;
        })
      )();
  }

  handleImageError = (e: SyntheticEvent<HTMLImageElement>) => {
    e.currentTarget.src = nutrorLogo;
  }

  render() {
    const { classes, course } = this.props;
    const { isOpen } = this.state;
    const { model } = this.context;

    return (
      <ListItem className={classes.root} onClick={model.has_selected_lessons && !!(course.modules || []).length ? this.handleClick : null}>
        <Grid container direction='column' wrap='nowrap'>
          <Grid item>
            <Grid container spacing={16} alignItems='center'>
              <Grid item>
                <Grid container alignItems='center'>
                  <Grid item className={classes.checkboxContainer}>
                    <Grid container>
                      <IconButton onClick={this.handleCourseSelect} disableRipple={!model.has_selected_courses}>
                        <CheckCircleIcon
                          className={`${classes.checkbox} ${model.has_selected_courses ? course.course_page && classes.selected : classes.disabled}`}
                        />
                      </IconButton>
                    </Grid>
                  </Grid>
                  <Grid item>
                    <Grid container>
                      <img
                        alt=''
                        className={classes.avatar}
                        src={(course.customizations && course.customizations.avatar) ? BASEURL_V2 + course.customizations.avatar : nutrorLogo}
                        onError={this.handleImageError}
                      />
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>

              <Grid item xs={true} zeroMinWidth>
                <Typography variant='subtitle2' className={classes.title} noWrap>{course.title}</Typography>
              </Grid>

              {model.has_selected_lessons && !!(course.modules || []).length &&
                <Grid item xs={false}>
                  <Grid container>
                    {isOpen ? <ChevronUpIcon className={classes.icon} /> : <ChevronDownIcon className={classes.icon} />}
                  </Grid>
                </Grid>
              }
            </Grid>
          </Grid>
          {model.has_selected_lessons && !!(course.modules || []).length &&
            <Grid item>
              <Collapse in={isOpen} unmountOnExit>
                <List>
                  {(course.modules || []).map((module, index) =>
                    <ModuleItem key={index} module={module} />
                  )}
                </List>
              </Collapse>
            </Grid>
          }
        </Grid>
      </ListItem>
    );
  }
}