import React from 'react';
import CourseCard from './CourseCard';
import styles from './styles.css';

const CourseCardGrid = ({ courses }) => (
  <div className={styles.component}>
    {courses.map(course => <CourseCard key={course.id} data={course} />)}
  </div>
);

export default CourseCardGrid;
