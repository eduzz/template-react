import React from 'react';
import { connect } from 'react-redux';
import { searchCourses } from 'actionCreators/search';

const coursesSearch = ({ dispatch }: any) => (
  <div className='input-field'>
    <input
      id='icon_search'
      type='text'
      onKeyUp={(input: any) => dispatch(searchCourses(input.target.value))}
    />
    <label htmlFor='icon_search'>Pesquisar</label>
  </div>
);

export default connect()(coursesSearch);
