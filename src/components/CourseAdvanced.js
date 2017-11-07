import React from 'react';
import Icon from './Icon';


const CourseAdvanced = ({ data }) => (
    <div className="container">
		<section className="form-section">
          <h3 class="form-section-title">Configs do Curso</h3>

          <h3 className="form-block-title">Tipos de Acesso</h3>
          <div className="row">
            <div className="col m12 l4">
              <span className="form-block">
                <input type="radio" className="with-gap" id="restrito" name="acess-type" />
                <label for="restrito">
                  <span className="radio-title">Pago</span>
                  <p className="radio-description">Esse acesso tem <strong>integração com a Eduzz </strong>e os usuários precisam adquirir o curso.</p>
                </label>
              </span>
            </div>
            <div className="col m12 l4">
              <span className="form-block">
                <input type="radio" className="with-gap" id="gatuito-restrito" name="acess-type"/>
                <label for="gatuito-restrito">
                  <span className="radio-title">Gratuito Restrito</span>
                  <p className="radio-description">Com o acesso restrito qualquer pessoa pode acessar o curso e <strong>é necessário o cadastro</strong></p>
                </label>
              </span>
            </div>
            <div className="col m12 l4">
              <span className="form-block">
                <input type="radio" className="with-gap" id="pago" name="acess-type"/>
                <label for="pago">
                  <span className="radio-title">Público</span>
                  <p className="radio-description">Com o acesso público qualquer pessoa pode acessar o curso sem a necessidade de um cadastro.</p>
                </label>
              </span>
            </div>
          </div>
        </section>

        <section className="form-section">
          <div className="row">
            <div className="col m12 l4">
              <span className="form-block">
                <h3 className="form-block-title">Data de Liberação</h3>
                <p className="date-description">Esse acesso tem integração com a Eduzz e os usuários precisam adquirir o curso.</p>
                <input type="text" className="datepicker"/>
              </span>
            </div>
            <div className="col m12 l4">
              <span className="form-block">
                <h3 className="form-block-title">Data de Validade</h3>
                  <p className="date-description">Esse acesso tem integração com a Eduzz e os usuários precisam adquirir o curso.</p>
                  <input type="text" className="datepicker"/>
              </span>
            </div>
          </div>
        </section>

        <section className="form-section">
          <div className="row">
            <div className="col m12 l4">
              <span className="form-block">
                <div className="switch">
                  <label>
                    <input type="checkbox" id="check-destaque"/>
                    <span className="lever"></span>
                  </label>
                  <label for="check-destaque">
                    <h3 className="form-block-title">É Destaque</h3>
                    <p className="check-description">O curso será oferecido nas áreas promocionais da plataforma.</p>
                  </label>
                </div>
              </span>
            </div>
            <div className="col m12 l4">
              <span className="form-block">
                <div className="switch">
                  <label>
                    <input type="checkbox" id="check-comentario"/>
                    <span className="lever"></span>
                  </label>
                  <label for="check-comentario">
                    <h3 className="form-block-title">Comentários</h3>
                    <p className="date-description">Alunos/usuários podem fazer comentários, nas aulas, que serão moderados pelo produtor.</p>
                  </label>
                </div>
              </span>
            </div>
          </div>
        </section>

        <section className="form-section">
          <div className="row">
          	  <div className="col m12">
	          <span className="form-block">
		          <h3 className="form-block-title">E-mail do Curso</h3>
			      <p className="input-description">O email cadastrado receberá as respostas que forem enviadas pelos alunos</p>
	          	  <div class="input-field">
			          <input id="course-name" type="text"/>
			      </div>
		      </span>
          	  </div>
	          <div className="col m12 l4">
	              <span className="form-block">
	                <div className="switch">
	                  <label>
	                    <input type="checkbox" id="email-notification"/>
	                    <span className="lever"></span>
	                  </label>
	                  <label for="email-notification">
	                    <h3 className="form-block-title">Notificações da Plataforma</h3>
	                    <p className="check-description">Usar e-mail cadastrado para receber notificações sobre atualizações, novidades da Plataforma Nutror </p>
	                  </label>
	                </div>
	              </span>
	            </div>
            </div>
        </section>
        <section className="form-section">
          <h3 class="form-section-title">Notificar Alunos</h3>
          <div className="row">
            <div className="col m12 l4">
              <span className="form-block">
                <div className="switch">
                  <label>
                    <input type="checkbox" id="check-module"/>
                    <span className="lever"></span>
                  </label>
                  <label for="check-module">
                    <h3 className="form-block-title">Atualizações sobre Módulos</h3>
                    <p className="check-description">Ativando esta opção os alunos serão notificados via e-mail sobre cada novidade de <strong>Módulos do Curso</strong></p>
                  </label>
                </div>
              </span>
            </div>
            <div className="col m12 l4">
              <span className="form-block">
                <div className="switch">
                  <label>
                    <input type="checkbox" id="check-lesson"/>
                    <span className="lever"></span>
                  </label>
                  <label for="check-lesson">
                    <h3 className="form-block-title">Atualizações sobre Aulas</h3>
                    <p className="check-description">Ativando esta opção os alunos serão notificados via e-mail sobre cada novidade de <strong>Aulas do Curso</strong></p>
                    
                  </label>
                </div>
              </span>
            </div>
          </div>
        </section>
    </div>
);

export default CourseAdvanced;
