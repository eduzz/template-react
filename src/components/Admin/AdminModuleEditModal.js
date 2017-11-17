import React from 'react';
import AuthorSelect from './AuthorSelect';
import { Modal, Content, Footer } from '../Modal';

const AdminModuleEditModal = () => (
	<Modal id="modal-module-edit" fixedFooter>
	    <Content>
	        <div className="container">

		        <section className="form-section">
		            <h3 className='form-section-title'>Cadastro de Módulo</h3>
		            <p className="date-description">Cadastre o Módulo de seu curso</p>
		        </section>

		        <section className="form-section">
		        	<div className="row">
		        		<div className="col m12 s12">
		                    <div className="form-block">
		                        <h3 className="form-block-title">Título</h3>
		                        <p className="date-description">Informe aqui o Nome do módulo no Curso (ficará visível aos Alunos)</p>
		                        <input id="Title" type="text" className="validate"/>
		                    </div>
		                </div>
		            </div>
		            <div className="row">

						<div className="col m4 s12">
		                    <div className="form-block">
		                        <h3 className="form-block-title">Agendamento de Módulos</h3>
		                        <p className="date-description">Quantos dias após o primeiro acesso do aluno este módulo será exibido</p>
		                        <input id="DaysLocked" type="text" className="validate" />
		                    </div>
		                </div>
		                <div className="col m3 s12">
		                    <div className="form-block">
		                        <h3 className="form-block-title">Validade do Módulo</h3>
		                        <p className="date-description">Quantos dias o módulo ficará disponível para os Alunos</p>
		                        <input id="AvailableDays" type="text" className="validate" />
		                    </div>
		                </div>
		                <div className="col m5 s12">
		                    <div className="form-block">
		                        <h3 className="form-block-title">Liberar Módulo a partir de</h3>
		                        <p className="date-description">A partir de qual data o módulo ficará disponível para os Alunos</p>
		                        <input id="ReleaseDate" type="text" className="validate" />
		                    </div>
		                </div>

		            </div>
		            
		            <div className="row">
		                <div className="col m6 s12">
		                    <div className="form-block">
		                        <div className="switch">
		                            <label>
		                                <input type="checkbox" id="check-isfree"/>
		                                <span className="lever"></span>
		                            </label>
		                            <label htmlFor="check-isfree">
		                                <h3 className="form-block-title">Módulo Grátis</h3>
		                                <p className="check-description">Permitirá o acesso inclusive por pessoas sem matricula. (Ativar esta opção torna todas Aulas dentro dele como Grátis também.</p>
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
		                                <h3 className="form-block-title">Módulo Oculto</h3>
		                                <p className="check-description">Não aparece na lista de Módulos e Aulas</p>
		                            </label>
		                        </div>
		                    </div>
		                </div> 
		            </div>
		        </section> 
		        <section className="form-section">
		            <div className="row">
		            	<div className="col m12 s12">
		                    <div className="form-block">
		                        <h3 className="form-block-title">Autor Padrão do Módulo</h3>
		                        <p className="date-description">Caso não informado o Autor na Aula, este será o Autor</p>
		                       	<AuthorSelect id="ModuleEditAuthor" />
		                    </div>
		                </div>
		            </div>
		        </section>
		        <section className="form-section">
		            <div className="row">
		            	<div className="col m12 s12">
		            		<a className='button small darkest-color waves-effect waves-light'><span>Excluir Módulo</span></a>
		            		<a className='button small primary-color waves-effect waves-light'><span>Importar Aulas</span></a>
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
);

export default AdminModuleEditModal;