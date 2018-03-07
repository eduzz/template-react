import React from 'react';
import PageHeader from './PageHeader';
import VisibleCourseCardGrid from './VisibleCourseCardGrid';
import CoursesSearch from 'components/CoursesSearch';
import CoursesFilters from './CoursesFilters';
import styles from './styles.css';

const Courses = () => (
  <section className={styles.component}>
    <div className="container">
      <PageHeader />
      <div className="search-bar">
        <CoursesSearch />
        <CoursesFilters />
      </div>
      <VisibleCourseCardGrid />
    </div>
  </section>
);

export default Courses;
