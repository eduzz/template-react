import React, { Component } from 'react';
import { connect } from 'react-redux';
import PageGrid from 'components/PageGrid';
import Loading from 'components/Loading';

class Courses extends Component<any, any> {
  private layout: any;

  constructor(props: any) {
    super(props);

    this.state = {
      qtdRequestLoading: 1,
    };
  }

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

    const activeRequestLoading = this.props.loading.qtdRequestLoading;

    return (
      <section className='student-content'>
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

export default connect(mapStateToProps)(Courses);
