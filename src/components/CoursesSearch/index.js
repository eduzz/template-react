import React from 'react';
import { connect } from 'react-redux';
import Search from 'components/Search';
import actionCreators from 'actionCreators';

const CoursesSearch = ({ dispatch }) => (
  <Search onSearch={text => dispatch(actionCreators.searchCourses(text))} />
);

export default connect()(CoursesSearch);
