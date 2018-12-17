import React, { PureComponent } from 'react';
import List from '@material-ui/core/List';
import { IStudent } from 'interfaces/models/student';
import StudentItem from './StudentItem';

interface IProps {

}

interface IState {
  students: IStudent[];
}

export default class StudentList extends PureComponent<IProps, IState> {
  constructor(props: IProps) {
    super(props);

    this.state = {
      students: [],
    };
  }

  componentDidMount() {
    this.setState({
      students: [
        {
          id: 1,
          name: 'Johnny Taylor',
          email: 'deanwallace@gmail.com',
          avatar: 'http://ddragon.leagueoflegends.com/cdn/6.24.1/img/profileicon/1112.png',
        },
        {
          id: 2,
          name: 'Maggie Butler',
          email: 'oliviaford@gmail.com',
          avatar: 'http://ddragon.leagueoflegends.com/cdn/6.24.1/img/profileicon/1112.png',
        },
        {
          id: 3,
          name: 'Earl Kennedy',
          email: 'earl@gmail.com',
          avatar: 'http://ddragon.leagueoflegends.com/cdn/6.24.1/img/profileicon/1112.png',
        },
      ],
    });
  }

  render() {
    const { students } = this.state;

    return (
      <List disablePadding>
        {students.map((student, index) =>
          <StudentItem key={index} student={student} />
        )}
      </List>
    );
  }
}