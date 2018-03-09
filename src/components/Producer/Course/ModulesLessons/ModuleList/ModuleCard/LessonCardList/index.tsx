import React from 'react';
import LessonCard from './LessonCard';
import Loading from 'components/Loading';

const lessonCardList = ({ lessons }: any) => (
  <div>
    <Loading active={!lessons.length} />

    {lessons.map((lesson: any, key: number) => <LessonCard key={key} lesson={lesson} />)}
  </div>
);

export default lessonCardList;
