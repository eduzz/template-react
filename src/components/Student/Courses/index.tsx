import React, { Component } from 'react';
import PageGrid from 'components/PageGrid';
import axios from 'axios';

class Courses extends Component<any, any> {
  constructor(props: any) {
    super(props);

    this.state = {
      components: [],
    };
  }

  async componentDidMount() {
    axios.get('https://nutror-mock-server.herokuapp.com/grid/courses').then(
      res => this.setState({ components: res.data })
    );
  }

  render() {
    return (
      <section className='student-content'>
        <PageGrid components={this.state.components} />
      </section>
    );
  }
}

export default Courses;
