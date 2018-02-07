import React from 'react';
import styles from './styles.css';
import { cdn } from 'constants/index';
import { Link } from 'react-router-dom';

const CourseCard = ({ data }) => (
    <div className={styles.component}>
        <div className={`card-status free-course`}> GRATUITO </div>
        <div className="card-image">
            <img src={cdn+data.avatar} alt="..."/>
        </div>

        <Link to={`courses/${data.id}`} className="card-description">
            <p className="card-title">{ data.title }</p>
            <p className="card-category">{ data.category.name }</p>
        </Link>
    </div>
);

export default CourseCard;
