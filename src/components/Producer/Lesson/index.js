import React from 'react';
import Input from 'components/Input';
import TextArea from 'components/TextArea';
import ImageUploader from 'components/ImageUploader';
import Icon from 'components/Icon';
import AuthorSelect from './AuthorSelect';
import { DatePicker } from 'material-ui';
import styles from './styles.css';

class Lesson extends React.Component {
    constructor() {
        super();

        this.lessonID = null;
    }

    render() {
        this.lessonID = this.props.match.params.lessonID;

        return (
            <section className={styles.component}>
                <section className='form-section'>
                    <div className='row'>
                        <div className='col s9'>
                            <div className='col s12'>
                                <div className='form-block'>
                                    <h3 className='form-block-title'>Titulo da Aula</h3>
                                    <Input />
                                </div>
                            </div>
                            <div className='col s12'>
                                <div className='form-block'>
                                    <h3 className='form-block-title'>Descrição da Aula</h3>
                                    <TextArea />
                                </div>
                            </div>
                        </div>
                        <div className='row'>
                            <div className='col s3'>
                                <section>
                                    <div className='form-block image-uploader'>
                                        <h3 className="form-block-title">Miniatura do Curso</h3>
                                        <label className="input-label">Tamanho sugerido: 170x220</label>

                                        <ImageUploader
                                            icon='paper'
                                            text='Alterar Logo'
                                        />
                                    </div>
                            	</section>
                            </div>
                        </div>
                    </div>
                </section>

                <section className="form-section">
        			<div className="row">
        				<div className="s12 m8 col">
                            <div className='form-block'>
        					    <h3 className="form-block-title">Tipo da Aula</h3>
                            </div>
        				</div>
                        <div className="s12 m4 col">
                            <div className='form-block'>
        					    <h3 className="form-block-title">Autor da Aula</h3>
                            </div>
        				</div>
        				<div className="s12 m2 col">
        					<div className="form-block">
			                  <a className="input-img login-logo">
								<Icon name='video' />
								<span>Video</span>
							  </a>
        					</div>
        				</div>
                        <div className="s12 m2 col">
        					<div className="form-block">
			                  <a className="input-img login-logo">
								<Icon name='video' />
								<span>Audio</span>
							  </a>
        					</div>
        				</div>
                        <div className="s12 m2 col">
        					<div className="form-block">
			                  <a className="input-img login-logo">
								<Icon name='paper' />
								<span>Texto</span>
							  </a>
        					</div>
        				</div>
                        <div className="s12 m2 col">
        					<div className="form-block">
			                  <a className="input-img login-logo">
								<Icon name='video' />
								<span>Embed</span>
							  </a>
        					</div>
        				</div>
                        <div className="s12 m4 col">
        					<div className="form-block">
			                    <AuthorSelect />
        					</div>
        				</div>
        			</div>
        		</section>

                <section className="form-section">
                  <div className="row">
                    <div className="col m12 l4">
                      <div className="form-block">
                        <h3 className="form-block-title">Liberar aula a partir de:</h3>
                        <p className="date-description">Selecione a data para qual a aula estará disponível.</p>
                        <DatePicker className="datepicker"/>
                      </div>
                    </div>
                    <div className="col m12 l4">
                      <div className="form-block">
                        <h3 className="form-block-title">Agendamento da Aula</h3>
                          <p className="date-description">Após o primeiro acesso, após quantos dias a aula ficará disponível:</p>
                          <DatePicker className="datepicker"/>
                      </div>
                    </div>
                    <div className="col m12 l4">
                      <div className="form-block">
                        <h3 className="form-block-title">Validade da Aula</h3>
                          <p className="date-description">Determine quantos dias a aula ficará disponível</p>
                          <DatePicker className="datepicker"/>
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
                            <h3 className="form-block-title">Aula Gratuita</h3>
                            <p className="check-description">Aula estará disponível sem necessidade de compra.</p>
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
                            <h3 className="form-block-title">Ocultar Aula:</h3>
                            <p className="date-description">A aula não aparecerá nas listagens do curso</p>
                          </label>
                        </div>
                      </div>
                    </div>
                  </div>
                </section>

                <section className="form-section">
                  <div className="row">
                    <div className="col m12 l4">
                      <div className="form-block">
                        <h3 className="form-block-title">Chat</h3>
                        <p className="date-description">Selecione o chat que deseja utilizar.</p>
                        <input type="text" />
                      </div>
                    </div>
                  </div>
                </section>
            </section>
        );
    }
}

export default Lesson;
