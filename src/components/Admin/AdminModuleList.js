import React from 'react';
import { Collapsible, Header, Content } from '../Collapsible';
import LessonCardList from '../LessonCardList';
import { Button } from '../Modal';

const AdminModuleList = ({ modules, onOpen }) => (
    <div>
        {modules.map((module, key) =>
            <Collapsible key={ key } className='card-lessons' id={`module-${module.id}`} options={{onOpen: () => onOpen(module.id)}}>
        		<Header className='card-lessons-header'>
        			<h3 className='card-lessons-title'>{ module.title }</h3>
        			<div className='card-lessons-resume'>
        				<span>Duração do curso</span>
        				<span>Número de Aulas</span>
        			</div>
        		</Header>

        		<Content className='card-lessons-wrapper'>
                    <Button className='button affirmative waves-effect waves-light' target='modal-module'>
                        <span>Editar Módulo</span>
                    </Button>


        			<a className='button affirmative waves-effect waves-light'><span>Nova Aula</span></a>
                    <LessonCardList lessons={ module.lessons || [] }/>
        		</Content>
        	</Collapsible>
        )}
    </div>
);

export default AdminModuleList;
