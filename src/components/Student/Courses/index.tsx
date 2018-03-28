import React, { Component } from 'react';
import { connect } from 'react-redux';
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
        <PageGrid
          layouts={JSON.parse(localStorage.getItem('coursesLayouts')) || this.state.layouts}
          onChangeLayout={(layouts: any) => localStorage.setItem('coursesLayouts', JSON.stringify(layouts))}
          isDraggable={this.props.pageGrid.enabled}
          isResizable={this.props.pageGrid.enabled}
        />
      </section>
    );
  }
}

const mapStateToProps = (state: any) => ({
  pageGrid: state.pageGrid,
});

export default connect(mapStateToProps)(Courses);
