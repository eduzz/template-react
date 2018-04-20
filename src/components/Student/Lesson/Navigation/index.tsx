import React from 'react';
import { Link } from 'react-router-dom';
import Icon from 'components/Icon';

const styles = require('./styles.css');

interface IProps {
  title: string;
  next: any;
  prev: any;
  courseID: number | string;
  onChange: any;
}

const Navigation = ({ title, next, prev, courseID, onChange }: IProps) => {
  return (
    title ?
      <header className='lesson-header'>
        <Link
          to={`/student/courses/${courseID}/lessons/${prev && prev.Lesson}`}
          onClick={() => onChange(prev && prev.Lesson)}
          className='button'
          style={{ visibility: !prev ? 'hidden' : 'visible' }}
        >
          <Icon name='home' />
          <span>Anterior</span>
        </Link>
        <h1 className='lesson-title'>
          {title}
        </h1>
        <Link
          to={`/student/courses/${courseID}/lessons/${next && next.Lesson}`}
          onClick={() => onChange(next && next.Lesson)}
          className='button'
          style={{ visibility: !next ? 'hidden' : 'visible' }}
        >
          <Icon name='home' />
          <span>Próxima</span>
        </Link>
      </header>
      :
      <div className={styles.component}>
        <header className='lesson-header'>
          <div className='button'>
            <span></span>
          </div>
          <div className='lesson-title'>
            <div className='line'></div>
          </div>
          <div className='button'>
            <span></span>
          </div>
        </header>
      </div>
  );
};

export default Navigation;