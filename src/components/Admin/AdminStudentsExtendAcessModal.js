import React, { Component } from 'react';
import { Modal, Content, Footer } from '../Modal';

export default class AdminStudentsExtendAcessModal extends Component 
{
	render(){
		return (
			<Modal id={this.props.id} fixedFooter>
                <Content>
                    <section className="form-section">
                        <h3 className="form-section-title">Liberar mais dias de acesso ao curso</h3>
                        <div className="row">
                          <div className="col m12 s12">
                              <div className="form-block">
                        		<p className="input-description">Informe abaixo até que data o aluno poderá ter acesso a este curso:</p>
                                <input id="linkDirectAcess" 
                                    value={ '__/__/_____' } /* #dev deixar isto dinamico */
                                    type="text" className="validate" />
                                <a className='button small affirmative waves-effect waves-light'><span>Liberar</span></a>
                                {/* #dev implementar ação */}
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