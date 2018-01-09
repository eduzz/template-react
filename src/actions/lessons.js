export const getModuleLessons = moduleID => ({
	type: 'GET_MODULE_LESSONS',
	moduleID
});

export const receiveModuleLessons = (lessons, moduleID) => ({
	type: 'RECEIVE_MODULE_LESSONS',
	lessons,
	moduleID,
});

export const receiveModuleLessonsError = err => ({
	type: 'RECEIVE_MODULE_LESSONS_ERROR',
	err,
});
