import React, { Component } from 'react';
import axios from 'axios';
import PageGrid from 'components/PageGrid';

class Course extends Component<any, any> {
  constructor(props: any) {
    super(props);

    this.state = {
      components: [],
    };
  }

  async componentDidMount() {
    axios.get('https://nutror-mock-server.herokuapp.com/grid/course').then(
      res => this.setState({ components: res.data })
    );
  }

  render() {
    return (
      <section className='student-course-content'>
        <PageGrid components={this.state.components} />
      </section>
    );
  }
}

export default Course;
