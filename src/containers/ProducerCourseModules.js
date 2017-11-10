import React from 'react';
import { connect } from 'react-redux';
import CourseModuleList from '../components/CourseModuleList';

const mapStateToProps = state => ({
	modules: state.modules,
});

export default connect(mapStateToProps)(CourseModuleList);
