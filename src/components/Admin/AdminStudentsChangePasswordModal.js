import React, { Component } from 'react';
import { Modal, Content, Footer } from '../Modal';

export default class AdminStudentsChangePasswordModal extends Component 
{
	render(){
		return (
			<Modal id={this.props.id} fixedFooter>
                <Content>
                    <section className="form-section">
                        <h3 className="form-section-title">Alterar Senha deste Aluno</h3>
                        <p className="date-description">(Obs: Este recurso não está disponível caso o aluno possua matrícula em outros cursos)</p>
                        <div className="row">
                          <div className="col m6 s12">
                              <div className="form-block">
                                  <h3 className="form-block-title">Nova Senha</h3>
                                  <input id="NewPassword" type="text" className="validate"/>
                              </div>
                          </div>
                          <div className="col m6 s12">
                              <div className="form-block">
                                  <h3 className="form-block-title">Repita a Nova Senha</h3>
                                  <input id="NewPassword" type="text" className="validate"/>
                              </div>
                          </div>
                        </div> 
                        <div className="row">
                          <div className="col m12 s12">
                              <div className="form-block">
                                  <a className='button small affirmative waves-effect waves-light'><span>Salvar Alterações</span></a>
                              		{ /* #dev implementar ação */ }
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