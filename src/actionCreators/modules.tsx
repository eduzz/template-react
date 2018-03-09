export const getModules = (courseID: number) => ({
  type: 'GET_MODULES',
  courseID
});

export const receiveModules = (modules: Array<Object>) => ({
  type: 'RECEIVE_MODULES',
  modules
});

export const receiveModulesError = (err: any) => ({
  type: 'RECEIVE_MODULES_ERROR',
  err
});

export const addModule = () => ({
  type: 'ADD_MODULE'
});

export const removeModule = (index: number) => ({
  type: 'REMOVE_MODULE',
  index
});

export const postModule = (courseID: number, title: string, sequence: number) => ({
  type: 'POST_MODULE',
  courseID,
  title,
  sequence
});

export const receiveModule = (module: Object, sequence: number) => ({
  type: 'RECEIVE_MODULE',
  module,
  sequence
});

export const receiveModuleError = (err: any) => ({
  type: 'RECEIVE_MODULE',
  err
});

export const deleteModule = (moduleID: number) => ({
  type: 'DELETE_MODULE',
  moduleID
});

export const deleteModuleUndo = (module: Object, index: number) => ({
  type: 'DELETE_MODULE_UNDO',
  module,
  index
});

export const deleteModulePersist = (moduleID: number) => ({
  type: 'DELETE_MODULE_PERSIST',
  moduleID
});

export const editModulePersist = (module: Object, index: number) => ({
  type: 'EDIT_MODULE_PERSIST',
  module,
  index
});

export const getModuleLessons = (moduleID: number) => ({
  type: 'GET_MODULE_LESSONS',
  moduleID
});

export const receiveModuleLessons = (lessons: Array<Object>, moduleID: number) => ({
  type: 'RECEIVE_MODULE_LESSONS',
  lessons,
  moduleID
});

export const receiveModuleLessonsError = (err: any) => ({
  type: 'RECEIVE_MODULE_LESSONS_ERROR',
  err
});
