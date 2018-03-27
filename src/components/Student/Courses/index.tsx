import React, { Component } from 'react';
import PageGrid from 'components/PageGrid';

class Courses extends Component<any, any> {
  constructor(props: any) {
    super(props);

    this.state = {
      layouts: {
        lg: [{
          type: 'Carousel',
          i: '0',
          w: 12,
          h: 24,
          maxH: 24,
          minH: 24,
          x: 0,
          y: 0,
        }, {
          type: 'CoursesSearch',
          i: '1',
          w: 12,
          h: 7,
          maxH: 7,
          minH: 7,
          x: 1,
          y: 3,
        }, {
          type: 'CourseCardGrid',
          props: {
            options: {
              url: '/user/courses?page=1&size=9999',
            },
          },
          i: '2',
          w: 12,
          h: 160,
          x: 1,
          y: 5,
        }]
      }
    };
  }

  render() {
    return (
      <section className='student-content'>
        <PageGrid layouts={this.state.layouts} />
      </section>
    );
  }
}

export default Courses;
