import React from 'react';
import { connect } from 'react-redux';
import Search from 'components/Search';
import actions from 'actions'

const CoursesSearch = ({ dispatch }) => (
	<Search onSearch={text =>
		dispatch(actions.searchCourses(text))
	} />
);

export default connect()(CoursesSearch);
