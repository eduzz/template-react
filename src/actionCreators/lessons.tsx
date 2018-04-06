import { get } from 'agent';

export const cleanLesson = () => ({
  type: 'CLEAN_LESSON',
});

const receiveLesson = (lesson: Object) => ({
  type: 'RECEIVE_LESSON',
  lesson
});

export const fetchLesson = (lessonID: number) =>
  (dispatch: any) => {
    dispatch(cleanLesson());

    get({ url: '/lessons/' + lessonID }).then(
      res => dispatch(receiveLesson(res.data.data))
    );
  };

export const changeLessonField = (field: string, value: (string | number)) => ({
  type: 'CHANGE_LESSON_FIELD',
  field,
  value
});

export const addLessonFiles = (files: Array<any>) => ({
  type: 'ADD_LESSON_FILES',
  files
});

export const removeLessonFile = (index: number) => ({
  type: 'REMOVE_LESSON_FILE',
  index
});
