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

export const removeModule = index => ({
    type: 'REMOVE_MODULE',
    index,
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

export const deleteModule = moduleID => ({
    type: 'DELETE_MODULE',
    moduleID,
});

export const deleteModuleUndo = (module, index) => ({
    type: 'DELETE_MODULE_UNDO',
    module,
    index,
});

export const deleteModulePersist = moduleID => ({
    type: 'DELETE_MODULE_PERSIST',
    moduleID
});

export const editModulePersist = (module, index) => ({
    type: 'EDIT_MODULE_PERSIST',
    module,
    index,
});
