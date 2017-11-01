import React from 'react';
import CourseCard from './CourseCard';

const CourseCardGrid = ({ courses }) => (
    <div className="container">
        <div className="cards-wrapper">
            { courses.map(course => <CourseCard key={ course.id } data={ course } />) }
        </div>
    </div>
);

export default CourseCardGrid;
