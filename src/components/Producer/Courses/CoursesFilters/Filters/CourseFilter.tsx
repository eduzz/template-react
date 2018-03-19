import React, { Component } from 'react';
import Section from './Section';

class CourseFilter extends Component<any> {

  render() {
    return (
      <Section active={this.props.active} title='Curso'>
        <div className='input-field' />
      </Section>
    );
  }
}

export default CourseFilter;
