import { post, put } from 'api';
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

      const { data } = model.id ?
        await put(`/courses/${model.id}`, model) :
        await post('/courses', model);

      dispatch({ type: enCourseStoreSaveActions.receiveSave, course: data });
      requestCourseList(getState().course.list.pagination)(dispatch as any, getState);

      return data;
    } catch (error) {
      logError(error);
      dispatch({ type: enCourseStoreSaveActions.receiveSaveError, error });

      throw error;
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
  return async dispatch => {
    try {
      dispatch({ type: courseStoreSavePartActions.requestSave(part), model });

      await put(`/courses/${course.id}/${part.toLowerCase()}`, model);
      const result = await new Promise<any>(resolve => setTimeout(() => resolve(model), 2000));
      course[part.toLowerCase()] = result;

      dispatch({ type: courseStoreSavePartActions.receiveSave(part), course });

      return course;
    } catch (error) {
      logError(error);
      dispatch({ type: courseStoreSavePartActions.receiveSaveError(part), error });

      throw error;
    }
  };
}

function cleanCoursePartSaveError(part: typeCourseSaveParts): IActionCreator<string> {
  return dispatch => dispatch({ type: courseStoreSavePartActions.receiveSaveError(part), error: null });
}