import React from 'react';
import Course from './Course';

const CourseList = ({ courses }) => (
    <div className="container">
        <div className="cards-wrapper">
            { courses.map(course => <Course key={ course.id } data={ course } />) }
        </div>
    </div>
);

export default CourseList;
