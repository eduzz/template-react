import React from 'react';
import { Link } from 'react-router-dom';
import Icon from 'components/Icon';

interface IProps {
  title: string;
  next: any;
  prev: any;
  courseID: number | string;
  onChange: any;
}

const Navigation = ({ title, next, prev, courseID, onChange }: IProps) => {
  return (
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
  );
};

export default Navigation;