import React, { Component } from 'react';
import { connect } from 'react-redux';
import PageGrid from 'components/PageGrid';
import { fetchCourse, fetchCourseProgress } from 'actionCreators/course';

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

  componentDidMount() {
    this.props.fetchCourse(this.courseID);
    this.props.fetchCourseProgress(this.courseID);
  }

  render() {
    this.layouts = {
      lg: [{
        type: 'CourseBanner',
        i: '0',
        w: 12,
        h: 40,
        maxH: 40,
        minH: 40,
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
        type: 'UpsellCard',
        i: '2',
        w: 2,
        h: 36,
        x: 9,
        y: 40,
      }]
    };

    return (
      <section className='student-course-content'>
        <PageGrid
          layouts={JSON.parse(localStorage.getItem('courseLayouts')) || this.layouts}
          onChangeLayout={(layouts: any) => localStorage.setItem('courseLayouts', JSON.stringify(layouts))}
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

export default connect(mapStateToProps, { fetchCourse, fetchCourseProgress })(Course);
