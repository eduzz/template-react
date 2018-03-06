import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import CourseCardGrid from './CourseCardGrid';
import { connect } from 'react-redux';
import actionCreators from 'actionCreators';
import { getVisibleCourses } from 'reducers';
import Loading from 'components/Loading';

class VisibleCourseCardGrid extends Component {
	componentDidMount() {
		this.props.fetchCourses();
    }

	render() {
		return (
            <div>
                <Loading active={!this.props.courses.length} />
                <CourseCardGrid courses={ this.props.courses } />
            </div>
        );
	}
}

const mapStateToProps = state => {
	const filter = state.searchFilter.courses;

	return {
		courses: getVisibleCourses(state, filter),
	};
};

const mapDispatchToProps = dispatch => ({
	...bindActionCreators(actionCreators, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(VisibleCourseCardGrid);
