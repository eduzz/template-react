import React from 'react';
import styles from './styles.css';

const CourseAdvanced = ({ data }) => (
    <div className={styles.component}>
		<section className="form-section">
          <h3 className="form-section-title">Configurações Avançadas</h3>
          <h3 className="form-block-title">Tipos de Acesso</h3>
          <div className="row">
            <div className="col m12 l4">
              <div className="form-block">
                <input type="radio" className="with-gap" id="restrito" name="acess-type" />
                <label htmlFor="restrito">
                  <span className="radio-title">Pago</span>
                  <p className="radio-description">Esse acesso tem <strong>integração com a Eduzz </strong>e os usuários precisam adquirir o curso.</p>
                </label>
              </div>
            </div>
            <div className="col m12 l4">
              <div className="form-block">
                <input type="radio" className="with-gap" id="gatuito-restrito" name="acess-type"/>
                <label htmlFor="gatuito-restrito">
                  <span className="radio-title">Gratuito Restrito</span>
                  <p className="radio-description">Com o acesso restrito qualquer pessoa pode acessar o curso e <strong>é necessário o cadastro</strong></p>
                </label>
              </div>
            </div>
            <div className="col m12 l4">
              <div className="form-block">
                <input type="radio" className="with-gap" id="pago" name="acess-type"/>
                <label htmlFor="pago">
                  <span className="radio-title">Público</span>
                  <p className="radio-description">Com o acesso público qualquer pessoa pode acessar o curso sem a necessidade de um cadastro.</p>
                </label>
              </div>
            </div>
          </div>
        </section>

        <section className="form-section">
          <div className="row">
            <div className="col m12 l4">
              <div className="form-block">
                <h3 className="form-block-title">Data de Liberação</h3>
                <p className="date-description">Esse acesso tem integração com a Eduzz e os usuários precisam adquirir o curso.</p>
                <input type="text" className="datepicker"/>
              </div>
            </div>
            <div className="col m12 l4">
              <div className="form-block">
                <h3 className="form-block-title">Data de Validade</h3>
                  <p className="date-description">Esse acesso tem integração com a Eduzz e os usuários precisam adquirir o curso.</p>
                  <input type="text" className="datepicker"/>
              </div>
            </div>
          </div>
        </section>

        <section className="form-section">
          <div className="row">
            <div className="col m12 l4">
              <div className="form-block">
                <div className="switch">
                  <label>
                    <input type="checkbox" id="check-destaque"/>
                    <span className="lever"></span>
                  </label>
                  <label htmlFor="check-destaque">
                    <h3 className="form-block-title">É Destaque</h3>
                    <p className="check-description">O curso será oferecido nas áreas promocionais da plataforma.</p>
                  </label>
                </div>
              </div>
            </div>
            <div className="col m12 l4">
              <div className="form-block">
                <div className="switch">
                  <label>
                    <input type="checkbox" id="check-comentario"/>
                    <span className="lever"></span>
                  </label>
                  <label htmlFor="check-comentario">
                    <h3 className="form-block-title">Comentários</h3>
                    <p className="date-description">Alunos/usuários podem fazer comentários, nas aulas, que serão moderados pelo produtor.</p>
                  </label>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="form-section">
          <div className="row">
            <div className="col l12">
              <div className="form-block">
                <div className="switch">
                  <label>
                    <input type="checkbox" id="check-termos"/>
                    <span className="lever"></span>
                  </label>
                  <label htmlFor="check-termos">
                    <h3 className="form-block-title">Termos e Condições</h3>
                    <p className="check-description">Habilite para Exibir os Termos e Condições para o Aluno ingressar no curso</p>
                  </label>
                </div>
              </div>
            </div>

            <div className='col l12'>
                <div className='form-block'>
                  <textarea id='termos' className='materialize-textarea'></textarea>
                </div>
            </div> 
          </div>
        </section>

        <section className="form-section">
          <div className="row">
          	  <div className="col m12 l4">
	          <div className="form-block">
		          <h3 className="form-block-title">E-mail do Curso</h3>
			          <p className="input-description">O email cadastrado receberá as respostas que forem enviadas pelos alunos</p>
	          	  <div className="input-field">
			          <input id="course-name" type="text"/>
			      </div>
		      </div>
          	  </div>
	          <div className="col m12 l4">
	              <div className="form-block">
	                <div className="switch">
	                  <label>
	                    <input type="checkbox" id="email-notification"/>
	                    <span className="lever"></span>
	                  </label>
	                  <label htmlFor="email-notification">
	                    <h3 className="form-block-title">Notificações da Plataforma</h3>
	                    <p className="check-description">Usar e-mail cadastrado para receber notificações sobre atualizações, novidades da Plataforma Nutror </p>
	                  </label>
	                </div>
	              </div>
	            </div>
            </div>
        </section>
        <section className="form-section">
          <h3 className="form-section-title">Notificar Alunos</h3>
          <div className="row">
            <div className="col m12 l4">
              <div className="form-block">
                <div className="switch">
                  <label>
                    <input type="checkbox" id="check-module"/>
                    <span className="lever"></span>
                  </label>
                  <label htmlFor="check-module">
                    <h3 className="form-block-title">Atualizações sobre Módulos</h3>
                    <p className="check-description">Ativando esta opção os alunos serão notificados via e-mail sobre cada novidade de <strong>Módulos do Curso</strong></p>
                  </label>
                </div>
              </div>
            </div>
            <div className="col m12 l4">
              <div className="form-block">
                <div className="switch">
                  <label>
                    <input type="checkbox" id="check-lesson"/>
                    <span className="lever"></span>
                  </label>
                  <label htmlFor="check-lesson">
                    <h3 className="form-block-title">Atualizações sobre Aulas</h3>
                    <p className="check-description">Ativando esta opção os alunos serão notificados via e-mail sobre cada novidade de <strong>Aulas do Curso</strong></p>

                  </label>
                </div>
              </div>
            </div>
          </div>
        </section>
    </div>
);

export default CourseAdvanced;
