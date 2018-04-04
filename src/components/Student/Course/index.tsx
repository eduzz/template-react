import React, { Component } from 'react';
import { connect } from 'react-redux';
import PageGrid from 'components/PageGrid';

interface IProps {
  fetchCourse: any;
  fetchCourseProgress: any;
  match: any;
  pageGrid: any;
}

class Course extends Component<IProps> {
  private courseID: number;
  private layouts: any;

  constructor(props: any) {
    super(props);

    this.courseID = this.props.match.params.courseID;
  }

  render() {
    this.layouts = {
      lg: [{
        type: 'CourseBanner',
        props: {
          courseID: this.courseID,
        },
        i: '0',
        w: 12,
        h: 40,
        x: 0,
        y: 0,
      }, {
        type: 'ModuleList',
        props: {
          courseID: this.courseID,
        },
        i: '1',
        w: 8,
        h: 27,
        x: 1,
        y: 40,
      }, {
        type: 'UpsellList',
        props: {
          courseID: this.courseID,
        },
        i: '2',
        w: 2,
        h: 36,
        x: 9,
        y: 40,
      }]
    };

    return (
      <section className='student-course-content' >
        <PageGrid
          layouts={this.layouts}
          // onChangeLayout={(layouts: any) => localStorage.setItem('courseLayouts', JSON.stringify(layouts))}
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

export default connect(mapStateToProps)(Course);
