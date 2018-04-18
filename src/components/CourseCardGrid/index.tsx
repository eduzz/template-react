import React, { Component } from 'react';
import { connect } from 'react-redux';
import CourseCard from './CourseCard';
import { fetchCourses, cleanCourses } from 'actionCreators/courses';
import { getVisibleCourses } from 'reducers';
import { CircularProgress } from 'material-ui/Progress';

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

  constructor(props: IProps) {
    super(props);

    this.state = {
      pageNumber: 1,
    };
  }

  componentDidMount() {
    this.props.fetchCourses(this.props.type, this.state.pageNumber, this.PAGE_SIZE);

    document.addEventListener('scroll', this.handleScroll.bind(this));
  }

  componentWillUnmount() {
    document.removeEventListener('scroll', this.handleScroll);

    this.props.cleanCourses();
  }

  handleScroll = (e: any) => {
    if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight && this.props.courses.finished && this.state.pageNumber < this.props.courses.totalPages) {
      this.props.fetchCourses(this.props.type, this.state.pageNumber + 1, this.PAGE_SIZE);

      this.setState({
        pageNumber: this.state.pageNumber + 1,
      });
    }
  }

  render() {
    if (this.props.courses.length) {
      return (
        <div className={styles.component}>
          <div className='content'>
            {/* <Loading active={!this.props.courses.length} /> */}

            {this.props.courses.map((course: any) =>
              <CourseCard className='cards' key={course.id} data={course} />
            )}

          </div>
          <div className='circular-loading'>
            {!this.props.courses.finished && <CircularProgress size={50} />}
          </div>
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
