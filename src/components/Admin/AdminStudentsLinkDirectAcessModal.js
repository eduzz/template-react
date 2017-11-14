import React, { Component } from 'react';
import { Modal, Content, Footer } from '../Modal';

export default class AdminStudentsLinkDirectAcessModal extends Component 
{
	render(){
		return (
			<Modal id={this.props.id} fixedFooter>
                <Content>
                    <section className="form-section">
                        <h3 className="form-section-title">Link de Acesso Direto ao Curso</h3>
                        <p className="date-description">Este link dará acesso ao cliente sem o mesmo precisar logar, lembrando que este acesso é somente ao curso do qual este aluno está matriculado</p>
                        <div className="row">
                          <div className="col m12 s12">
                              <div className="form-block">
                                <input id="linkDirectAcess" disabled="true"
                                    value={ 'https://app.nutror.com/cursos/2f7bc0045889/curso-teste/?h=47ef94652cb8814e1843b18cfd35e52e' } /* #dev deixar isto dinamico */
                                    type="text" className="validate" />
                                <a className='button small affirmative waves-effect waves-light'><span>Copiar Link</span></a>
                                {/* #dev implementar ação de copiar */ }
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