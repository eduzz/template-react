import React, { Component } from 'react';

const styles = require('./styles.css');

class Comments extends Component {
  render() {
    return (
      <div className={styles.component}>
        <div className='comments form-section'>
          <div className='container'>
            <div className='row'>
              <div className='col s12'>
                <div className='form-block'>
                  <h3 className='form-block-title'>Deixe seu comentário</h3>
                  <div className='comment-form'>
                    <div className='container'>
                      <div className='current-user-photo'>
                        <img
                          src='https://pbs.twimg.com/profile_images/751591861127491584/l1swjFY4.jpg'
                          alt=''
                        />
                      </div>
                      <div className='input-field'>
                        <textarea />
                      </div>
                    </div>
                    <a className='button comment-button'>
                      <span>Comentar</span>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className='container'>
            <div className='comment'>
              <div className='container'>
                <div className='user-photo'>
                  <img
                    src='https://pbs.twimg.com/profile_images/751591861127491584/l1swjFY4.jpg'
                    alt=''
                  />
                </div>
                <div className='content'>
                  <h4 className='user-name'>Charlie Sheen</h4>{' '}
                  <span className='comment-published-time'>
                    8 Horas atrás
                  </span>
                  <p className='comment-text'>
                    Mussum Ipsum, cacilds vidis litro abertis. Mauris nec
                    dolor in eros commodo tempor. Aenean aliquam molestie leo,
                    vitae iaculis nisl. Em pé sem cair, deitado sem dormir,
                    sentado sem cochilar e fazendo pose. Cevadis im ampola pa
                    arma uma pindureta. Si num tem leite então bota uma pinga
                    aí cumpadi!
                  </p>
                  <div className='comment-user-actions'>
                    <a className='action-link'>Responder</a>{' '}
                    <a className='action-link'>Curtir</a>
                    <div className='comment-form'>
                      <div className='container'>
                        <div className='current-user-photo'>
                          <img
                            src='https://pbs.twimg.com/profile_images/751591861127491584/l1swjFY4.jpg'
                            alt=''
                          />
                        </div>
                        <div className='input-field'>
                          <textarea />
                        </div>
                      </div>
                      <a className='button comment-button'>
                        <span>Comentar</span>
                      </a>
                    </div>
                  </div>
                </div>
                <div className='comment-admin-action'>x</div>
              </div>

              <div className='answers'>
                <div className='comment'>
                  <div className='container'>
                    <div className='user-photo'>
                      <img
                        src='https://www.thewrap.com/wp-content/uploads/2017/06/CameronDiaz.jpg'
                        alt=''
                      />
                    </div>
                    <div className='content'>
                      <h4 className='user-name'>Cameron Diaz</h4>{' '}
                      <span className='comment-published-time'>
                        8 Horas atrás
                      </span>
                      <p className='comment-text'>
                        Mussum Ipsum, cacilds vidis litro abertis. Mauris nec
                        dolor in eros commodo tempor. Aenean aliquam molestie
                        leo, vitae iaculis nisl. Em pé sem cair, deitado sem
                        dormir, sentado sem cochilar e fazendo pose. Cevadis
                        im ampola pa arma uma pindureta. Si num tem leite
                        então bota uma pinga aí cumpadi!
                      </p>
                      <div className='comment-user-actions'>
                        <a className='action-link'>Responder</a>{' '}
                        <a className='action-link'>Curtir</a>
                      </div>
                    </div>
                    <div className='comment-admin-action'>x</div>
                  </div>
                </div>
                <div className='comment'>
                  <div className='container'>
                    <div className='user-photo'>
                      <img
                        src='https://static.cineclick.com.br/sites/adm/uploads/banco_imagens/76/940x0_1509114727.jpg'
                        alt=''
                      />
                    </div>
                    <div className='content'>
                      <h4 className='user-name'>Megan Fox</h4>{' '}
                      <span className='comment-published-time'>
                        8 Horas atrás
                      </span>
                      <p className='comment-text'>
                        Mussum Ipsum, cacilds vidis litro abertis. Mauris nec
                        dolor in eros commodo tempor. Aenean aliquam molestie
                        leo, vitae iaculis nisl. Em pé sem cair, deitado sem
                        dormir, sentado sem cochilar e fazendo pose. Cevadis
                        im ampola pa arma uma pindureta. Si num tem leite
                        então bota uma pinga aí cumpadi!
                      </p>
                      <div className='comment-user-actions'>
                        <a className='action-link'>Responder</a>{' '}
                        <a className='action-link'>Curtir</a>
                      </div>
                    </div>
                    <div className='comment-admin-action'>x</div>
                  </div>
                </div>
                <div className='comment'>
                  <div className='container'>
                    <div className='user-photo'>
                      <img
                        src='https://pbs.twimg.com/profile_images/751591861127491584/l1swjFY4.jpg'
                        alt=''
                      />
                    </div>
                    <div className='content'>
                      <h4 className='user-name'>Charlie Sheen</h4>{' '}
                      <span className='comment-published-time'>
                        8 Horas atrás
                      </span>
                      <p className='comment-text'>
                        Mussum Ipsum, cacilds vidis litro abertis. Mauris nec
                        dolor in eros commodo tempor. Aenean aliquam molestie
                        leo, vitae iaculis nisl. Em pé sem cair, deitado sem
                        dormir, sentado sem cochilar e fazendo pose. Cevadis
                        im ampola pa arma uma pindureta. Si num tem leite
                        então bota uma pinga aí cumpadi!
                      </p>
                      <div className='comment-user-actions'>
                        <a className='action-link'>Responder</a>{' '}
                        <a className='action-link'>Curtir</a>
                      </div>
                    </div>
                    <div className='comment-admin-action'>x</div>
                  </div>
                </div>
              </div>
            </div>
            <div className='comment'>
              <div className='container'>
                <div className='user-photo'>
                  <img
                    src='https://pbs.twimg.com/profile_images/751591861127491584/l1swjFY4.jpg'
                    alt=''
                  />
                </div>
                <div className='content'>
                  <h4 className='user-name'>Charlie Sheen</h4>{' '}
                  <span className='comment-published-time'>
                    8 Horas atrás
                  </span>
                  <p className='comment-text'>
                    Mussum Ipsum, cacilds vidis litro abertis. Mauris nec
                    dolor in eros commodo tempor. Aenean aliquam molestie leo,
                    vitae iaculis nisl. Em pé sem cair, deitado sem dormir,
                    sentado sem cochilar e fazendo pose. Cevadis im ampola pa
                    arma uma pindureta. Si num tem leite então bota uma pinga
                    aí cumpadi!
                  </p>
                  <div className='comment-user-actions'>
                    <a className='action-link'>Responder</a>{' '}
                    <a className='action-link'>Curtir</a>
                  </div>
                </div>
                <div className='comment-admin-actions'>x</div>
              </div>
              <div className='answers'>
                <div className='comment'>
                  <div className='container'>
                    <div className='user-photo'>
                      <img
                        src='https://www.thewrap.com/wp-content/uploads/2017/06/CameronDiaz.jpg'
                        alt=''
                      />
                    </div>
                    <div className='content'>
                      <h4 className='user-name'>Cameron Diaz</h4>{' '}
                      <span className='comment-published-time'>
                        8 Horas atrás
                      </span>
                      <p className='comment-text'>
                        Mussum Ipsum, cacilds vidis litro abertis. Mauris nec
                        dolor in eros commodo tempor. Aenean aliquam molestie
                        leo, vitae iaculis nisl. Em pé sem cair, deitado sem
                        dormir, sentado sem cochilar e fazendo pose. Cevadis
                        im ampola pa arma uma pindureta. Si num tem leite
                        então bota uma pinga aí cumpadi!
                      </p>
                      <div className='comment-user-actions'>
                        <a className='action-link'>Responder</a>{' '}
                        <a className='action-link'>Curtir</a>
                      </div>
                    </div>
                    <div className='comment-admin-actions'>x</div>
                  </div>
                </div>
                <div className='comment'>
                  <div className='container'>
                    <div className='user-photo'>
                      <img
                        src='https://static.cineclick.com.br/sites/adm/uploads/banco_imagens/76/940x0_1509114727.jpg'
                        alt=''
                      />
                    </div>
                    <div className='content'>
                      <h4 className='user-name'>Megan Fox</h4>{' '}
                      <span className='comment-published-time'>
                        8 Horas atrás
                      </span>
                      <p className='comment-text'>
                        Mussum Ipsum, cacilds vidis litro abertis. Mauris nec
                        dolor in eros commodo tempor. Aenean aliquam molestie
                        leo, vitae iaculis nisl. Em pé sem cair, deitado sem
                        dormir, sentado sem cochilar e fazendo pose. Cevadis
                        im ampola pa arma uma pindureta. Si num tem leite
                        então bota uma pinga aí cumpadi!
                      </p>
                      <div className='comment-user-actions'>
                        <a className='action-link'>Responder</a>{' '}
                        <a className='action-link'>Curtir</a>
                      </div>
                    </div>
                    <div className='comment-admin-actions'>x</div>
                  </div>
                </div>
                <div className='comment'>
                  <div className='container'>
                    <div className='user-photo'>
                      <img
                        src='https://pbs.twimg.com/profile_images/751591861127491584/l1swjFY4.jpg'
                        alt=''
                      />
                    </div>
                    <div className='content'>
                      <h4 className='user-name'>Charlie Sheen</h4>{' '}
                      <span className='comment-published-time'>
                        8 Horas atrás
                      </span>
                      <p className='comment-text'>
                        Mussum Ipsum, cacilds vidis litro abertis. Mauris nec
                        dolor in eros commodo tempor. Aenean aliquam molestie
                        leo, vitae iaculis nisl. Em pé sem cair, deitado sem
                        dormir, sentado sem cochilar e fazendo pose. Cevadis
                        im ampola pa arma uma pindureta. Si num tem leite
                        então bota uma pinga aí cumpadi!
                      </p>
                      <div className='comment-user-actions'>
                        <a className='action-link'>Responder</a>{' '}
                        <a className='action-link'>Curtir</a>
                      </div>
                    </div>
                    <div className='comment-admin-actions'>x</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Comments;