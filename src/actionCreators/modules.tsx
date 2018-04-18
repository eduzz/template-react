import { get, post, del, put } from 'agent';

const receiveModules = (modules: Object[]) => ({
  type: 'RECEIVE_MODULES',
  modules
});

const receiveModuleLessons = (lessons: Array<Object>, moduleID: number) => ({
  type: 'RECEIVE_MODULE_LESSONS',
  lessons,
  moduleID
});

const receiveModule = (module: Object, sequence: number) => ({
  type: 'RECEIVE_MODULE',
  module,
  sequence
});

const receiveModuleError = (err: any) => ({
  type: 'RECEIVE_MODULE',
  err
});

export const cleanModules = () =>
  (dispatch: any) => dispatch({
    type: 'CLEAN_MODULES',
  });

export const fetchModules = (courseID: number | string) =>
  (dispatch: any) => {
    dispatch({
      type: 'REQUEST_MODULES',
    });

    get({ url: `/courses/${courseID}/modules` }).then(
      res => {
        dispatch(receiveModules(res.data.data));
      },
    );
  };

export const fetchModuleLessons = (moduleID: number) =>
  (dispatch: any) => {
    dispatch({
      type: 'REQUEST_MODULE_LESSONS',
    });

    get({ url: `/modules/${moduleID}/lessons` }).then(
      res => dispatch(receiveModuleLessons(res.data.data, moduleID))
    );
  };

export const addModule = () => ({
  type: 'ADD_MODULE'
});

export const removeModule = (index: number) => ({
  type: 'REMOVE_MODULE',
  index
});

export const postModule = (courseID: number, title: string, sequence: number) =>
  (dispatch: any) => {
    post({
      url: '/modules',
      data: {
        id_course: courseID,
        title,
        description: 'description',
        days_locked: 1,
        is_draft: false,
        id_author: null,
        available_days: 1,
        release_date: '2018-07-07',
        image: 'base64',
        sequence,
        is_free: true
      }
    }).then(
      res => dispatch(receiveModule(res.data.data, sequence)),
      err => dispatch(receiveModuleError(err)),
    );
  };

export const deleteModule = (moduleID: number) => ({
  type: 'DELETE_MODULE',
  moduleID
});

export const deleteModuleUndo = (module: Object, index: number) => ({
  type: 'DELETE_MODULE_UNDO',
  module,
  index
});

export const deleteModulePersist = (moduleID: number) =>
  (dispatch: any) => del({ url: '/modules/' + moduleID }).then(res => { }, err => { });

export const editModulePersist = (module: any, index: number) =>
  (dispatch: any) => {
    put({ url: '/modules/' + module.id, data: module }).then(
      res => dispatch(receiveModule(res.data.data, index)),
      err => dispatch(receiveModuleError(err)),
    );
  };
