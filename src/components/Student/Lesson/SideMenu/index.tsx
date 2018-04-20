import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import ModuleList from 'components/ModuleList';
import Icon from 'components/Icon';
import { fetchCourse, fetchCourseProgress } from 'actionCreators/course';
import { Link } from 'react-router-dom';

const styles = require('./styles.css');

interface IProps {
  courseID: number | string;
  course: any;
  lesson: any;
  fetchCourse: any;
  fetchCourseProgress: any;
}

interface IState {
  isHidden: boolean;
}

class SideMenu extends Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);

    this.state = {
      isHidden: false,
    };
  }

  componentDidMount() {
    this.props.fetchCourse(this.props.courseID);
    this.props.fetchCourseProgress(this.props.courseID);
  }

  render() {
    return (
      <aside
        className={`side-nav course-nav ${styles.component} ${
          this.state.isHidden ? 'hidden' : ''
          }`}
      >
        <div
          className='course-block course-data'
          onClick={() =>
            this.setState({
              isHidden: !this.state.isHidden
            })
          }
        >
          <a
            className='toggle-nav'
            onClick={() =>
              this.setState({
                isHidden: !this.state.isHidden
              })
            }
          >
            <div>
              <span />
              <span />
            </div>
          </a>
          {this.props.course.title ?
            <Fragment>
              <label className='course-category'>{this.props.course.category.name}</label>
              <h2 className='course-title'>{this.props.course.title}</h2>
              <div className='course-progress'>
                <label>Progresso: {parseInt(this.props.course.progress || 0)}%</label>
                <div className='progress-bar'>
                  <span style={{ width: this.props.course.progress || 0 + '%' }} />
                </div>
              </div>
            </Fragment>
            :
            <div className='loading'>
              <div className='course-category'>
                <div className='line'></div>
              </div>
              <div className='course-title'>
                <div className='line'></div>
              </div>
              <div className='course-progress'>
                <div className='line'></div>
                <div className='line'></div>
              </div>
            </div>
          }
        </div>
        <div className='course-block course-actions'>
          <Link to='/student/courses' className='button'>
            <Icon name='home' />
            <span>Inicio</span>
          </Link>
          <Link to={`/student/courses/${this.props.courseID}`} className='button'>
            <Icon name='video' />
            <span>Tela do Curso</span>
          </Link>
        </div>

        <div className='modules-block'>
          <ModuleList
            courseID={this.props.courseID}
            editable={false}
            type='simple'
          />
        </div>
      </aside>
    );
  }
}

const mapStateToProps = (state: any) => ({
  course: state.course,
});

export default connect(mapStateToProps, { fetchCourse, fetchCourseProgress })(SideMenu);