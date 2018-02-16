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
