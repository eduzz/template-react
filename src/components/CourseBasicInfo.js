import React from 'react';
import { Modal, Content, Footer, Button } from './Modal';
import CourseBanner from './CourseBanner';
import CourseCategorySelect from './CourseCategorySelect';
import AdminModuleList from './Admin/AdminModuleList';
import AuthorSelect from './Admin/AuthorSelect';
import Author from './Admin/Author';
import AdminModuleEditModal from './Admin/AdminModuleEditModal';
import AdminModuleImportModal from './Admin/AdminModuleImportModal';
import AdminLessonImportModal from './Admin/AdminLessonImportModal';
import AdminLessonEditModal from './Admin/AdminLessonEditModal';

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
                    <Modal id='modal-authors' fixedFooter>
                        <Content>
                            <Author />
                        </Content>
                        <Footer>
                            <a className="modal-action modal-close waves-effect waves-green btn-flat">Salvar</a>
                            <a className="modal-action modal-`close waves-effect waves-red btn-flat">Cancelar</a>
                        </Footer>
                    </Modal>

                    <AuthorSelect />

                    <Button className='button affirmative waves-effect waves-light' target='modal-authors'>
                        <span>Editar Autor</span>
                    </Button>
                </div>
            </div>
        </div>

        <h3 className='form-section-title'>Módulos e Aulas</h3>

        <AdminModuleEditModal />
        <AdminModuleImportModal />

        <Button className='button affirmative waves-effect waves-light' target='modal-module-edit'>
            <span>Adicionar Módulo</span>
        </Button>

        <Button className='button darkest-color waves-effect waves-light' target='modal-importmodules'>
            <span>Importar Módulos</span>
        </Button>

        <AdminLessonEditModal />
        <AdminLessonImportModal />

        <AdminModuleList modules={ course.modules || [] } onOpen={ moduleId => getLessons(moduleId) } />
    </div>
);

export default CourseBasicInfo;
