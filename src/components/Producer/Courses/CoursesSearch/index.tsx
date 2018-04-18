import React from 'react';
import { connect } from 'react-redux';
import { searchCourses } from 'actionCreators/search';

const styles = require('./styles.css');

const coursesSearch = ({ dispatch, courses }: any) => {
  if (courses.length) {
    return (
      <div className={styles.component}>
        <div className='input-field'>
          <input
            id='icon_search'
            type='text'
            onKeyUp={(input: any) => dispatch(searchCourses(input.target.value))}
          />
          <label htmlFor='icon_search'>Pesquisar</label>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.component}>
      <div className='input-field'>
        <input className='icon_search loading' />
      </div>
    </div>
  );
};

const mapStateToProps = (state: any) => ({
  courses: state.courses,
});

export default connect(mapStateToProps)(coursesSearch);
