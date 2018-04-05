import React from 'react';
import LessonCard from './LessonCard';
import Loading from 'components/Loading';

const lessonCardList = ({ courseID, lessons, editable, type }: any) => (
  <div>
    <Loading active={!lessons.length} />

    {lessons.map((lesson: any, key: number) => <LessonCard type={type} key={key} courseID={courseID} lesson={lesson} editable={editable} />)}
  </div>
);

export default lessonCardList;
