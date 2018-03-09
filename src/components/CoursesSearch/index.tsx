import React from 'react';
import { connect } from 'react-redux';
import Search from 'components/Search';
import actionCreators from 'actionCreators';

const coursesSearch = ({ dispatch }: any) => (
  <Search onSearch={(text: string) => dispatch(actionCreators.searchCourses(text))} />
);

export default connect()(coursesSearch);
