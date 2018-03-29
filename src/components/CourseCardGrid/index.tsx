import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import CourseCard from './CourseCard';
import { fetchCourses } from 'actionCreators/courses';
import { getVisibleCourses } from 'reducers';
import Loading from 'components/Loading';

const styles = require('./styles.css');

interface IProps {
  fetchCourses: any;
  courses: any;
  options: any;
}

class CourseCardGrid extends Component<IProps> {
  componentDidMount() {
    this.props.fetchCourses(this.props.options);
  }

  render() {
    return (
      <div className={styles.component}>
        <Loading active={!this.props.courses.length} />

        {this.props.courses.map((course: any) =>
          <CourseCard key={course.id} data={course} />
        )}
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

export default connect(mapStateToProps, mapDispatchToProps)(CourseCardGrid);
