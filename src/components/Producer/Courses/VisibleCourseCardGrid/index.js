import React, { Component } from 'react';
import CourseCardGrid from 'components/CourseCardGrid';
import { connect } from 'react-redux';
import actions from 'actions';
import { getVisibleCourses } from 'reducers';

class VisibleCourseCardGrid extends Component {
	componentDidMount() {
        this.props.dispatch(actions.getCourses());
    }

	render() {
		return <CourseCardGrid courses={ this.props.courses } />;
	}
}

const mapStateToProps = state => {
	const filter = state.searchFilter.courses;

	return {
		courses: getVisibleCourses(state, filter),
	};
};

export default connect(mapStateToProps)(VisibleCourseCardGrid);
