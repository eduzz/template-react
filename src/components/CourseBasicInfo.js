import React from 'react';
import { Modal, Content, Footer, Button } from './Modal';
import CourseBanner from './CourseBanner';
import CourseCategorySelect from './CourseCategorySelect';
import CourseModuleList from './CourseModuleList';
import VisibleCourseCardGrid from '../containers/VisibleCourseCardGrid';

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
                    <Modal id='modal-authors' fixedFooter>
                        <Content>
                            <h1> Modal Autores </h1>
                        </Content>
                        <Footer>
                            <a className="modal-action modal-close waves-effect waves-green btn-flat">Salvar</a>
                            <a className="modal-action modal-close waves-effect waves-red btn-flat">Cancelar</a>
                        </Footer>
                    </Modal>
                    <Button className='button affirmative waves-effect waves-light' target='modal-authors'>
                        <span>Adicionar Autor</span>
                    </Button>
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
