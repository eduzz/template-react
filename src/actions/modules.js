export const getModules = courseID => ({
	type: 'GET_MODULES',
    courseID,
});

export const receiveModules = modules => ({
	type: 'RECEIVE_MODULES',
	modules,
});

export const receiveModulesError = err => ({
	type: 'RECEIVE_MODULES_ERROR',
	err,
});

export const addModule = () => ({
    type: 'ADD_MODULE',
});
