import React from 'react';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import { WithStyles } from 'decorators/withStyles';
import IconButton from '@material-ui/core/IconButton';
import AddIcon from '@material-ui/icons/Add';
import upsellService from 'services/upsell';
import rxjsOperators from 'rxjs-operators';
import Toast from 'components/Shared/Toast';
import CircularProgress from '@material-ui/core/CircularProgress';

interface IProps {
  classes?: any;
  onAdd?: any;
}

interface IState {
  courses: any;
  selectedCourseId: number;
  isFetching: boolean;
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
  progressContainer: {
    position: 'relative',
    width: 48,
    height: 48,
    marginLeft: 8,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  progress: {
    position: 'absolute',
  },
}))
export default class CourseSelect extends React.PureComponent<IProps, IState> {
  constructor(props: IProps) {
    super(props);

    this.state = {
      selectedCourseId: 0,
      courses: [],
      isFetching: false,
    };
  }

  componentWillMount() {
    upsellService.getCourses().pipe(
      rxjsOperators.logError(),
      rxjsOperators.bindComponent(this),
    ).subscribe((courses: any) => {
      this.setState({
        courses,
      });
    });
  }

  handleChange = (e: any) => {
    this.setState({
      selectedCourseId: e.target.value,
    });
  }

  handleClick = () => {
    this.setState({
      isFetching: true,
    });

    upsellService.getCourse(this.state.selectedCourseId).pipe(
      rxjsOperators.logError(),
      rxjsOperators.bindComponent(this),
    ).subscribe((course: any) => {
      this.props.onAdd && this.props.onAdd(course);
    }, (err: any) => {
      Toast.error('Erro ao adicionar curso!');
    }, () => {
      this.setState({
        isFetching: false,
        selectedCourseId: 0,
      });
    });
  }

  render() {
    const { classes } = this.props;
    const { courses, selectedCourseId, isFetching } = this.state;

    return (
      <FormControl className={classes.formControl}>
        <Select
          className={classes.select}
          value={selectedCourseId}
          onChange={this.handleChange}
          displayEmpty
        >
          <MenuItem value={0}>Selecione um Curso</MenuItem>
          {courses.map((course: any) =>
            <MenuItem
              key={course.id}
              value={course.id}
            >
              {course.title}
            </MenuItem>
          )}
        </Select>
        {!isFetching ?
          <IconButton
            className={classes.button}
            color='secondary'
            onClick={this.handleClick}
            disabled={selectedCourseId === 0}
          >
            <AddIcon />
          </IconButton>
          :
          <div className={classes.progressContainer}>
            <CircularProgress
              size={25}
              color='secondary'
              className={classes.progress}
            />
          </div>
        }
      </FormControl>
    );
  }
}