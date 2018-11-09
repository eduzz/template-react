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
    this.state = { open: true };
  }

  pushCourse = (course: IUpsell['courses'][0]) => {
    this.props.onChange([
      ...this.props.courses,
      { ...course }
    ]);
  }

  handleChange = (modifiedCourse: IUpsell['courses'][0]) => {
    const { courses } = this.props;
    this.props.onChange(courses.map(course => (course.id === modifiedCourse.id ? modifiedCourse : course)));
  }

  handleClick = () => {
    this.setState(state => ({ open: !state.open }));
  }

  handleDelete = (course: IUpsell['courses'][0]) => {
    this.props.onChange(this.props.courses.filter(c => c.id !== course.id));
  }

  render() {
    const { classes, courses } = this.props;

    return (
      <List component='nav'>
        {courses.length ?
          courses.map(course =>
            <Fragment key={course.id}>
              <CourseItem
                course={course}
                onChange={this.handleChange}
                onDelete={this.handleDelete}
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