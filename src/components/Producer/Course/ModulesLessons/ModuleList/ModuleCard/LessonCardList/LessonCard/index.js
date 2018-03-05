import React from 'react';
import { cdn } from 'constants/index';
import { Link } from 'react-router-dom';
import styles from './styles.css';

const LessonCard = ({ lesson }) => (
    <div className={styles.component}>
    	<div className='card-lesson-block'>
    		<div className='card-lesson-thumb'>
                <img alt='' src={cdn + lesson.image} />
            </div>
    		<div className='card-lesson-content'>
    			<h3 className='lesson-title'>{ lesson.title }</h3>
    			<p className='card-lesson-description'>{ lesson.description }</p>
    		</div>
    		<Link to={`/producer/lessons/${lesson.id}`} className='button small waves-effect waves-light'>
                <span>Editar</span>
            </Link>
    	</div>
    </div>
);

export default LessonCard;
