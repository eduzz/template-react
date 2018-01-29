import React, { Component } from 'react';
import CourseCardGrid from './CourseCardGrid';
import { connect } from 'react-redux';
import actions from 'actions';
import { getVisibleCourses } from 'reducers';
import Loading from 'components/Loading';

class VisibleCourseCardGrid extends Component {
	componentDidMount() {
        this.props.dispatch(actions.getCourses());
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

export default connect(mapStateToProps)(VisibleCourseCardGrid);
