import React, { Component } from 'react';
import { connect } from 'react-redux';
import CourseCard from './CourseCard';
import { fetchCourses, cleanCourses } from 'actionCreators/courses';
import { getVisibleCourses } from 'reducers';
import { CircularProgress } from 'material-ui/Progress';
import InfinityScroll from 'components/InfinityScroll';

const styles = require('./styles.css');

interface IProps {
  fetchCourses: any;
  courses: any;
  type: string;
  cleanCourses: any;
}

interface IState {
  pageNumber: number;
}

class CourseCardGrid extends Component<IProps, IState> {
  private PAGE_SIZE: number = 10;

  componentDidMount() {
    this.props.cleanCourses();
    this.props.fetchCourses(this.props.type, 1, this.PAGE_SIZE);
  }

  componentWillUnmount() {
    this.props.cleanCourses();
  }

  handleScrollToBottom = (pageNumber: number) => {
    if (this.props.courses.finished) {
      this.props.fetchCourses(this.props.type, pageNumber, this.PAGE_SIZE);
    }
  }

  render() {
    if (this.props.courses.length) {
      return (
        <div className={styles.component}>
          <InfinityScroll
            onScrollToBottom={this.handleScrollToBottom}
            totalPages={this.props.courses.totalPages}
          >
            <div className='content'>
              {this.props.courses.map((course: any) =>
                <CourseCard className='cards' key={course.id} data={course} />
              )}
            </div>
            <div className='circular-loading'>
              {!this.props.courses.finished && <CircularProgress size={50} />}
            </div>
          </InfinityScroll>
        </div>
      );
    }

    return (
      <div className={styles.component}>
        <div className='content loading'>
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((index: any) =>
            <div className='loading-block' key={index}>
              <div className='loading-effect'></div>
            </div>
          )}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state: any) => {
  const filter = state.searchFilter.courses;

  return {
    courses: filter ? getVisibleCourses(state, filter) : state.courses,
  };
};

export default connect(mapStateToProps, { fetchCourses, cleanCourses })(CourseCardGrid);
