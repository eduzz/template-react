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

export const postModule = (courseID, title, sequence) => ({
    type: 'POST_MODULE',
    courseID,
    title,
    sequence,
});

export const receiveModule = (module, sequence) => ({
    type: 'RECEIVE_MODULE',
    module,
    sequence,
});

export const receiveModuleError = err => ({
    type: 'RECEIVE_MODULE',
    err,
});
