import React from 'react';
import CourseBanner from './CourseBanner';
import CourseCategorySelect from './CourseCategorySelect';
import ModuleList from 'components/ModuleList';

const CourseBasicInfo = ({ course, getLessons }) => (
    <div>
        <div className='input-field bigger'>
            <input id='course-name' type='text' />
            <label htmlFor='course-name'>Nome do Curso/Programa</label>
        </div>

        <CourseBanner />

        <div className='row'>
            <div className='col xl7'>
                <h3 className='form-section-title'>Detalhes do Curso</h3>

                <CourseCategorySelect />

                <div className='input-field'>
                    <textarea id='textarea1' className='materialize-textarea'></textarea>
                    <label htmlFor='textarea1'>Descrição do Curso</label>
                </div>
            </div>
            <div className='col xl5'>
                <div className='form-block'>
                    <h3 className='form-section-title'>Autor do Curso</h3>
                    <a className='button affirmative waves-effect waves-light'>
                        <span>Editar Autor</span>

                    </a>
                </div>
            </div>
        </div>

        <h3 className='form-section-title'>Módulos e Aulas</h3>

        <a className='button affirmative waves-effect waves-light'>
            <span>Adicionar Módulo</span>
        </a>

        <a className='button darkest-color waves-effect waves-light'>
            <span>Importar Módulos</span>
        </a>

        <ModuleList modules={ course.modules || [] } onOpen={ moduleId => getLessons(moduleId) } />
    </div>
);

export default CourseBasicInfo;
