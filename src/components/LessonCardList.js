import React from 'react';
import LessonCard from 'components/LessonCard';

const LessonCardList = ({ lessons }) => (
    <div>
        {lessons.map((lesson, key) =>
            <LessonCard key={ key } lesson={ lesson } />
        )}
    </div>
);

export default LessonCardList;
