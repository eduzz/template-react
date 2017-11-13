import React, { Component } from 'react';
import { Modal, Content, Footer } from '../Modal';
import MyOwnCoursesSelect from '../MyOwnCoursesSelect';

export default class AdminStudentsSendMsgAllModal extends Component 
{
	render(){
		return (
			<Modal id={this.props.id} fixedFooter>
	                <Content>
	                    <section className="form-section">
	                        <h3 className="form-section-title">Enviar Mensagem a Todos os Alunos</h3>
	                        <div className="row">
		                        <div className="col m6 s6">
	                              	<div className="form-block">
	                                  	<h3 className="form-block-title">Curso</h3>
	                                  	<MyOwnCoursesSelect />
	                              	</div>
		                        </div>
		                    </div>
		                    <div className="row">
		                        <div className="col m6 s6">
	                              	<div className="form-block">
	                                  	<h3 className="form-block-title">Título</h3>
										<input id='send-msg-title' type='text' />
	                              	</div>
		                        </div>
		                    </div>
		                    <div className="row">
		                        <div className="col m6 s6">
	                              	<div className="form-block">
	                                  	<h3 className="form-block-title">Conteúdo</h3>
										<textarea id="send-msg-content" className="materialize-textarea validate" />
	                              	</div>
		                        </div>
		                    </div>
		                    <div className="row">
		                       	<div className="col m12 s12">
	                              	<div className="form-block">
	                              		<a className='button small affirmative waves-effect waves-light'><span>Enviar Mensagem Agora</span></a>
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