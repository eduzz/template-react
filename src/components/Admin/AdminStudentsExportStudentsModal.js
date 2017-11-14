import React, { Component } from 'react';
import { Modal, Content, Footer } from '../Modal';
import MyOwnCoursesSelect from '../MyOwnCoursesSelect';
import StudentsFrequencySelect from '../StudentsFrequencySelect';

export default class AdminStudentsExportStudentsModal extends Component 
{
	render(){
		return (
			<Modal id={this.props.id} fixedFooter>
                <Content>
                    <section className="form-section">
                        <h3 className="form-section-title">Exportar Alunos</h3>
                        <div className="row">
	                        <div className="col m6 s6">
                              	<div className="form-block">
                                  	<h3 className="form-block-title">Selecione um Curso/Pacote</h3>
                                  	<MyOwnCoursesSelect />
                              	</div>
	                        </div>
	                        <div className="col m6 s6">
                              	<div className="form-block">
                                  	<h3 className="form-block-title">Frequência dos Alunos no Curso</h3>
									<StudentsFrequencySelect />
                              	</div>
	                        </div>
                        </div>
                        <div className="row">
                        	<div className="col m12 s12">
                              	<div className="form-block">
                              		<a className='button small affirmative waves-effect waves-light'><span>Exportar Alunos para .CSV</span></a>
                              	</div>
                            </div>
                        </div>
                    </section>
                </Content>
                <Footer>
                    <a className="modal-action modal-close waves-effect waves-red btn-flat">Fechar</a>
                </Footer>
            </Modal>			
		);
	}
}