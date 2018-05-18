import { ICourse } from 'interfaces/course';

export enum enCourseStoreActions {
  requestList = 'COURSE_LIST_REQUEST',
  receiveList = 'COURSE_LIST_RECEIVE',
  receiveListError = 'COURSE_LIST_RECEIVE_ERROR'
}

export interface IAppStoreCourseState {
  isFetching: boolean;
  courses: ICourse[];
  error: any;
}

const initialState: IAppStoreCourseState = {
  isFetching: false,
  courses: [],
  error: null
};

function course(state: IAppStoreCourseState = initialState, action: any): IAppStoreCourseState {
  switch (action.type as enCourseStoreActions) {
    case enCourseStoreActions.requestList:
      return {
        ...state,
        isFetching: true,
        error: null
      };
    case enCourseStoreActions.receiveList:
      return {
        ...state,
        isFetching: false,
        courses: action.courses || [],
        error: null
      };
    case enCourseStoreActions.receiveListError:
      return {
        ...state,
        isFetching: false,
        error: action.error
      };
    default:
      return state;
  }
}

export default course;
