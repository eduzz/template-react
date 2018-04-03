import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { cdn } from 'constants/index';

interface IProps {
  course: any;
}

class CourseBanner extends Component<IProps> {
  render() {
    const imageCover =
      this.props.course.customizations &&
      this.props.course.customizations.image_cover &&
      (this.props.course.customizations.image_cover.includes('http')
        ? this.props.course.customizations.image_cover
        : cdn + this.props.course.customizations.image_cover);

    return (
      <Fragment>
        <div className='banner-img'>
          <img src={imageCover} alt='' />
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
                {this.props.course.title}
              </h1>
              <p className='course-description'>
                {this.props.course.description}
              </p>

              <div className='course-author'>
                <div className='course-author-img'>
                  <img
                    src={this.props.course.author && this.props.course.author.avatar}
                    alt=''
                  />
                </div>
                <div className='course-author-data'>
                  {this.props.course.author && this.props.course.author.name}
                  <p className='course-number-lessons'>{this.props.course.total_lessons} Aulas</p>
                </div>
              </div>
              <div className='row'>
                <div className='col s12 m6 l3'>
                  <div className='course-progress'>
                    <label>Progresso: {parseInt(this.props.course.progress || 0)}%</label>
                    <div className='progress-bar'>
                      <span style={{ width: this.props.course.progress || 0 + '%' }} />
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
  }
}

const mapStateToProps = (state: any) => ({
  course: state.course,
});

export default connect(mapStateToProps)(CourseBanner);