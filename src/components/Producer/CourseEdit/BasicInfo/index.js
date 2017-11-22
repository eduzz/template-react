import React, { Component } from 'react';
import { connect } from 'react-redux';
import actions from 'actions';
import CourseBasicInfo from './CourseBasicInfo';

class CourseBasicInfoContainer extends Component {
    componentDidMount() {
        const courseId = 1; // mock

        this.props.getCourseBasicInfo(courseId);
    }

    render() {
        return (
            <CourseBasicInfo course={ this.props.course } getLessons={ this.props.getLessons } />
        );
    }
}

const mapStateToProps = state => ({
	course: state.course,
});

const mapDispatchToProps = dispatch => ({
    getLessons: moduleId => dispatch(actions.getModuleLessons(moduleId)),
    getCourseBasicInfo: courseId => dispatch(actions.getCourseBasicInfo(courseId)),
});

export default connect(mapStateToProps, mapDispatchToProps)(CourseBasicInfoContainer);
