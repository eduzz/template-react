import { del, get } from 'api';
import { logError } from 'errorHandler';
import { IPaginationApiResponse } from 'interfaces/apiResponse';
import { ICourse, ICourseAdvanced } from 'interfaces/course';
import { IPaginationParams } from 'interfaces/pagination';
import { IActionCreator } from 'store/interfaces';

import { enCourseStoreActions } from '../reducers/course';

export function requestCourseList(params: IPaginationParams = { page: 1, size: 10 }): IActionCreator<enCourseStoreActions> {
  return async (dispatch, getState) => {
    try {
      if (getState().course.isFetching) return;

      dispatch({ type: enCourseStoreActions.requestList });

      const { data, paginator } = await get<IPaginationApiResponse<ICourse[]>>('/courses', params);
      dispatch({
        type: enCourseStoreActions.receiveList,
        courses: data,
        pagination: paginator
      });
    } catch (error) {
      logError(error);
      dispatch({ type: enCourseStoreActions.receiveListError, error });
    }
  };
}

export function cleanCourseListError(): IActionCreator<enCourseStoreActions> {
  return dispatch => dispatch({ type: enCourseStoreActions.receiveListError, error: null });
}

export function requestCourseSave(model: ICourse): IActionCreator<enCourseStoreActions> {
  return async (dispatch, getState) => {
    try {
      dispatch({ type: enCourseStoreActions.requestSave, model });

      //TODO: save
      // const { data } = model.id ?
      //   await put(`/courses/${model.id}`, model) :
      //   await post('/courses', model);
      const data = await new Promise(resolve => setTimeout(() => resolve({ id: Date.now(), ...model }), 2000));

      dispatch({ type: enCourseStoreActions.receiveSave, course: data });
      requestCourseList(getState().course.pagination)(dispatch, getState);
    } catch (error) {
      logError(error);
      dispatch({ type: enCourseStoreActions.receiveSaveError, error });
    }
  };
}

export function requestCourseAdvancedSave(course: ICourse, model: ICourseAdvanced): IActionCreator<enCourseStoreActions> {
  return async (dispatch, getState) => {
    try {
      dispatch({ type: enCourseStoreActions.requestSave, model });

      //TODO: save
      // await put(`/courses/${course.id}/advanced`, model);
      const result = await new Promise<any>(resolve => setTimeout(() => resolve(model), 2000));
      course.advanced = result;

      dispatch({ type: enCourseStoreActions.receiveSave, course });
    } catch (error) {
      logError(error);
      dispatch({ type: enCourseStoreActions.receiveSaveError, error });
    }
  };
}

export function cleanCourseSaveError(): IActionCreator<enCourseStoreActions> {
  return dispatch => dispatch({ type: enCourseStoreActions.receiveSaveError, error: null });
}

export function requestCourseDelete(course: ICourse): IActionCreator<enCourseStoreActions> {
  return async (dispatch, getState) => {
    try {
      dispatch({ type: enCourseStoreActions.requestDelete, course });

      await del(`/courses/${course.id}`);

      dispatch({ type: enCourseStoreActions.receiveDelete, course });
      requestCourseList(getState().course.pagination)(dispatch, getState);
    } catch (error) {
      logError(error);
      dispatch({ type: enCourseStoreActions.receiveDeleteError, course, error });
    }
  };
}

export function cleanCourseDeleteError(course: ICourse): IActionCreator<enCourseStoreActions> {
  return dispatch => dispatch({ type: enCourseStoreActions.receiveDeleteError, course, error: null });
}