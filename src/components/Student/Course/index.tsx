import React, { Component } from 'react';
import PageGrid from 'components/PageGrid';

class Course extends Component<any, any> {
  constructor(props: any) {
    super(props);

    this.state = {
      layouts: {
        lg: [{
          type: 'CourseBanner',
          i: '0',
          w: 12,
          h: 40,
          x: 0,
          y: 0,
        }, {
          type: 'ModuleList',
          props: {
            courseID: 3231,
          },
          i: '1',
          w: 8,
          h: 27,
          x: 1,
          y: 40,
        }, {
          type: 'UpsellCard',
          i: '2',
          w: 2,
          h: 36,
          x: 9,
          y: 40,
        }]
      }
    };
  }

  render() {
    return (
      <section className='student-course-content'>
        <PageGrid layouts={this.state.layouts} />
      </section>
    );
  }
}

export default Course;
