import React from 'react';
import PageHeader from './PageHeader';
import CourseCardGrid from 'components/CourseCardGrid';
import CoursesSearch from './CoursesSearch';
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
      <CourseCardGrid type='producer' />
    </div>
  </section>
);

export default courses;
