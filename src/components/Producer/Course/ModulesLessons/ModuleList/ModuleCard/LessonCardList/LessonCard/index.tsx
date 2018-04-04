import React from 'react';
import { cdn } from 'constants/index';
import { Link } from 'react-router-dom';

const styles = require('./styles.css');

const lessonCard = ({ lesson, editable }: any) => (
  <div className={styles.component}>
    <Link to={`/student/lessons/${lesson.id}`} className='card-lesson-block'>
      <div className='card-lesson-thumb'>
        <img alt='' src={cdn + lesson.image} />
      </div>
      <div className='card-lesson-content'>
        <h3 className='lesson-title'>{lesson.title}</h3>
        <p className='card-lesson-description'>{lesson.description}</p>
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
