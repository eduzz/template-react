import React from 'react';
import List from '@material-ui/core/List';
import { WithStyles } from 'decorators/withStyles';
import CourseItem from './CourseItem';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

interface IProps {
  classes?: any;
  onChange?: any;
  defaultValue?: any;
}

interface IState {
  open: boolean;
  courses: any;
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
export default class TreeView extends React.PureComponent<IProps, IState> {
  constructor(props: IProps) {
    super(props);

    this.state = {
      open: true,
      courses: this.props.defaultValue || [],
    };
  }

  pushCourse = (course: any) => {
    this.setState(state => ({
      courses: [
        ...state.courses,
        {
          ...course,
        },
      ],
    }));
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
          courses.map((course: any, index: number) =>
            <CourseItem
              key={index}
              title={course.title}
              modules={course.modules}
            />
          )
          :
          <ListItem>
            <ListItemText
              className={classes.noCourses}
              primary='Nenhum curso adicionado!'
            />
          </ListItem>
        }
      </List>
    );
  }
}