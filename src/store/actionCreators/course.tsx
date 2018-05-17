import { get } from 'api';
import { logError } from 'errorHandler';
import { IAppDefaultApiResponse } from 'interfaces/apiResponse';
import { ICourse } from 'interfaces/course';
import { IAppDispatcher, IAppStoreState } from 'store/interfaces';

import { typeAppStoreCourseActions } from '../reducers/course';

export function requestCourseList() {
  return async (dispatch: IAppDispatcher<typeAppStoreCourseActions>, getState: () => IAppStoreState) => {
    try {
      if (getState().course.isFetching) return;

      dispatch({ type: 'REQUEST_COURSE_LIST' });

      const { data } = await get<IAppDefaultApiResponse<ICourse[]>>('/courses');
      dispatch({ type: 'RECEIVED_COURSE_LIST', courses: data });
    } catch (error) {
      logError(error);
      dispatch({ type: 'RECEIVED_COURSE_LIST_ERROR', error });
    }
  };
}

export function cleanCourseListError() {
  return (dispatch: IAppDispatcher<typeAppStoreCourseActions>) => {
    dispatch({ type: 'RECEIVED_COURSE_LIST_ERROR', error: null });
  };
}