import React from 'react';
import CourseBanner from './CourseBanner';
import CourseCategorySelect from './CourseCategorySelect';
// import ModuleList from 'components/ModuleList';
import styles from './styles.css';

const CourseBasicInfo = ({ course, getLessons }) => (
    <div className={styles.component}>
        <div className="form-section">
            <div className='row'>
                <div className='col s12'>
                    <CourseBanner />
                </div>
            </div>
        </div>
        <div className="form-section">
            <div className='row'>
                <div className='col xl7 s12'>
                    <div className='form-block'>
                        <h3 className='form-section-title'>Detalhes do Curso</h3>
                        <CourseCategorySelect />

                        <div className='input-field'>
                            <textarea id='textarea1' className='materialize-textarea'></textarea>
                            <label htmlFor='textarea1'>Descrição do Curso</label>
                        </div>
                    </div>
                </div>
                <div className='col xl5 s12'>
                    <div className='form-block'>
                        <h3 className='form-section-title'>Autor do Curso</h3>
                        <CourseCategorySelect />
                        <a className='button affirmative waves-effect waves-light'>
                            <span>Adicionar Autor</span>
                        </a>
                    </div>
                </div>
            </div>
        </div>
            <div className="form-section">
                <div className='row'>
                    <div className='col xl7 s12'>
                        <h3 className='form-section-title'>Módulos e Aulas</h3>

                        <a className='button affirmative waves-effect waves-light'>
                            <span>Adicionar Módulo</span>
                        </a>

                        <a className='button outline-dark waves-effect waves-light'>
                            <span>Importar Módulos</span>
                        </a>

                        {/* <ModuleList modules={ course.modules || [] } onOpen={ moduleId => getLessons(moduleId) } /> */}
                    </div>
                </div>
            </div>
    </div>
);

export default CourseBasicInfo;
