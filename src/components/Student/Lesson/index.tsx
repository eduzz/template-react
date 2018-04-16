import React, { Component } from 'react';
import { connect } from 'react-redux';
import SideMenu from './SideMenu';
import Navigation from './Navigation';
import Player from './Player';
import Share from './Share';
import Description from './Description';
import Comments from './Comments';
import { fetchLesson } from 'actionCreators/lessons';
import { fetchRating } from 'actionCreators/rating';
import Loading from 'components/Loading';
import Rating from './Rating';

const styles = require('./styles.css');

interface IProps {
  lesson: any;
  loading: any;
  fetchLesson: any;
  fetchRating: any;
  match: any;
}

class Lesson extends Component<IProps> {
  componentDidMount() {
    this.props.fetchLesson(this.props.match.params.lessonID);
  }

  handleCourseChange = (lessonID: number | string) => {
    this.props.fetchLesson(lessonID);
    this.props.fetchRating(lessonID);
    this.state = {
      isHidden: true,
      qtdRequestLoading: 1,
    };
  }

  render() {
    return (
      <div className={styles.component}>
        <section className='lesson-page template-black'>
          <Loading active={!this.props.lesson.id} absolutePosition={true} lockPageScroll={true} />
          <SideMenu courseID={this.props.match.params.courseID} />
          <article className='lesson-container'>
            <Navigation
              title={this.props.lesson.title}
              next={this.props.lesson.next}
              prev={this.props.lesson.previous}
              courseID={this.props.match.params.courseID}
              onChange={this.handleCourseChange}
            />
            <Player embed={this.props.lesson.embed} />
            <div className='lesson-actions'>
              <Share url={this.props.lesson.share} />
              <Rating lessonID={this.props.match.params.lessonID} />
            </div>
            <Description text={this.props.lesson.description} />
            <Comments lessonID={this.props.match.params.lessonID} />
          </article>
        </section>
      </div>
    );
  }
}

const mapStateToProps = (state: any) => ({
  lesson: state.lesson,
  loading: state.loading,
});

export default connect(mapStateToProps, { fetchLesson, fetchRating })(Lesson);