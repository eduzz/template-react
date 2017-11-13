import React, { Component } from 'react';
import { Modal, Content, Footer } from '../Modal';

export default class AdminCommentsModalReply extends Component {
	render(){
		return (
			<Modal id='modal-answer' fixedFooter>
			    <Content>
			        <section className="form-section">
			            <h3 className="form-section-title">Moderar Comentário</h3>
			            <div className="row">
			              <div className="col m12 s12">
			                  <div className="form-block">
			                      <h3 className="form-block-title">Aluno</h3>
			                      <p className="date-description">
			                        Raimunda Roberval da Silva Cleibson
			                      </p>
			                  </div>
			              </div>
			            </div> 
			            <div className="row">
			              <div className="col m12 s12">
			                  <div className="form-block">
			                      <h3 className="form-block-title">Comentário</h3>
			                      <p className="date-description">
			                        Ótima Aula, Parabens! Vou recomendar pra minha Tia e meu gato
			                      </p>
			                  </div>
			              </div>
			            </div> 
			            <div className="row">
			              <div className="col m12 s12">
			                  <div className="form-block">
			                      <h3 className="form-block-title">Responder</h3>
			                       <textarea id="Reply" className="materialize-textarea validate" />
			                  </div>
			              </div>
			            </div> 
			            <div className="row">
			              <div className="col m12 s12">
			                  <div className="form-block">
			                        <a className='button small darkest-color waves-effect waves-light' >
			                            <span>Responder sem Aprovar</span>
			                        </a>
			                        <a className='button small affirmative waves-effect waves-light' >
			                            <span>Responder e Aprovar</span>
			                        </a>
			                  </div>
			              </div>
			            </div> 
			        </section>
			    </Content>
			    <Footer>
			        <a className="modal-action modal-close waves-effect waves-red btn-flat">Fechar</a>
			    </Footer>
			</Modal>
		)
	}
}
