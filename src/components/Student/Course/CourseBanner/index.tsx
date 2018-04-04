import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { cdn } from 'constants/index';
import { fetchCourse, fetchCourseProgress, fetchCourseNews } from 'actionCreators/course';
import Collapse from 'material-ui/transitions/Collapse';

const styles = require('./styles.css');

interface IProps {
  course: any;
  courseID: number;
  fetchCourse: any;
  fetchCourseProgress: any;
  fetchCourseNews: any;
}

interface IState {
  isDescriptionOpen: boolean;
}

class CourseBanner extends Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);

    this.state = {
      isDescriptionOpen: false,
    };
  }

  componentDidMount() {
    this.props.fetchCourse(this.props.courseID);
    this.props.fetchCourseProgress(this.props.courseID);
    this.props.fetchCourseNews(this.props.courseID);
  }

  handleToggleDescription = () => {
    this.setState({
      isDescriptionOpen: !this.state.isDescriptionOpen,
    });
  }

  render() {
    const imageCover =
      this.props.course.customizations &&
      this.props.course.customizations.image_cover &&
      (this.props.course.customizations.image_cover.includes('http')
        ? this.props.course.customizations.image_cover
        : cdn + this.props.course.customizations.image_cover);

    return (
      <Fragment>
        <div className={styles.component}>
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

                <Collapse
                  in={this.state.isDescriptionOpen}
                  collapsedHeight='30px'
                >
                  <p className='course-description' dangerouslySetInnerHTML={{ __html: this.props.course.description }}></p>
                </Collapse>

                <div className='see-more' onClick={this.handleToggleDescription}>
                  {this.state.isDescriptionOpen ? 'Ver Menos' : 'Ver Mais'}
                </div>

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
                      Novidades <span>{this.props.course.news && this.props.course.news.length || 0}</span>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </Fragment>
    );
  }
}

const mapStateToProps = (state: any) => ({
  course: state.course,
});

export default connect(mapStateToProps, { fetchCourse, fetchCourseProgress, fetchCourseNews })(CourseBanner);