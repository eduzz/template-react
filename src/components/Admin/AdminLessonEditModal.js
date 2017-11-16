import React, { Component } from 'react';
import AuthorSelect from './AuthorSelect';
import AdminLessonEditMedia from './AdminLessonEditMedia';
import Icon from '../Icon';
import { Modal, Content, Footer } from '../Modal';

export default class AdminLessonEditModal extends Component{
  	render(){
	    return (
			<Modal id='modal-lesson-edit' fixedFooter>
			    <Content>
			    	<div className="container">

				        <section className="form-section">
				            <h3 className='form-section-title'>Cadastro de Aula</h3>
				            <p className="date-description">Cadastre uma Aula em seu Curso</p>
				        </section>

				        <section className="form-section">
				        	<div className="row">
				        		<div className="col m4 s4">
					        		<div className="col m12 s12">
										<div className="form-block">
											<h3 className="form-block-title">Imagem Principal</h3>
											<p className="input-description">Imagem da Aula exibida na Listagem de Aulas</p>
											<a className="input-img card-img">
												<Icon name='paper' />
												<span>Alterar Imagem</span>
											</a>
										</div>                  
					                </div> 
				        		</div>
				        		
				        		<div className="col m8 s8">
				        			<div className="row">
					        			<div className="col m12 s12">
						                    <div className="form-block">
						                        <h3 className="form-block-title">Título</h3>
						                        <p className="date-description">Informe aqui o Nome da Aula no Curso</p>
						                        <input id="Title" type="text" className="validate"/>
						                    </div>
						                </div>
					                </div>
				        			<AdminLessonEditMedia />
				        		</div>
				            </div>
				        </section>

				        <section className="form-section">	       	
				            <div className="row">
				                <div className="col m6 s12">
				                    <div className="form-block">
				                        <div className="switch">
				                            <label>
				                                <input type="checkbox" id="check-isfree"/>
				                                <span className="lever"></span>
				                            </label>
				                            <label htmlFor="check-isfree">
				                                <h3 className="form-block-title">Aula Grátis</h3>
				                                <p className="check-description">Permitirá o acesso inclusive por pessoas sem matricula.</p>
				                            </label>
				                        </div>
				                    </div>
				                </div> 
				                <div className="col m6 s12">
				                    <div className="form-block">
				                        <div className="switch">
				                            <label>
				                                <input type="checkbox" id="check-isdraft"/>
				                                <span className="lever"></span>
				                            </label>
				                            <label htmlFor="check-isdraft">
				                                <h3 className="form-block-title">Aula Oculta</h3>
				                                <p className="check-description">Não aparece na Listagem de Aulas</p>
				                            </label>
				                        </div>
				                    </div>
				                </div> 
				            </div>	            

				        </section>

						<section className="form-section">
							<h3 className="form-section-title">Chats</h3>
							<p className="check-description">Habilite os Chats que estarão disponíveis nesta aula.</p>
							<div className="row">

								<div className="col m6 s6">
									<div className="form-block">
										<div className="switch">
											<label>
												<input type="checkbox" id="check-chat-zopim"/>
												<span className="lever"></span>
											</label>
											<label htmlFor="check-chat-zopim">
												<h3 className="form-block-title">Zopim Chat</h3>
											</label>
										</div>
									</div>
								</div>

								<div className="col m6 s6">
									<div className="form-block">
										<div className="switch">
											<label>
												<input type="checkbox" id="check-chat-jivo"/>
												<span className="lever"></span>
											</label>
											<label htmlFor="check-chat-jivo">
												<h3 className="form-block-title">Jivo Chat</h3>
											</label>
										</div>
									</div>
								</div>	
							</div>
							<div className="row">

								<div className="col m6 s6">
									<div className="form-block">
										<div className="switch">
											<label>
												<input type="checkbox" id="check-chat-tawkto"/>
												<span className="lever"></span>
											</label>
											<label htmlFor="check-chat-tawkto">
												<h3 className="form-block-title">Tawk.to Chat</h3>
											</label>
										</div>
									</div>
								</div>	

								<div className="col m6 s6">
									<div className="form-block">
										<div className="switch">
											<label>
												<input type="checkbox" id="check-chat-zendesk"/>
												<span className="lever"></span>
											</label>
											<label htmlFor="check-chat-zendesk">
												<h3 className="form-block-title">Zendesk Chat</h3>
											</label>
										</div>
									</div>
								</div>	

							</div>

							<div className="row">

								<div className="col m6 s6">
									<div className="form-block">
										<div className="switch">
											<label>
												<input type="checkbox" id="check-chat-live"/>
												<span className="lever"></span>
											</label>
											<label htmlFor="check-chat-live">
												<h3 className="form-block-title">Live Chat</h3>
											</label>
										</div>
									</div>
								</div>	

								<div className="col m6 s6">
									<div className="form-block">
										<div className="switch">
											<label>
												<input type="checkbox" id="check-chat-chatroll"/>
												<span className="lever"></span>
											</label>
											<label htmlFor="check-chat-chatroll">
												<h3 className="form-block-title">Chatroll Chat</h3>
											</label>
										</div>
									</div>
								</div>	

							</div>				
						</section>		

						<section className="form-section">
							<div className="row">
								<div className="col m4 s12">
				                    <div className="form-block">
				                        <h3 className="form-block-title">Agendamento de Aula</h3>
				                        <p className="date-description">Quantos dias após o primeiro acesso do aluno ao Curso esta Aula será exibida</p>
				                        <input id="DaysLocked" type="text" className="validate" />
				                    </div>
				                </div>
				                <div className="col m4 s12">
				                    <div className="form-block">
				                        <h3 className="form-block-title">Validade da Aula</h3>
				                        <p className="date-description">Quantos dias a Aula ficará disponível para os Alunos</p>
				                        <input id="AvailableDays" type="text" className="validate" />
				                    </div>
				                </div>
				                <div className="col m4 s12">
				                    <div className="form-block">
				                        <h3 className="form-block-title">Liberar Aula a partir de</h3>
				                        <p className="date-description">A partir de qual data esta Aula ficará disponível para os Alunos acessarem</p>
				                        <input id="ReleaseDate" type="text" className="validate" />
				                    </div>
				                </div>
				            </div>
				        </section>

				        
				        <section className="form-section">
				            <div className="row">
				            	<div className="col m12 s12">
				                    <div className="form-block">
				                        <h3 className="form-block-title">Autor desta Aula</h3>
				                       	<AuthorSelect id="AuthorSelect"  />
				                    </div>
				                </div>
				            </div>
				        </section>
				        <section className="form-section">
				            <div className="row">
				            	<div className="col m12 s12">
				            		<a className='button small darkest-color waves-effect waves-light'><span>Adicionar Arquivos</span></a>
				            		<a className='button small darkest-color waves-effect waves-light'><span>Excluir Aula</span></a>
				            	</div>
				            </div>
				        </section>
			        </div>  
			    </Content>
			    <Footer>
			        <a className="modal-action modal-close waves-effect waves-green btn-flat">Salvar</a>
			        <a className="modal-action modal-close waves-effect waves-red btn-flat">Cancelar</a>
			    </Footer>
			</Modal>
	    )
	}
}