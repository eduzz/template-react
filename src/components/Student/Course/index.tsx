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
  private layout: any;

  constructor(props: any) {
    super(props);

    this.courseID = this.props.match.params.courseID;
  }

  render() {
    this.layout = [
      {
        type: 'CourseBanner',
        props: {
          courseID: this.courseID,
        },
        size: {
          xs: 12,
        },
      },
      {
        size: {
          xs: 2,
        },
      },
      {
        type: 'ModuleList',
        props: {
          courseID: this.courseID,
        },
        size: {
          xs: 6,
        },
      },
      {
        type: 'UpsellCard',
        props: {
          courseID: this.courseID,
        },
        size: {
          xs: 2,
        },
      },
      {
        size: {
          xs: 2,
        },
      }
    ];

    return (
      <section className='student-course-content' >
        <PageGrid layout={this.layout} />
      </section>
    );
  }
}

const mapStateToProps = (state: any) => ({
  pageGrid: state.pageGrid,
});

export default connect(mapStateToProps)(Course);
