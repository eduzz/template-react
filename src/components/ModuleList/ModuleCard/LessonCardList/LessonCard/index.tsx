import React from 'react';
import { cdn } from 'constants/index';
import { Link } from 'react-router-dom';
import Icon from 'components/Icon';

const styles = require('./styles.css');

const lessonCard = ({ courseID, lesson, editable, type }: any) => (
  <div className={styles.component}>
    <Link to={`/student/courses/${courseID}/lessons/${lesson.id}`} className='card-lesson-block'>
      {type !== 'simple' &&
        <div className='card-lesson-thumb'>
          <img alt='' src={cdn + lesson.image} />
        </div>
      }
      <div className='card-lesson-content'>
        <h3 className='lesson-title'>{lesson.title}</h3>
        {
          type !== 'simple' ?
            <p className='card-lesson-description' dangerouslySetInnerHTML={{ __html: lesson.description }}></p>
            :
            <Icon name={lesson.watched ? 'replay' : 'play'} />
        }
      </div>
      {editable && <Link
        to={`/producer/lessons/${lesson.id}`}
        className='button small waves-effect waves-light'
      >
        <span>Editar</span>
      </Link>}
    </Link>
  </div>
);

export default lessonCard;
