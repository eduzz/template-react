import React from 'react';

const CourseCard = ({ data }) => (
    <div className="card course">
        <div className={`card-status ${data.status}`}>{ (data.status === 'free-course' ? 'GRATUITO' : 'EM BREVE') }</div>

        <div className="card-description">
            <div className="card-title">{ data.title }</div>
            <div className="card-category">{ data.category }</div>
        </div>
    </div>
);

export default CourseCard;
