import React from 'react';
import styles from './styles.css';
import { cdn } from '../../../constants';
import { Link } from 'react-router-dom';

const CourseCard = ({ data }) => (
    <div className={styles.component}>
        <div className={`card-status free-course`}> GRATUITO </div>
        <div className="card-image">
            <img src={cdn+data.avatar} alt="..."/>
        </div>

        <Link to={`courses/${data.id}`} className="card-description">
            <div className="card-title">{ data.title }</div>
            <div className="card-category">{ data.category.name }</div>
        </Link>
    </div>
);

export default CourseCard;
