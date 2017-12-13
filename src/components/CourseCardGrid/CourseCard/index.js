import React from 'react';
import styles from './styles.css';
import { cdn } from '../../../constants';

const CourseCard = ({ data }) => (
    <div className={styles.component}>
        <div className={`card-status free-course`}> GRATUITO </div>
        <div className="card-image">
            <img src={cdn+data.avatar} alt="..."/>
        </div>

        <div className="card-description">
            <div className="card-title">{ data.title }</div>
            <div className="card-category">{ data.category.name }</div>
        </div>
    </div>
);

export default CourseCard;
