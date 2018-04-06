import React, { Component } from 'react';
import PageGrid from 'components/PageGrid';

class Courses extends Component<any, any> {
  private layout: any;

  render() {
    this.layout = [
      {
        type: 'Carousel',
        size: {
          xs: 12
        }
      },
      {
        size: {
          xs: 2,
        }
      },
      {
        type: 'CoursesSearch',
        size: {
          xs: 8
        }
      },
      {
        size: {
          xs: 2,
        }
      },
      {
        type: 'CourseCardGrid',
        size: {
          xs: 12
        },
        props: {
          type: 'student',
        },
      }
    ];

    return (
      <section className='student-content'>
        <PageGrid layout={this.layout} />
      </section>
    );
  }
}

export default Courses;
