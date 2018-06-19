import { ICourse } from 'interfaces/course';
import { IPaginationResponse } from 'interfaces/pagination';

export enum enCourseStoreListActions {
  requestList = 'COURSE_LIST_REQUEST',
  receiveList = 'COURSE_LIST_RECEIVE',
  receiveListError = 'COURSE_LIST_RECEIVE_ERROR',

  requestDelete = 'COURSE_DELETE_REQUEST',
  receiveDelete = 'COURSE_DELETE_RECEIVE',
  receiveDeleteError = 'COURSE_DELETE_RECEIVE_ERROR'
}

export interface IAppStoreCourseListState {
  isFetching: boolean;
  courses: ICourse[];
  pagination: IPaginationResponse;
  error: any;
}

const initialState: IAppStoreCourseListState = {
  isFetching: false,
  pagination: { page: 1, size: 10, totalRows: 0, totalPages: 0 },
  courses: [],
  error: null
};

export default function course(state: IAppStoreCourseListState = initialState, action: any): IAppStoreCourseListState {
  switch (action.type as enCourseStoreListActions) {
    case enCourseStoreListActions.requestList:
    case enCourseStoreListActions.receiveList:
    case enCourseStoreListActions.receiveListError:
      return list(state, action);
    case enCourseStoreListActions.requestDelete:
    case enCourseStoreListActions.receiveDelete:
    case enCourseStoreListActions.receiveDeleteError:
      return del(state, action);
    default:
      return state;
  }
}

function list(state: IAppStoreCourseListState, action: any): IAppStoreCourseListState {
  switch (action.type as enCourseStoreListActions) {
    case enCourseStoreListActions.requestList:
      return {
        ...state,
        isFetching: true,
        error: null
      };
    case enCourseStoreListActions.receiveList:
      return {
        ...state,
        isFetching: false,
        pagination: action.pagination,
        courses: (action.courses as ICourse[] || [])
          .map((c: ICourse, index: number) => ({ ...c, index })),
        error: null
      };
    case enCourseStoreListActions.receiveListError:
      return {
        ...state,
        isFetching: false,
        error: action.error
      };
    default:
      return state;
  }
}

function del(state: IAppStoreCourseListState = initialState, action: any): IAppStoreCourseListState {
  switch (action.type as enCourseStoreListActions) {
    case enCourseStoreListActions.requestDelete:
      return {
        ...state,
        courses: [
          ...state.courses.slice(0, action.course.index),
          { ...action.course, isFetching: true },
          ...state.courses.slice(action.course.index + 1)
        ]
      };
    case enCourseStoreListActions.receiveDelete:
      return {
        ...state,
        courses: ([
          ...state.courses.slice(0, action.course.index),
          ...state.courses.slice(action.course.index + 1)
        ]).map((a: ICourse, index: number) => ({ ...a, index }))
      };
    case enCourseStoreListActions.receiveDeleteError:
      return {
        ...state,
        courses: [
          ...state.courses.slice(0, action.course.index),
          { ...action.course, isFetching: false, error: action.error },
          ...state.courses.slice(action.course.index + 1)
        ]
      };
    default:
      return state;
  }
}