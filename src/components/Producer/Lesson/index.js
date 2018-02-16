import React from 'react';
import { connect } from 'react-redux';
import actions from 'actions';
import Input from 'components/Input';
import TextArea from 'components/TextArea';
import ImageUploader from 'components/ImageUploader';
import Icon from 'components/Icon';
import AuthorSelect from './AuthorSelect';
import { DatePicker, Toggle } from 'material-ui';
import FileUploader from './FileUploader';
import { cdn } from 'constants/index';
import Loading from 'components/Loading';
import styles from './styles.css';

class Lesson extends React.Component {
    constructor() {
        super();

        this.lessonID = null;
    }

    componentDidMount() {
        this.props.getLesson(this.lessonID);
    }

    render() {
        this.lessonID = this.props.match.params.lessonID;

        const lessonLogo = this.props.lesson.image && (this.props.lesson.image.includes('http') ? this.props.lesson.image : cdn + this.props.lesson.image);

        return (
            <section className={styles.component}>
                <div className='container'>

                    {this.lessonID && this.lessonID !== 'new' && <Loading active={!this.props.lesson.id} absolutePosition={true} />}

                    <section className='form-section'>
                        <div className='row'>
                            <div className='col s9'>
                                <div className='col s12'>
                                    <div className='form-block'>
                                        <h3 className='form-block-title'>Titulo da Aula</h3>
                                        <Input
                                            defaultValue={this.props.lesson.title}
                                            async={true}
                                            style={{width: '100%'}}
                                            required
                                        />
                                    </div>
                                </div>
                                <div className='col s12'>
                                    <div className='form-block'>
                                        <h3 className='form-block-title'>Descrição da Aula</h3>
                                        <TextArea
                                            defaultValue={this.props.lesson.description}
                                            async={true}
                                            style={{width: '100%'}}
                                        />
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
                                                defaultImage={lessonLogo}
                                                // onChange={this.props.changeCourseCover}
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
                            <FileUploader />
                        </div>
                    </section>

                    <section className="form-section">
                      <div className="row">
                        <div className="col m12 l4">
                          <div className="form-block">
                            <h3 className="form-block-title">Liberar aula a partir de:</h3>
                            <p className="date-description">Selecione a data para qual a aula estará disponível.</p>
                            <DatePicker
                                value={this.props.lesson.release_date && new Date(Date.parse(this.props.lesson.release_date))}
                                className="datepicker"
                            />
                          </div>
                        </div>
                        <div className="col m12 l4">
                          <div className="form-block">
                            <h3 className="form-block-title">Agendamento da Aula</h3>
                              <p className="date-description">Após o primeiro acesso, após quantos dias a aula ficará disponível:</p>
                              <Input
                                  defaultValue={this.props.lesson.days_locked}
                                  async={true}
                                  className="datepicker"
                              />
                          </div>
                        </div>
                        <div className="col m12 l4">
                          <div className="form-block">
                            <h3 className="form-block-title">Validade da Aula</h3>
                              <p className="date-description">Determine quantos dias a aula ficará disponível</p>
                              <Input
                                  defaultValue={this.props.lesson.available_days}
                                  async={true}
                                  className="datepicker"
                              />
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
                                <Toggle
                                    id='check-destaque'
                                    toggled={true}
                                />
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
                </div>
            </section>
        );
    }
}

const mapStateToProps = state => ({
    lesson: state.lesson,
});

const mapDispatchToProps = dispatch => ({
    getLesson(lessonID) {
        dispatch(actions.getLesson(lessonID));
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(Lesson);
