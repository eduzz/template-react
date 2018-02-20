export const getLesson = lessonID => ({
	type: 'GET_LESSON',
	lessonID
});

export const receiveLesson = lesson => ({
	type: 'RECEIVE_LESSON',
	lesson,
});

export const receiveLessonError = err => ({
	type: 'RECEIVE_LESSON_ERROR',
	err,
});

export const changeLessonField = (field, value) => ({
    type: 'CHANGE_LESSON_FIELD',
    field,
    value,
});

export const addLessonFile = file => ({
    type: 'ADD_LESSON_FILE',
    file,
});
