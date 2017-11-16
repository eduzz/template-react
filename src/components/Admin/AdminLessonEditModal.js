import React, { Component } from 'react';
import AuthorSelect from './AuthorSelect';
import Icon from '../Icon';
import { Modal, Content, Footer } from '../Modal';
import AdminLessonEditMedia from './AdminLessonEditMedia';
import AdminLessonEditContent from './AdminLessonEditContent';
import AdminLessonEditChats from './AdminLessonEditChats';
import { Collapsible, Header, Content as CollapsibleContent } from '../Collapsible';

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
											<a className="input-img login-logo">
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
				        		</div>
				        		<div className="col m8 s8">
				        			<div className="row">
					        			<div className="col m12 s12">
					        				<h3 className="form-block-title">Autor desta Aula</h3>
					                		<AuthorSelect id="LessonEditAuthor"  />
					        			</div>
					        		</div>
					        	</div>
				            </div>
				        </section>

				       	<AdminLessonEditMedia />

				       	<AdminLessonEditContent />

				       	<section className="form-section">
				            <div className="row">
				                <div className="col m12 s12">
				                    <div className="form-block">
				                    	<h3 className="form-block-title">Arquivos para Download</h3>
				                    	<a className='button small darkest-color waves-effect waves-light'><span>Adicionar Arquivos</span></a>
				                    </div>
				                </div>
				            </div>
				        </section>
 
				        <section className="form-section">
				            <div className="row">
				                <Collapsible className='card-lessons' id='configs-advanced-collapsible'>
				                    <Header className='card-lessons-header'>
				                        <h3 className='card-lessons-title'>Configurações Avançadas</h3>
				                        <div className='card-lessons-resume'>
				                            <span>Configure Chats, Aula Grátis/Oculta, Agendamento, etc</span>
				                        </div>
				                    </Header>

				                    <CollapsibleContent className='card-lessons-wrapper'>
				                        <div className="container">

				                            <article className="form-section">
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
				                            </article>

				                            <article className="form-section">
				                            	<AdminLessonEditChats />
				                           	</article>				                            

                   							<article className="form-section">
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
									        </article>

				                        </div>
				                    </CollapsibleContent>
				                </Collapsible>
				            </div>
				        </section>	

				        <section className="form-section">
				            <div className="row">
				            	<div className="col m12 s12">
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