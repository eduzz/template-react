import { get } from 'api';
import { logError } from 'errorHandler';
import { IApiResponse } from 'interfaces/apiResponse';
import { ICourse, ICourseAdvanced, ICourseCustomization } from 'interfaces/course';
import { IActionCreator } from 'store';
import { enCourseStoreGetActions } from 'store/reducers/course/get';

export function requestGet(courseId: number): IActionCreator<enCourseStoreGetActions> {
  return async (dispatch, getState) => {
    try {
      const state = getState().course.get;
      if (state.isFetching) return;

      dispatch({ type: enCourseStoreGetActions.request });

      const [{ data: course }, { data: advanced }, { data: customization }] = await Promise.all([
        get<IApiResponse<ICourse>>(`/courses/${courseId}`),
        get<IApiResponse<ICourseAdvanced>>(`/courses/${courseId}/advanced`),
        get<IApiResponse<ICourseCustomization>>(`/courses/${courseId}/customization`)
      ]);

      course.advanced = advanced;
      course.customization = customization;

      dispatch({ type: enCourseStoreGetActions.receive, course });
    } catch (error) {
      logError(error);
      dispatch({ type: enCourseStoreGetActions.receiveError, error });
    }
  };
}

export function clearGet(): IActionCreator<enCourseStoreGetActions> {
  return dispatch => dispatch({ type: enCourseStoreGetActions.receive, course: null });
}