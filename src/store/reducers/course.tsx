import { ICourse } from 'interfaces/course';

export type typeAppStoreCourseActions = 'REQUEST_COURSE_LIST' | 'RECEIVED_COURSE_LIST' | 'RECEIVED_COURSE_LIST_ERROR';

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
  switch (action.type as typeAppStoreCourseActions) {
    case 'REQUEST_COURSE_LIST':
      return {
        ...state,
        isFetching: true,
        error: null
      };
    case 'RECEIVED_COURSE_LIST':
      return {
        ...state,
        isFetching: false,
        courses: action.courses || [],
        error: null
      };
    case 'RECEIVED_COURSE_LIST_ERROR':
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
