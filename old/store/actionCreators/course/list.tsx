import { del, get } from 'api';
import { logError } from 'errorHandler';
import { IPaginationApiResponse } from 'interfaces/apiResponse';
import { ICourse } from 'interfaces/course';
import { IPaginationParams } from 'interfaces/pagination';
import { IActionCreator } from 'store/interfaces';

import { enCourseStoreListActions } from '../../reducers/course/list';

export function requestCourseList(params: IPaginationParams = { page: 1, size: 10 }): IActionCreator<enCourseStoreListActions> {
  return async (dispatch, getState) => {
    try {
      if (getState().course.list.isFetching) return;

      dispatch({ type: enCourseStoreListActions.requestList });

      const { data, paginator } = await get<IPaginationApiResponse<ICourse[]>>('/courses', params);
      dispatch({
        type: enCourseStoreListActions.receiveList,
        courses: data,
        pagination: paginator
      });
    } catch (error) {
      logError(error);
      dispatch({ type: enCourseStoreListActions.receiveListError, error });
    }
  };
}

export function cleanCourseListError(): IActionCreator<enCourseStoreListActions> {
  return dispatch => dispatch({ type: enCourseStoreListActions.receiveListError, error: null });
}

export function requestCourseDelete(course: ICourse): IActionCreator<enCourseStoreListActions> {
  return async (dispatch, getState) => {
    try {
      dispatch({ type: enCourseStoreListActions.requestDelete, course });

      await del(`/courses/${course.id}`);

      dispatch({ type: enCourseStoreListActions.receiveDelete, course });
      requestCourseList(getState().course.list.pagination)(dispatch, getState);
    } catch (error) {
      logError(error);
      dispatch({ type: enCourseStoreListActions.receiveDeleteError, course, error });
    }
  };
}

export function cleanCourseDeleteError(course: ICourse): IActionCreator<enCourseStoreListActions> {
  return dispatch => dispatch({ type: enCourseStoreListActions.receiveDeleteError, course, error: null });
}