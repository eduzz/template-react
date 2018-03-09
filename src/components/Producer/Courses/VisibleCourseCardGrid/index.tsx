import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import CourseCardGrid from './CourseCardGrid';
import { connect } from 'react-redux';
import { fetchCourses } from 'actionCreators/courses';
import { getVisibleCourses } from 'reducers';
import Loading from 'components/Loading';

interface IProps {
  fetchCourses: any;
  courses: any;
}

class VisibleCourseCardGrid extends Component<IProps> {
  componentDidMount() {
    this.props.fetchCourses();
  }

  render() {
    return (
      <div>
        <Loading active={!this.props.courses.length} />
        <CourseCardGrid courses={this.props.courses} />
      </div>
    );
  }
}

const mapStateToProps = (state: any) => {
  const filter = state.searchFilter.courses;

  return {
    courses: getVisibleCourses(state, filter),
  };
};

const mapDispatchToProps = (dispatch: any) => ({
  ...bindActionCreators({ fetchCourses }, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(VisibleCourseCardGrid);
