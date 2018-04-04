import React from 'react';
import LessonCard from './LessonCard';
import Loading from 'components/Loading';

const lessonCardList = ({ lessons, editable }: any) => (
  <div>
    <Loading active={!lessons.length} />

    {lessons.map((lesson: any, key: number) => <LessonCard key={key} lesson={lesson} editable={editable} />)}
  </div>
);

export default lessonCardList;
