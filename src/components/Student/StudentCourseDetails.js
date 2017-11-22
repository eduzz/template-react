import React from 'react';
import { Collapsible, Header, Content } from 'components/Collapsible';
// import LessonCard from './LessonCard';


const StudentCourseDetails = () => (
    <section className="student-course-content">
      <div className="banner-img">
        <img src="https://i.ytimg.com/vi/hU4EBXu4wto/maxresdefault.jpg" alt=""/>
      </div>
      <div className="action-button">
        <div className="container">
          <a className="button outline small"><span>Voltar</span></a>
        </div>
      </div>
        <section className="banner-course">
          <div className="banner-content">
            <div className="container">
              <h1 className="course-name">Curso preparatório de como domar o dragão from Hell</h1>
              <p className="course-description">Este curso é a porta de entrada para o mundo dos negócios digitais. Aqui você vai aprender a dar os primeiros passos e fazer o seu primeiro resultado.</p>

              <div className="course-author">
                <div className="course-author-img">
                  <img src="https://app.nutror.com//file/Uploads/629/simbolo_eduzz.png" alt="" />
                </div>
                <div className="course-author-data">
                Vinicius Nogueira
                <p className="course-number-lessons">36 Aulas</p>

                </div>
              </div>
              <div className="row">
                <div className="col s12 m6 l3">
                    <div className="course-progress">
                      <label>Progresso: 20%</label>
                      <div className="progress-bar">
                        <span style={{'width':'40%'}}></span>
                      </div>
                    </div>
                </div>
                <div className="col s12 m6 l3">
                    <a className="course-news">Novidades <span>4</span></a>
                </div>
              </div>
            </div>
          </div>
        </section>
        <div className="container">
          <div className="row">
            <div className="s12 m9 col">
              <Collapsible className='card-lessons' id='module1'>
                <Header className='card-lessons-header active'>
                  <h3 className='card-lessons-title'>Entendendo a interface do Photoshop</h3>
                  <div className='card-lessons-resume'>
                    <span>Duração do curso: 4hrs</span>
                    <span>Número de Aulas: 25</span>
                  </div>
                </Header>

                <Content className='card-lessons-wrapper'>
                    <div className='card-lesson-block'>
                      <div className='card-lesson-thumb'></div>
                      <div className='card-lesson-content'>
                        <h3 className='lesson-title'>Deciphering Marketing Lingo For Small Business</h3>
                        <p className='card-lesson-description'>Um dos atores do mercado online é o Produtor. Nesta aula, Eugênio Pachelle explica o que faz um produtor digital.</p>
                      </div>
                      <a className='button small waves-effect waves-light'><span>Assistir</span></a>
                    </div>

                    <div className='card-lesson-block'>
                      <div className='card-lesson-thumb'></div>
                      <div className='card-lesson-content'>
                        <h3 className='lesson-title'>Deciphering Marketing Lingo For Small Business</h3>
                        <p className='card-lesson-description'>Um dos atores do mercado online é o Produtor. Nesta aula, Eugênio Pachelle explica o que faz um produtor digital.</p>
                      </div>
                      <a className='button small waves-effect waves-light'><span>Assistir</span></a>
                    </div>

                    <div className='card-lesson-block'>
                      <div className='card-lesson-thumb'></div>
                      <div className='card-lesson-content'>
                        <h3 className='lesson-title'>Deciphering Marketing Lingo For Small Business</h3>
                        <p className='card-lesson-description'>Um dos atores do mercado online é o Produtor. Nesta aula, Eugênio Pachelle explica o que faz um produtor digital.</p>
                      </div>
                      <a className='button small waves-effect waves-light'><span>Assistir</span></a>
                    </div>

                    <div className='card-lesson-block'>
                      <div className='card-lesson-thumb'></div>
                      <div className='card-lesson-content'>
                        <h3 className='lesson-title'>Deciphering Marketing Lingo For Small Business</h3>
                        <p className='card-lesson-description'>Um dos atores do mercado online é o Produtor. Nesta aula, Eugênio Pachelle explica o que faz um produtor digital.</p>
                      </div>
                      <a className='button small waves-effect waves-light'><span>Assistir</span></a>
                    </div>
                </Content>
              </Collapsible>

              <Collapsible className='card-lessons' id='module1'>
                <Header className='card-lessons-header'>
                  <h3 className='card-lessons-title'>Entendendo a interface do Photoshop</h3>
                  <div className='card-lessons-resume'>
                    <span>Duração do curso: 4hrs</span>
                    <span>Número de Aulas: 25</span>
                  </div>
                </Header>

                <Content className='card-lessons-wrapper'>
                    <div className='card-lesson-block'>
                      <div className='card-lesson-thumb'></div>
                      <div className='card-lesson-content'>
                        <h3 className='lesson-title'>Deciphering Marketing Lingo For Small Business</h3>
                        <p className='card-lesson-description'>Um dos atores do mercado online é o Produtor. Nesta aula, Eugênio Pachelle explica o que faz um produtor digital.</p>
                      </div>
                      <a className='button small waves-effect waves-light'><span>Assistir</span></a>
                    </div>
                </Content>
              </Collapsible>
            </div>
            <div className="s12 m3 col">
              <div className="upsell-card">
                <img src="https://cdn.pixabay.com/photo/2014/07/27/13/49/tree-402953__340.jpg" alt="" className="upsell-img" />
                <div className="content">
                  <h3 className="upsell-name">
                    Curso de Engenharia
                  </h3>
                  <p className="upsell-description">Este curso de engenharia contempla todas as matérias necessarias para se tornar um bom engenheiro</p>
                  <a className="button affirmative">
                    <span>Comprar</span></a>
                </div>
              </div>
            </div>
          </div>
        </div>
    </section>
);

export default StudentCourseDetails;
