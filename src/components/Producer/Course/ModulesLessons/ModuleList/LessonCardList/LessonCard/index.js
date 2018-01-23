import React from 'react';
import { Button } from 'components/Modal';
import { cdn } from 'constants/index';
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
    		<Button className='button small waves-effect waves-light' target='modal-lesson-edit'>
                <span>Editar</span>
            </Button>
    	</div>
    </div>
);

export default LessonCard;
