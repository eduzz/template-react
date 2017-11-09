import React from 'react';

const LessonCard = ({ lesson }) => (
	<div className='card-lesson-block'>
		<div className='card-lesson-thumb'></div>
		<div className='card-lesson-content'>
			<h3 className='lesson-title'>{ lesson.title }</h3>
			<p className='card-lesson-description'>{ lesson.description }</p>
		</div>
		<a className='button small waves-effect waves-light'>Editar</a>
	</div>
);

export default LessonCard;