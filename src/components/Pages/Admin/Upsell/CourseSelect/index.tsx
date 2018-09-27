import React from 'react';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import { WithStyles } from 'decorators/withStyles';
import IconButton from '@material-ui/core/IconButton';
import AddIcon from '@material-ui/icons/Add';
import upsellService from 'services/upsell';
import rxjsOperators from 'rxjs-operators';

interface IProps {
  classes?: any;
}

interface IState {
  courses: any;
  selectedCourse: string;
}

@WithStyles(theme => ({
  formControl: {
    margin: theme.spacing.unit,
    marginRight: 0,
    minWidth: 120,
    display: 'flex',
    flexDirection: 'row',
  },
  select: {
    width: 400,
  },
  button: {
    marginLeft: theme.spacing.unit,
  },
}))
export default class CourseSelect extends React.PureComponent<IProps, IState> {
  constructor(props: IProps) {
    super(props);

    this.state = {
      selectedCourse: '',
      courses: [],
    };
  }

  componentWillMount() {
    upsellService.getCourses().pipe(
      rxjsOperators.logError(),
      rxjsOperators.bindComponent(this),
    ).subscribe((courses: any) => {
      console.log(courses);
      this.setState({
        courses,
      });
    });
  }

  handleChange = (e: any) => {
    this.setState({
      selectedCourse: e.target.value,
    });
  }

  render() {
    const { classes } = this.props;
    const { courses, selectedCourse } = this.state;

    return (
      <FormControl className={classes.formControl}>
        <Select
          className={classes.select}
          value={selectedCourse}
          onChange={this.handleChange}
          displayEmpty
        >
          <MenuItem value=''>Selecione um Curso</MenuItem>
          {courses.map((course: any) =>
            <MenuItem
              key={course.id}
              value={course.id}
            >
              {course.title}
            </MenuItem>
          )}
        </Select>
        <IconButton color='secondary' className={classes.button}>
          <AddIcon />
        </IconButton>
      </FormControl>
    );
  }
}