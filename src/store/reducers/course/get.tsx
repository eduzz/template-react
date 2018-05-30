import { ICourse } from 'interfaces/course';

export enum enCourseStoreGetActions {
  request = 'COURSE_GET_REQUEST',
  receive = 'COURSE_GET_RECEIVE',
  receiveError = 'COURSE_GET_RECEIVE_ERROR',
}

export interface IAppStoreCourseGetState {
  isFetching: boolean;
  course: ICourse;
  error: any;
}

const initialState: IAppStoreCourseGetState = {
  isFetching: false,
  course: null,
  error: null
};

export default function get(state: IAppStoreCourseGetState = initialState, action: any): IAppStoreCourseGetState {
  switch (action.type as enCourseStoreGetActions) {
    case enCourseStoreGetActions.request:
      return {
        ...state,
        isFetching: true,
        course: null,
        error: null
      };
    case enCourseStoreGetActions.receive:
      return {
        ...state,
        isFetching: false,
        course: action.course
      };
    case enCourseStoreGetActions.receiveError:
      return {
        ...state,
        isFetching: false,
        course: null,
        error: action.error
      };
    default:
      return state;
  }
}