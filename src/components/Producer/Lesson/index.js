import React from 'react';
import { connect } from 'react-redux';
import actions from 'actions';
import Input from 'components/Input';
import TextArea from 'components/TextArea';
import ImageUploader from 'components/ImageUploader';
import Icon from 'components/Icon';
import AuthorSelect from 'components/Producer/AuthorSelect';
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

    const chats = this.props.lesson.chats || {};

    return (
      <section className={styles.component}>
        {this.lessonID && this.lessonID !== 'new' && <Loading active={!this.props.lesson.id} absolutePosition={true} />}

        <section className='form-section'>
          <div className='row'>
            <div className='col s9'>
              <div className='row'>
                <div className='form-block'>
                  <h3 className='form-block-title'>Titulo da Aula</h3>
                  <Input
                    defaultValue={this.props.lesson.title}
                    async={true}
                    style={{width: '100%'}}
                    required
                    onChange={e => this.props.changeLessonField('title', e.target.value)}
                  />
                </div>
              </div>

              <div className='row'>
                <div className='form-block'>
                  <h3 className='form-block-title'>Descrição da Aula</h3>
                  <TextArea
                    defaultValue={this.props.lesson.description}
                    async={true}
                    style={{width: '100%'}}
                    onChange={e => this.props.changeLessonField('description', e.target.value)}
                  />
                </div>
              </div>
            </div>

            <div className='col s3'>
              <section>
                <div className='form-block image-uploader'>
                  <h3 className="form-block-title">Miniatura do Curso</h3>
                  <label className="input-label">Tamanho sugerido: 170x220</label>

                  <ImageUploader
                    defaultImage={lessonLogo}
                    // onChange={img => this.props.changeLessonField('image', img)}
                    icon='paper'
                    text='Alterar Logo'
                  />
                </div>
              </section>
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
          </div>

          <div className="row">
            <div className="s12 m8 col">
              <div className="row list-class-type">
                <input id="type-video" type="radio" name="class-type" value="video" />
                <label for="type-video">
                  <Icon name='video' />
                  <span>Video</span>
                </label>
                
                <input id="type-texto" type="radio" name="class-type" value="texto" />
                <label for="type-texto">
                  <Icon name='video' />
                  <span>Texto</span>
                </label>
                
                <input id="type-audio" type="radio" name="class-type" value="audio" />
                <label for="type-audio">
                  <Icon name='video' />
                  <span>Áudio</span>
                </label>
                
                <input id="type-embed" type="radio" name="class-type" value="embed" />
                <label for="type-embed">
                  <Icon name='video' />
                  <span>Embed</span>
                </label>
              </div>
            </div>

            <div className="s12 m4 col">
              <div className="form-block">
                <AuthorSelect
                  value={this.props.lesson.id_author}
                  onChange={(event, index, value) => this.props.changeLessonField('id_author', value)}
                />
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
                  id='release-date'
                  className="datepicker"
                  onChange={(none, date) => this.props.changeLessonField('release_date', date)}
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
                  onChange={e => this.props.changeLessonField('days_locked', e.target.value)}
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
                  onChange={e => this.props.changeLessonField('available_days', e.target.value)}
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
                      toggled={!!this.props.lesson.is_free}
                      onClick={() => this.props.changeLessonField('is_free', this.props.lesson.is_free ? 0 : 1)}
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
                    <Toggle
                      id='check-comentario'
                      toggled={!!this.props.lesson.is_draft}
                      onClick={() => this.props.changeLessonField('is_draft', this.props.lesson.is_draft ? 0 : 1)}
                    />
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
            <div className="s12 m12 col">
              <div className='form-block'>
                <h3 className="form-block-title">Chats</h3>
              </div>
            </div>
            <div className="col m12 l4">
              <div>
                <div className="form-block">
                  <div className="switch">
                    <label>
                      <p className="date-description">Zopim</p>
                      <Toggle
                          id='check-comentario'
                          toggled={chats.haszopimchat}
                          onClick={() => this.props.changeLessonField('chats', {
                              ...chats,
                              haszopimchat: !chats.haszopimchat,
                          })}
                      />
                    </label>
                    <Input
                      defaultValue={chats.zopimchat}
                      async={true}
                      disabled={!chats.haszopimchat}
                      onChange={e => this.props.changeLessonField('chats', {
                          ...chats,
                          zompimchat: e.target.value,
                      })}
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="col m12 l4">
              <div>
                <div className="form-block">
                  <div className="switch">
                    <label>
                      <p className="date-description">Jivo Chat</p>
                      <Toggle
                        id='check-comentario'
                        toggled={chats.hasjivochat}
                        onClick={() => this.props.changeLessonField('chats', {
                            ...chats,
                            hasjivochat: !chats.hasjivochat,
                        })}
                      />
                    </label>
                    <Input
                      defaultValue={chats.jivochat}
                      async={true}
                      disabled={!chats.hasjivochat}
                      onChange={e => this.props.changeLessonField('chats', {
                          ...chats,
                          jivochat: e.target.value,
                      })}
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="col m12 l4">
              <div>
                <div className="form-block">
                  <div className="switch">
                    <label>
                      <p className="date-description">Zendesk</p>
                      <Toggle
                        id='check-comentario'
                        toggled={chats.haszendeskchat}
                        onClick={() => this.props.changeLessonField('chats', {
                            ...chats,
                            haszendeskchat: !chats.haszendeskchat,
                        })}
                      />
                    </label>
                    <Input
                      defaultValue={chats.zendeskchat}
                      async={true}
                      disabled={!chats.haszendeskchat}
                      onChange={e => this.props.changeLessonField('chats', {
                          ...chats,
                          zendeskchat: e.target.value,
                      })}
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="col m12 l4">
              <div>
                <div className="form-block">
                  <div className="switch">
                    <label>
                      <p className="date-description">Tawk.to</p>
                      <Toggle
                        id='check-comentario'
                        toggled={chats.hastawktochat}
                        onClick={() => this.props.changeLessonField('chats', {
                            ...chats,
                            hastawktochat: !chats.hastawktochat,
                        })}
                      />
                    </label>
                    <Input
                      defaultValue={chats.tawktochat}
                      async={true}
                      disabled={!chats.hastawktochat}
                      onChange={e => this.props.changeLessonField('chats', {
                          ...chats,
                          tawktochat: e.target.value,
                      })}
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="col m12 l4">
              <div>
                <div className="form-block">
                  <div className="switch">
                    <label>
                      <p className="date-description">Live Chat</p>
                      <Toggle
                        id='check-comentario'
                        toggled={chats.haslivechat}
                        onClick={() => this.props.changeLessonField('chats', {
                            ...chats,
                            haslivechat: !chats.haslivechat,
                        })}
                      />
                    </label>
                    <Input
                      defaultValue={chats.livechat}
                      async={true}
                      disabled={!chats.haslivechat}
                      onChange={e => this.props.changeLessonField('chats', {
                          ...chats,
                          livechat: e.target.value,
                      })}
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="col m12 l4">
              <div>
                <div className="form-block">
                  <div className="switch">
                    <label>
                      <p className="date-description">Chatroll</p>
                      <Toggle
                        id='check-comentario'
                        toggled={chats.haschatroll}
                        onClick={() => this.props.changeLessonField('chats', {
                            ...chats,
                            haschatroll: !chats.haschatroll,
                        })}
                      />
                    </label>
                    <Input
                      defaultValue={chats.chatroll}
                      async={true}
                      disabled={!chats.haschatroll}
                      onChange={e => this.props.changeLessonField('chats', {
                          ...chats,
                          chatroll: e.target.value,
                      })}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
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
  },
  changeLessonField(field, value) {
    dispatch(actions.changeLessonField(field, value));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Lesson);
