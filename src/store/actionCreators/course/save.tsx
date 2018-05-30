import { logError } from 'errorHandler';
import { ICourse, ICourseAdvanced } from 'interfaces/course';
import { IActionCreator } from 'store/interfaces';

import { enCourseStoreSaveActions } from '../../reducers/course/save';
import { courseStoreSavePartActions, typeCourseSaveParts } from '../../reducers/course/savePartFactory';
import { requestCourseList } from './list';

export function requestCourseSave(model: ICourse): IActionCreator<enCourseStoreSaveActions> {
  return async (dispatch, getState) => {
    try {
      dispatch({ type: enCourseStoreSaveActions.requestSave, model });

      //TODO: save
      // const { data } = model.id ?
      //   await put(`/courses/${model.id}`, model) :
      //   await post('/courses', model);
      const data = await new Promise(resolve => setTimeout(() => resolve({ id: Date.now(), ...model }), 2000));

      dispatch({ type: enCourseStoreSaveActions.receiveSave, course: data });
      requestCourseList(getState().course.list.pagination)(dispatch as any, getState);
    } catch (error) {
      logError(error);
      dispatch({ type: enCourseStoreSaveActions.receiveSaveError, error });
    }
  };
}

export function cleanCourseSaveError(): IActionCreator<enCourseStoreSaveActions> {
  return dispatch => dispatch({ type: enCourseStoreSaveActions.receiveSaveError, error: null });
}

export function requestCourseAdvancedSave(course: ICourse, model: ICourseAdvanced): IActionCreator<string> {
  return requestCoursePartSave(course, 'ADVANCED', model);
}

export function requestCourseCustomizationSave(course: ICourse, model: ICourseAdvanced): IActionCreator<string> {
  return requestCoursePartSave(course, 'CUSTOMIZATION', model);
}

export function cleanCourseAdvancedSaveError(): IActionCreator<string> {
  return cleanCoursePartSaveError('ADVANCED');
}

export function cleanCourseCustomizationSaveError(): IActionCreator<string> {
  return cleanCoursePartSaveError('CUSTOMIZATION');
}

function requestCoursePartSave(course: ICourse, part: typeCourseSaveParts, model: any): IActionCreator<string> {
  return async (dispatch, getState) => {
    try {
      dispatch({ type: courseStoreSavePartActions.requestSave(part), model });

      //TODO: save
      // await put(`/courses/${course.id}/advanced`, model);
      const result = await new Promise<any>(resolve => setTimeout(() => resolve(model), 2000));
      course.advanced = result;

      dispatch({ type: courseStoreSavePartActions.receiveSave(part), course });
    } catch (error) {
      logError(error);
      dispatch({ type: courseStoreSavePartActions.receiveSaveError(part), error });
    }
  };
}

function cleanCoursePartSaveError(part: typeCourseSaveParts): IActionCreator<string> {
  return dispatch => dispatch({ type: courseStoreSavePartActions.receiveSaveError(part), error: null });
}