import Divider from '@material-ui/core/Divider';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { WithStyles } from 'decorators/withStyles';
import { IUpsell } from 'interfaces/models/upsell';
import React, { Fragment } from 'react';

import CourseItem from './CourseItem';

interface IProps {
  classes?: any;
  courses: IUpsell['courses'];
  onChange: (courses: IUpsell['courses']) => void;
}

interface IState {
  open: boolean;
  courses: IUpsell['courses'];
}

@WithStyles(theme => ({
  root: {
    width: '100%',
    backgroundColor: theme.palette.background.paper,
  },
  nested: {
    paddingLeft: theme.spacing.unit * 4,
  },
  noCourses: {
    display: 'flex',
    justifyContent: 'center',
    padding: 0,
  },
}))
export default class TreeView extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = { open: true, courses: [] };
  }

  static getDerivedStateFromProps(props: IProps, state: IState) {
    if (props.courses.length > state.courses.length) {
      return { courses: props.courses, };
    }

    return null;
  }

  pushCourse = (course: IUpsell['courses'][0]) => {
    this.setState(state => ({
      courses: [
        ...state.courses,
        { ...course, }
      ],
    }));

    this.props.onChange(this.state.courses);
  }

  handleChange = (modifiedCourse: any) => {
    const { courses } = this.state;
    const state = {
      courses: courses.map((course: any) => (course.id === modifiedCourse.id ? modifiedCourse : course)),
    };

    this.setState(state);
    this.props.onChange(state.courses);
  }

  handleClick = () => {
    this.setState(state => ({ open: !state.open }));
  }

  render() {
    const { classes } = this.props;
    const { courses } = this.state;

    return (
      <List component='nav'>
        {courses.length ?
          courses.map((course, index) =>
            <Fragment key={index}>
              <CourseItem
                course={course}
                onChange={this.handleChange}
              />
              <Divider />
            </Fragment>
          )
          :
          <ListItem>
            <ListItemText
              className={classes.noCourses}
              primary='Nenhum curso adicionado'
            />
          </ListItem>
        }
      </List>
    );
  }
}