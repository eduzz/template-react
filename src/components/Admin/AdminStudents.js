import React, { Component } from 'react';
import { Button } from '../Modal';
import AdminStudentsSendMsgAllModal from './AdminStudentsSendMsgAllModal';
import AdminStudentsExportStudentsModal from './AdminStudentsExportStudentsModal';
import AdminStudentsTable from './AdminStudentsTable';

export default class AdminStudents extends Component
{
    render()
    {
    	return (
            <section className="page-content">

	            <AdminStudentsSendMsgAllModal id="modal-send-msg-all" />
	            <AdminStudentsExportStudentsModal id="modal-export-students" />

                <div className="container">
                    <section className="page-header">
                        <div className="container">
                            <div className="page-header-content">
                                <h2 className="page-title">Alunos</h2>
                                <p className="page-subtitle">Gerencie os Alunos de todos os seus Cursos</p>
                            </div>

                            <div className="page-header-action">
                            	<Button className='button small affirmative waves-effect waves-light' target="modal-export-students"><span>Exportar Alunos</span></Button>
							    <Button className='button small affirmative waves-effect waves-light' target="modal-send-msg-all"><span>Enviar E-mail para Alunos</span></Button>
							    <a className='button small darkest-color waves-effect waves-light' onClick={ () => alert('Marque as caixas de seleção dos alunos que gostaria de excluir matrículas')}><span>Excluir Matrículas</span></a>
                            </div>
                        </div>
                    </section>
                    <div className="container">
                       <AdminStudentsTable />        
                    </div>
                </div>
            </section>
        )
    }
}