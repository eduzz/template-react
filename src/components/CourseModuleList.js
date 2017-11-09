import React from 'react';
import { Collapsible, Header, Content } from './Collapsible';
import LessonCard from './LessonCard';

const CourseModuleList = ({ modules }) => (
    <div>
        {modules.map((module, key) =>
            <Collapsible key={ key } className='card-lessons' id={`module-${module.id}`}>
        		<Header className='card-lessons-header'>
        			<h3 className='card-lessons-title'>{ module.title }</h3>
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
        )}
    </div>
);

export default CourseModuleList;
