import React, { Component } from 'react';
import { connect } from 'react-redux';
// import SideMenu from './SideMenu';
import Navigation from './Navigation';
import Player from './Player';
import Share from './Share';
import Description from './Description';
import Comments from './Comments';
import { fetchLesson } from 'actionCreators/lessons';
import Loading from 'components/Loading';

interface IProps {
  lesson: any;
  fetchLesson: any;
  match: any;
}

class Lesson extends Component<IProps> {
  componentDidMount() {
    this.props.fetchLesson(this.props.match.params.lessonID);
  }

  render() {
    return (
      <section className='lesson-page template-black'>
        <Loading active={!this.props.lesson.id} absolutePosition={true} lockPageScroll={true} />
        {/* <SideMenu courseID={this.props.match.params.courseID} /> */}
        <article className='lesson-container hidden'>
          <Navigation
            title={this.props.lesson.title}
            next={this.props.lesson.next}
            prev={this.props.lesson.previous}
            courseID={this.props.match.params.courseID}
            onChange={(lessonID: number | string) => this.props.fetchLesson(lessonID)}
          />
          <Player embed={this.props.lesson.embed} />
          <Share url={this.props.lesson.share} />
          <Description text={this.props.lesson.description} />
          <Comments />
        </article>
      </section>
    );
  }
}

const mapStateToProps = (state: any) => ({
  lesson: state.lesson,
});

export default connect(mapStateToProps, { fetchLesson })(Lesson);