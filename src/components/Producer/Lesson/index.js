import React from 'react';
import { connect } from 'react-redux';
import actionCreators from 'actionCreators';
import Input from 'components/Input';
import TextArea from 'components/TextArea';
import ImageUploader from 'components/ImageUploader';
import Icon from 'components/Icon';
import AuthorSelect from 'components/Producer/AuthorSelect';
import { DatePicker } from 'material-ui';
import Toggle from 'components/Toggle';
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

    const lessonLogo =
      this.props.lesson.image &&
      (this.props.lesson.image.includes('http')
        ? this.props.lesson.image
        : cdn + this.props.lesson.image);

    const chats = this.props.lesson.chats || {};

    return (
      <section className={styles.component}>
        <div className="container">
          {this.lessonID &&
            this.lessonID !== 'new' && (
              <Loading active={!this.props.lesson.id} absolutePosition={true} />
            )}

          <section className="form-section">
            <div className="row">
              <div className="col s9">
                <div className="row">
                  <div className="form-block">
                    <h3 className="form-block-title">Titulo da Aula</h3>
                    <Input
                      defaultValue={this.props.lesson.title}
                      async={true}
                      style={{ width: '100%' }}
                      required
                      onChange={e =>
                        this.props.changeLessonField('title', e.target.value)
                      }
                    />
                  </div>
                </div>

                <div className="row">
                  <div className="form-block">
                    <h3 className="form-block-title">Descrição da Aula</h3>
                    <TextArea
                      defaultValue={this.props.lesson.description}
                      async={true}
                      style={{ width: '100%' }}
                      onChange={e =>
                        this.props.changeLessonField(
                          'description',
                          e.target.value
                        )
                      }
                    />
                  </div>
                </div>
              </div>

              <div className="col s3">
                <div className="row">
                  <div className="form-block">
                    <h3 className="form-block-title">Miniatura do Curso</h3>
                    <label className="input-label">
                      Tamanho sugerido: 170x220
                    </label>

                    <ImageUploader
                      defaultImage={lessonLogo}
                      // onChange={img => this.props.changeLessonField('image', img)}
                      icon="camera-line"
                      text="Alterar Imagem"
                    />
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section className="form-section">
            <div className="row">
              <div className="s12 m8 col">
                <div className="form-block">
                  <h3 className="form-block-title">Tipo da Aula</h3>
                </div>
              </div>
              <div className="s12 m4 col">
                <div className="form-block">
                  <h3 className="form-block-title">Autor da Aula</h3>
                </div>
              </div>
            </div>

            <div className="row">
              <div className="s12 m8 col">
                <div className="row list-class-type">
                  <input
                    id="type-video"
                    type="radio"
                    name="class-type"
                    value="video"
                  />
                  <label htmlFor="type-video">
                    <Icon name="video-line" />
                    <span>Video</span>
                  </label>

                  <input
                    id="type-texto"
                    type="radio"
                    name="class-type"
                    value="texto"
                  />
                  <label htmlFor="type-texto">
                    <Icon name="text-line" />
                    <span>Texto</span>
                  </label>

                  <input
                    id="type-audio"
                    type="radio"
                    name="class-type"
                    value="audio"
                  />
                  <label htmlFor="type-audio">
                    <Icon name="audio-line" />
                    <span>Áudio</span>
                  </label>

                  <input
                    id="type-embed"
                    type="radio"
                    name="class-type"
                    value="embed"
                  />
                  <label htmlFor="type-embed">
                    <Icon name="embed-line" />
                    <span>Embed</span>
                  </label>
                </div>
              </div>

              <div className="s12 m4 col">
                <div className="form-block">
                  <div className="author-item">
                    <img alt="" src="http://via.placeholder.com/50x50" />
                    <span>Eugênio Pacheco</span>
                    <button type="button">Remover</button>
                  </div>
                  <AuthorSelect
                    value={this.props.lesson.id_author}
                    onChange={(event, index, value) =>
                      this.props.changeLessonField('id_author', value)
                    }
                  />
                </div>
              </div>
            </div>
          </section>

          <section className="form-section">
            <div className="row">
              <FileUploader
                files={this.props.lesson.lesson_files || []}
                onAdd={files =>
                  this.props.addLessonFiles(files, this.props.lesson)
                }
                onRemove={this.props.removeLessonFile}
              />
            </div>
          </section>

          <section className="form-section">
            <div className="row">
              <div className="s12 col">
                <div className="form-block text-center">
                  <h3 className="form-block-title">
                    Configurações Avançadas
                    <Icon name="arrow-down" />
                  </h3>
                </div>
              </div>
            </div>
          </section>

          <section className="form-section">
            <div className="row">
              <div className="col m12 l4">
                <div className="form-block">
                  <h3 className="form-block-title">
                    Liberar aula a partir de:
                  </h3>
                  <p className="date-description">
                    Selecione a data para qual a aula estará disponível.
                  </p>
                  <DatePicker
                    value={
                      this.props.lesson.release_date &&
                      new Date(Date.parse(this.props.lesson.release_date))
                    }
                    id="release-date"
                    className="datepicker-field"
                    onChange={(none, date) =>
                      this.props.changeLessonField('release_date', date)
                    }
                  />
                </div>
              </div>

              <div className="col m12 l4">
                <div className="form-block">
                  <h3 className="form-block-title">Agendamento da Aula</h3>
                  <p className="date-description">
                    Após o primeiro acesso, após quantos dias a aula ficará
                    disponível:
                  </p>
                  <Input
                    rightlabel="Dias"
                    defaultValue={this.props.lesson.days_locked}
                    async={true}
                    className="datepicker"
                    onChange={e =>
                      this.props.changeLessonField(
                        'days_locked',
                        e.target.value
                      )
                    }
                  />
                </div>
              </div>

              <div className="col m12 l4">
                <div className="form-block">
                  <h3 className="form-block-title">Validade da Aula</h3>
                  <p className="date-description">
                    Determine quantos dias a aula ficará disponível
                  </p>
                  <Input
                    rightlabel="Dias"
                    defaultValue={this.props.lesson.available_days}
                    async={true}
                    className="datepicker"
                    onChange={e =>
                      this.props.changeLessonField(
                        'available_days',
                        e.target.value
                      )
                    }
                  />
                </div>
              </div>
            </div>
          </section>

          <section className="form-section">
            <div className="row">
              <div className="col m12 l4">
                <div className="form-block">
                  <Toggle
                    title="Aula Gratuita"
                    description="Aula estará disponível sem necessidade de compra."
                    id="check-destaque"
                    toggled={this.props.lesson.is_free}
                    onClick={() =>
                      this.props.changeLessonField(
                        'is_free',
                        this.props.lesson.is_free ? 0 : 1
                      )
                    }
                  />
                </div>
              </div>

              <div className="col m12 l4">
                <div className="form-block">
                  <Toggle
                    title="Ocultar Aula:"
                    description="A aula não aparecerá nas listagens do curso."
                    id="check-comentario"
                    toggled={this.props.lesson.is_draft}
                    onClick={() =>
                      this.props.changeLessonField(
                        'is_draft',
                        this.props.lesson.is_draft ? 0 : 1
                      )
                    }
                  />
                </div>
              </div>
            </div>
          </section>

          <section className="form-section">
            <div className="row">
              <div className="s12 m12 col">
                <div className="form-block">
                  <h3 className="form-block-title">Chats</h3>
                </div>
              </div>
            </div>

            <div className="row">
              <div className="col m12 l4">
                <div className="form-block main">
                  <p>
                    <span>Zopim</span>
                    <span>Id.</span>
                  </p>
                  <div className="switch">
                    <label className="switch-field">
                      <Toggle
                        toggled={chats.haszopimchat}
                        onClick={() =>
                          this.props.changeLessonField('chats', {
                            ...chats,
                            haszopimchat: !chats.haszopimchat
                          })
                        }
                      />
                    </label>
                    <Input
                      className="input-field"
                      defaultValue={chats.zopimchat}
                      async={true}
                      disabled={!chats.haszopimchat}
                      onChange={e =>
                        this.props.changeLessonField('chats', {
                          ...chats,
                          zompimchat: e.target.value
                        })
                      }
                    />
                  </div>
                </div>
              </div>
              <div className="col m12 l4">
                <div className="form-block main">
                  <p>
                    <span>Jivo Chat</span>
                    <span>Id.</span>
                  </p>
                  <div className="switch">
                    <label className="switch-field">
                      <Toggle
                        toggled={chats.hasjivochat}
                        onClick={() =>
                          this.props.changeLessonField('chats', {
                            ...chats,
                            hasjivochat: !chats.hasjivochat
                          })
                        }
                      />
                    </label>
                    <Input
                      className="input-field"
                      defaultValue={chats.jivochat}
                      async={true}
                      disabled={!chats.hasjivochat}
                      onChange={e =>
                        this.props.changeLessonField('chats', {
                          ...chats,
                          jivochat: e.target.value
                        })
                      }
                    />
                  </div>
                </div>
              </div>
              <div className="col m12 l4">
                <div className="form-block main">
                  <p>
                    <span>Zendesk</span>
                    <span>Id.</span>
                  </p>
                  <div className="switch">
                    <label className="switch-field">
                      <Toggle
                        toggled={chats.haszendeskchat}
                        onClick={() =>
                          this.props.changeLessonField('chats', {
                            ...chats,
                            haszendeskchat: !chats.haszendeskchat
                          })
                        }
                      />
                    </label>
                    <Input
                      className="input-field"
                      defaultValue={chats.zendeskchat}
                      async={true}
                      disabled={!chats.haszendeskchat}
                      onChange={e =>
                        this.props.changeLessonField('chats', {
                          ...chats,
                          zendeskchat: e.target.value
                        })
                      }
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="row">
              <div className="col m12 l4">
                <div className="form-block main">
                  <p>
                    <span>Tawk.to</span>
                    <span>Id.</span>
                  </p>
                  <div className="switch">
                    <label className="switch-field">
                      <Toggle
                        toggled={chats.hastawktochat}
                        onClick={() =>
                          this.props.changeLessonField('chats', {
                            ...chats,
                            hastawktochat: !chats.hastawktochat
                          })
                        }
                      />
                    </label>
                    <Input
                      className="input-field"
                      defaultValue={chats.tawktochat}
                      async={true}
                      disabled={!chats.hastawktochat}
                      onChange={e =>
                        this.props.changeLessonField('chats', {
                          ...chats,
                          tawktochat: e.target.value
                        })
                      }
                    />
                  </div>
                </div>
              </div>
              <div className="col m12 l4">
                <div className="form-block main">
                  <p>
                    <span>Live Chat</span>
                    <span>Id.</span>
                  </p>
                  <div className="switch">
                    <label className="switch-field">
                      <Toggle
                        toggled={chats.haslivechat}
                        onClick={() =>
                          this.props.changeLessonField('chats', {
                            ...chats,
                            haslivechat: !chats.haslivechat
                          })
                        }
                      />
                    </label>
                    <Input
                      className="input-field"
                      defaultValue={chats.livechat}
                      async={true}
                      disabled={!chats.haslivechat}
                      onChange={e =>
                        this.props.changeLessonField('chats', {
                          ...chats,
                          livechat: e.target.value
                        })
                      }
                    />
                  </div>
                </div>
              </div>
              <div className="col m12 l4">
                <div className="form-block main">
                  <p>
                    <span>Chatroll</span>
                    <span>Id.</span>
                  </p>
                  <div className="switch">
                    <label className="switch-field">
                      <Toggle
                        toggled={chats.haschatroll}
                        onClick={() =>
                          this.props.changeLessonField('chats', {
                            ...chats,
                            haschatroll: !chats.haschatroll
                          })
                        }
                      />
                    </label>
                    <Input
                      className="input-field"
                      defaultValue={chats.chatroll}
                      async={true}
                      disabled={!chats.haschatroll}
                      onChange={e =>
                        this.props.changeLessonField('chats', {
                          ...chats,
                          chatroll: e.target.value
                        })
                      }
                    />
                  </div>
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
  lesson: state.lesson
});

const mapDispatchToProps = dispatch => ({
  getLesson(lessonID) {
    dispatch(actionCreators.getLesson(lessonID));
  },
  changeLessonField(field, value) {
    dispatch(actionCreators.changeLessonField(field, value));
  },
  addLessonFiles(files, lesson) {
    [...files].forEach((file, index) =>
      dispatch(
        actionCreators.uploadLessonFile(
          file,
          lesson.id,
          lesson.lesson_files.length + index
        )
      )
    );
    dispatch(actionCreators.addLessonFiles(files));
  },
  removeLessonFile(index) {
    dispatch(actionCreators.removeLessonFile(index));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(Lesson);
