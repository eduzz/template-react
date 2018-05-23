import { del, get } from 'api';
import { logError } from 'errorHandler';
import { IPaginationApiResponse } from 'interfaces/apiResponse';
import { ICourse } from 'interfaces/course';
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

export function requestCourseSave(data: ICourse): IActionCreator<enCourseStoreActions> {
  return async (dispatch, getState) => {
    try {
      dispatch({ type: enCourseStoreActions.requestSave, data });

      await new Promise((resolve, reject) => setTimeout(() => {
        if (Math.random() > 0.8) return reject(Error('Tste'));
        dispatch({ type: enCourseStoreActions.receiveSave, data });
        requestCourseList(getState().course.pagination)(dispatch, getState);
      }, 2000));
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