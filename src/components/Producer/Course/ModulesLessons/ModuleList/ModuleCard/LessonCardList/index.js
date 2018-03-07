import React from 'react';
import LessonCard from './LessonCard';
import Loading from 'components/Loading';

const LessonCardList = ({ lessons }) => (
  <div>
    <Loading active={!lessons.length} />

    {lessons.map((lesson, key) => <LessonCard key={key} lesson={lesson} />)}
  </div>
);

export default LessonCardList;
