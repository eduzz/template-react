import React from 'react';
import CourseBanner from '../components/CourseBanner';
import CourseCategorySelect from '../components/CourseCategorySelect';
import CourseModuleList from '../components/CourseModuleList';

const CourseBasicInfo = () => (
    <div>
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
                    <h3 className='form-section-title'>Autores</h3>
                    <a className='button affirmative waves-effect waves-light'>
                        <span>Adicionar Autor</span>
                    </a>
                </div>
            </div>
        </div>

        <h3 className='form-section-title'>Módulos e Aulas</h3>
        <a className='button affirmative waves-effect waves-light'>
            <span>Adicionar Módulo</span>
        </a>

        <CourseModuleList />
    </div>
);

export default CourseBasicInfo;
