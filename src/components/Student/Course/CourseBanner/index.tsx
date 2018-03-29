import React, { Fragment } from 'react';

const CourseBanner = () => (
  <Fragment>
    <div className='banner-img'>
      <img src='https://i.ytimg.com/vi/hU4EBXu4wto/maxresdefault.jpg' alt='' />
    </div>
    <div className='action-button'>
      <div className='container'>
        <a className='button outline small'>
          <span>Voltar</span>
        </a>
      </div>
    </div>
    <section className='banner-course'>
      <div className='banner-content'>
        <div className='container'>
          <h1 className='course-name'>
            Curso preparatório de como domar o dragão from Hell
            </h1>
          <p className='course-description'>
            Este curso é a porta de entrada para o mundo dos negócios digitais.
            Aqui você vai aprender a dar os primeiros passos e fazer o seu
            primeiro resultado.
            </p>

          <div className='course-author'>
            <div className='course-author-img'>
              <img
                src='https://app.nutror.com//file/Uploads/629/simbolo_eduzz.png'
                alt=''
              />
            </div>
            <div className='course-author-data'>
              Vinicius Nogueira
                <p className='course-number-lessons'>36 Aulas</p>
            </div>
          </div>
          <div className='row'>
            <div className='col s12 m6 l3'>
              <div className='course-progress'>
                <label>Progresso: 20%</label>
                <div className='progress-bar'>
                  <span style={{ width: '40%' }} />
                </div>
              </div>
            </div>
            <div className='col s12 m6 l3'>
              <a className='course-news'>
                Novidades <span>4</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  </Fragment>
);

export default CourseBanner;