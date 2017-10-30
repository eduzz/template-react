import React from 'react';
import { connect } from 'react-redux';
import Search from '../components/Search';
import { searchCourses } from '../actions'

const CoursesSearch = ({ dispatch }) => (
	<Search onSearch={text =>
		dispatch(searchCourses(text))
	} />
);

export default connect()(CoursesSearch);