import React from 'react';
import { Collapsible, Header, Content } from './Collapsible';
import LessonCard from './LessonCard';

const CourseModuleList = () => (
	<Collapsible className='card-lessons' id='module1'>
		<Header className='card-lessons-header'>
			<h3 className='card-lessons-title'>Entendendo a interface do Photoshop</h3>
			<div className='card-lessons-resume'>
				<span>Duração do curso</span>
				<span>Número de Aulas</span>
			</div>
		</Header>

		<Content className='card-lessons-wrapper'>
			<a className='button affirmative waves-effect waves-light'><span>Nova Aula</span></a>
			<LessonCard />
		</Content>
	</Collapsible>
);

export default CourseModuleList;
