import React, { PureComponent } from 'react';
import List from '@material-ui/core/List';
import { IStudent } from 'interfaces/models/student';
import StudentItem from './StudentItem';
import studentService from 'services/student';
import rxjsOperators from 'rxjs-operators';
import Loading from 'components/Shared/Loading';

interface IProps {

}

interface IState {
  students: IStudent[];
  error?: any;
}

export default class StudentList extends PureComponent<IProps, IState> {
  constructor(props: IProps) {
    super(props);

    this.state = {
      students: [],
    };
  }

  componentDidMount() {
    studentService.list(studentService.getFilters()).pipe(
      rxjsOperators.logError(),
      rxjsOperators.bindComponent(this),
    ).subscribe(students => {
      this.setState({
        students,
      });
    }, error => {
      this.setState({
        error,
      });
    });
  }

  render() {
    const { students } = this.state;

    if (!students.length)
      return <Loading />;

    return (
      <List disablePadding>
        {students.map((student, index) =>
          <StudentItem key={index} student={student} />
        )}
      </List>
    );
  }
}