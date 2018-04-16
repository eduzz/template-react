import React, { Component } from 'react';
import { connect } from 'react-redux';
import PageGrid from 'components/PageGrid';
import Loading from 'components/Loading';

interface IProps {
  fetchCourse: any;
  fetchCourseProgress: any;
  match: any;
  pageGrid: any;
  loading: any;
}

class Course extends Component<IProps> {
  private courseID: number;
  private layout: any;

  constructor(props: any) {
    super(props);

    this.courseID = this.props.match.params.courseID;

    this.state = {
      qtdRequestLoading: 1,
    };
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
          editable: false,
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

    const activeRequestLoading = this.props.loading.qtdRequestLoading;

    return (
      <section className='student-course-content' >
        <Loading absolutePosition={true} active={activeRequestLoading > 0} />
        <PageGrid layout={this.layout} />
      </section>
    );
  }
}

const mapStateToProps = (state: any) => ({
  pageGrid: state.pageGrid,
  loading: state.loading,
});

export default connect(mapStateToProps)(Course);
