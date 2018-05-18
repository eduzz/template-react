import { get } from 'api';
import { logError } from 'errorHandler';
import { IAppDefaultApiResponse } from 'interfaces/apiResponse';
import { ICourse } from 'interfaces/course';
import { IActionCreator } from 'store/interfaces';

import { enCourseStoreActions } from '../reducers/course';

export function requestCourseList(): IActionCreator<enCourseStoreActions> {
  return async (dispatch, getState) => {
    try {
      if (getState().course.isFetching) return;

      dispatch({ type: enCourseStoreActions.requestList });

      const { data } = await get<IAppDefaultApiResponse<ICourse[]>>('/courses');
      dispatch({ type: enCourseStoreActions.receiveList, courses: data });
    } catch (error) {
      logError(error);
      dispatch({ type: enCourseStoreActions.receiveListError, error });
    }
  };
}

export function cleanCourseListError(): IActionCreator<enCourseStoreActions> {
  return dispatch => dispatch({ type: enCourseStoreActions.receiveListError, error: null });
}