export const getLessons = moduleID => ({
	type: 'GET_LESSONS',
	moduleID
});

export const receiveLessons = (lessons, moduleID) => ({
	type: 'RECEIVE_LESSONS',
	lessons,
	moduleID,
});

export const receiveLessonsError = err => ({
	type: 'RECEIVE_LESSONS_ERROR',
	err,
});