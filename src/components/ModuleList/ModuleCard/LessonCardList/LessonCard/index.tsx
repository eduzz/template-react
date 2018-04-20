import React from 'react';
import { connect } from 'react-redux';
import { cdn } from 'constants/index';
import { Link } from 'react-router-dom';
import Icon from 'components/Icon';
import { fetchLesson } from 'actionCreators/lessons';
import { fetchRating } from 'actionCreators/rating';
import { fetchComments } from 'actionCreators/comments';

const styles = require('./styles.css');

interface IProps {
  courseID: number | string;
  lesson: any;
  editable: boolean;
  type: string;
  fetchLesson: any;
  fetchRating: any;
  fetchComments: any;
}

const lessonCard = ({ courseID, lesson, editable, type, fetchLesson, fetchRating, fetchComments }: IProps) => (
  <div className={styles.component}>
    {type === 'simple' ?
      <a className='card-lesson-block' onClick={() => {
        fetchLesson(lesson.id);
        fetchRating(lesson.id);
        fetchComments(lesson.id);
      }}>
        <div className='card-lesson-content'>
          <h3 className='lesson-title'>{lesson.title}</h3>
          <Icon name={lesson.watched ? 'replay' : 'play'} />
        </div>
      </a>
      :
      <Link to={`/student/courses/${courseID}/lessons/${lesson.id}`} className='card-lesson-block'>
        <div className='card-lesson-thumb'>
          <img alt='' src={cdn + lesson.image} />
        </div>
        <div className='card-lesson-content'>
          <h3 className='lesson-title'>{lesson.title}</h3>
          <p className='card-lesson-description' dangerouslySetInnerHTML={{ __html: lesson.description }}></p>
        </div>
        {editable && <Link
          to={`/producer/lessons/${lesson.id}`}
          className='button small waves-effect waves-light'
        >
          <span>Editar</span>
        </Link>}
      </Link>
    }
  </div>
);

export default connect(undefined, { fetchLesson, fetchRating, fetchComments })(lessonCard);