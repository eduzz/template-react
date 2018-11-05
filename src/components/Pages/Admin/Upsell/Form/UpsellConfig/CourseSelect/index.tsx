import CircularProgress from '@material-ui/core/CircularProgress';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import AddIcon from '@material-ui/icons/Add';
import { FieldSelect } from '@react-form-fields/material-ui';
import Toast from 'components/Shared/Toast';
import { IUpsellCourse } from 'interfaces/models/upsell';
import React from 'react';
import rxjsOperators from 'rxjs-operators';
import upsellService from 'services/upsell';

interface IProps {
  classes?: any;
  onAdd: (course: IUpsellCourse) => void;
}

interface IState {
  courses: { value: number, label: string }[];
  current?: number;
  loading: boolean;
}

export default class CourseSelect extends React.PureComponent<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = { courses: [], loading: false };
  }

  componentDidMount() {
    upsellService.getCourses().pipe(
      rxjsOperators.logError(),
      rxjsOperators.loader(),
      rxjsOperators.bindComponent(this),
    ).subscribe(courses => {
      this.setState({ courses: courses.map(c => ({ value: c.id, label: c.title })) });
    });
  }

  handleChange = (current: number) => {
    this.setState({ current });
  }

  handleClick = () => {
    this.setState({ loading: true });

    upsellService.getCourse(this.state.current).pipe(
      rxjsOperators.logError(),
      rxjsOperators.bindComponent(this),
    ).subscribe(course => {
      this.setState({ loading: false, current: null });
      this.props.onAdd(course);
    }, err => {
      this.setState({ loading: false });
      Toast.error(err);
    });
  }

  render() {
    const { courses, current, loading } = this.state;

    return (
      <Grid container spacing={16} alignItems='flex-end'>
        <Grid item xs={true} sm={6}>
          <FieldSelect
            value={current}
            label='Onde você quer aplicar?'
            margin='none'
            onChange={this.handleChange}
            options={courses}
          />
        </Grid>

        <Grid item xs={false}>
          {!loading ?
            <IconButton color='secondary' onClick={this.handleClick} disabled={!current} >
              <AddIcon />
            </IconButton>
            :
            <CircularProgress size={25} color='secondary' />
          }
        </Grid>

      </Grid>
    );
  }
}