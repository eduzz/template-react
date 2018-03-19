import React from 'react';
import CourseCard from './CourseCard';

const styles = require('./styles.css');

const courseCardGrid = ({ courses }: any) => (
  <div className={styles.component}>
    {courses.map((course: any) => <CourseCard key={course.id} data={course} />)}
  </div>
);

export default courseCardGrid;
