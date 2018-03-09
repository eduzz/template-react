export const getLesson = (lessonID: number) => ({
  type: 'GET_LESSON',
  lessonID
});

export const receiveLesson = (lesson: Object) => ({
  type: 'RECEIVE_LESSON',
  lesson
});

export const receiveLessonError = (err: any) => ({
  type: 'RECEIVE_LESSON_ERROR',
  err
});

export const changeLessonField = (field: string, value: (string | number)) => ({
  type: 'CHANGE_LESSON_FIELD',
  field,
  value
});

export const addLessonFiles = (files: Array<Object>) => ({
  type: 'ADD_LESSON_FILES',
  files
});

export const removeLessonFile = (index: number) => ({
  type: 'REMOVE_LESSON_FILE',
  index
});
