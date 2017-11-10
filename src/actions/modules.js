export const getModules = id => ({
	type: 'GET_MODULES',
	id
});

export const receiveModules = modules => ({
	type: 'RECEIVE_MODULES',
	modules,
});

export const receiveModulesError = err => ({
	type: 'RECEIVE_MODULES_ERROR',
	err,
});