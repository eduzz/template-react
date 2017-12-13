import React from 'react';
import CourseCard from './CourseCard';
import styles from './styles.css';
import Loading from 'components/Loading';

const CourseCardGrid = ({ courses }) => (
        <div className={styles.component}>
            <Loading data={ courses }/>
            { courses.map(course => <CourseCard key={ course.id } data={ course } />) }
        </div>
);

export default CourseCardGrid;
