import React from 'react';
import Card from './Card';

const CardList = ({ courses }) => (
    <div className="container">
        <div className="cards-wrapper">
            { courses.map(course => <Card key={ course.id } data={ course } />) }
        </div>
    </div>
);

export default CardList;
