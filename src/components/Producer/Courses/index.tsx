import React from 'react';
import PageHeader from './PageHeader';
import VisibleCourseCardGrid from './VisibleCourseCardGrid';
import CoursesSearch from 'components/CoursesSearch';
import CoursesFilters from './CoursesFilters';

const styles = require('./styles.css');

const courses = () => (
  <section className={styles.component}>
    <div className='container'>
      <PageHeader />
      <div className='search-bar'>
        <CoursesSearch />
        <CoursesFilters />
      </div>
      <VisibleCourseCardGrid />
    </div>
  </section>
);

export default courses;
