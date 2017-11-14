export const getModuleLessons = moduleId => ({
	type: 'GET_MODULE_LESSONS',
	moduleId
});

export const receiveModuleLessons = (lessons, moduleId) => ({
	type: 'RECEIVE_MODULE_LESSONS',
	lessons,
	moduleId,
});

export const receiveModuleLessonsError = err => ({
	type: 'RECEIVE_MODULE_LESSONS_ERROR',
	err,
});
