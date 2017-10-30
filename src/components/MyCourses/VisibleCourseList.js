import React, { Component } from 'react';
import CourseList from '../CourseList';
import { connect } from 'react-redux';
import { getCourses } from '../../actions';
import { getVisibleCourses } from '../../reducers';

class VisibleCourseList extends Component {
	componentDidMount() {
        this.props.dispatch(getCourses());
    }

	render() {
		return <CourseList courses={ this.props.courses } />;
	}
}

const mapStateToProps = state => {
	const filter = state.searchFilter.courses;

	return {
		courses: getVisibleCourses(state, filter),
	};
};

export default connect(mapStateToProps)(VisibleCourseList);