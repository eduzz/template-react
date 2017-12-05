import React from 'react';
import { Button } from 'components/Modal';

const LessonCard = ({ lesson }) => (
	<div className='card-lesson-block'>
		<div className='card-lesson-thumb'></div>
		<div className='card-lesson-content'>
			<h3 className='lesson-title'>{ lesson.title }</h3>
			<p className='card-lesson-description'>{ lesson.description }</p>
		</div>
		<Button className='button small waves-effect waves-light' target='modal-lesson-edit'>
            <span>Editar</span>
        </Button>
	</div>
);

export default LessonCard;
