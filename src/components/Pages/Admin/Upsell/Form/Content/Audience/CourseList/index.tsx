import React, { PureComponent } from 'react';
import List from '@material-ui/core/List';
import CourseItem from './CourseItem';
import { IUpsellCourse } from 'interfaces/models/upsell';
import upsellService from 'services/upsell';
import rxjsOperators from 'rxjs-operators';
import Toast from 'components/Shared/Toast';
import Loading from 'components/Shared/Loading';

interface IProps {

}

interface IState {
  courses: IUpsellCourse[];
}

export default class CourseList extends PureComponent<IProps, IState> {
  constructor(props: IProps) {
    super(props);

    this.state = {
      courses: null,
    };
  }

  componentDidMount() {
    upsellService.getCourses().pipe(
      rxjsOperators.bindComponent(this),
      rxjsOperators.logError(),
    ).subscribe(courses => {
      this.setState({
        courses,
      });
    }, error => {
      Toast.error(error);
    });
  }

  render() {
    const { courses } = this.state;

    if (!courses)
      return <Loading />;

    return (
      <List disablePadding>
        {courses.map((course, index) => (
          <CourseItem
            key={index}
            course={course}
          />
        ))
        }
      </List>
    );
  }
}