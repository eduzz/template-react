import { ICourse } from 'interfaces/course';
import { IPaginationResponse } from 'interfaces/pagination';

export enum enCourseStoreActions {
  requestList = 'COURSE_LIST_REQUEST',
  receiveList = 'COURSE_LIST_RECEIVE',
  receiveListError = 'COURSE_LIST_RECEIVE_ERROR',

  requestSave = 'COURSE_SAVE_REQUEST',
  receiveSave = 'COURSE_SAVE_RECEIVE',
  receiveSaveError = 'COURSE_SAVE_RECEIVE_ERROR',

  requestDelete = 'COURSE_DELETE_REQUEST',
  receiveDelete = 'COURSE_DELETE_RECEIVE',
  receiveDeleteError = 'COURSE_DELETE_RECEIVE_ERROR'
}

export interface IAppStoreCourseState {
  isFetching: boolean;
  isSaving: boolean;
  courses: ICourse[];
  pagination: IPaginationResponse;
  saveError: any;
  error: any;
}

const initialState: IAppStoreCourseState = {
  isFetching: false,
  isSaving: false,
  pagination: { page: 1, size: 10, totalRows: 0, totalPages: 0 },
  courses: [],
  saveError: null,
  error: null
};

export default function course(state: IAppStoreCourseState = initialState, action: any): IAppStoreCourseState {
  switch (action.type as enCourseStoreActions) {
    case enCourseStoreActions.requestList:
    case enCourseStoreActions.receiveList:
    case enCourseStoreActions.receiveListError:
      return list(state, action);
    case enCourseStoreActions.requestSave:
    case enCourseStoreActions.receiveSave:
    case enCourseStoreActions.receiveSaveError:
      return save(state, action);
    case enCourseStoreActions.requestDelete:
    case enCourseStoreActions.receiveDelete:
    case enCourseStoreActions.receiveDeleteError:
      return del(state, action);
    default:
      return state;
  }
}

function list(state: IAppStoreCourseState, action: any): IAppStoreCourseState {
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
        pagination: action.pagination,
        courses: (action.courses as ICourse[] || [])
          .map((c: ICourse, index: number) => ({ ...c, index })),
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

function save(state: IAppStoreCourseState, action: any): IAppStoreCourseState {
  switch (action.type as enCourseStoreActions) {
    case enCourseStoreActions.requestSave:
      return {
        ...state,
        isSaving: true
      };
    case enCourseStoreActions.receiveSave:
      return {
        ...state,
        isSaving: false
      };
    case enCourseStoreActions.receiveSaveError:
      return {
        ...state,
        isSaving: false,
        saveError: action.error
      };
    default:
      return state;
  }
}

function del(state: IAppStoreCourseState = initialState, action: any): IAppStoreCourseState {
  switch (action.type as enCourseStoreActions) {
    case enCourseStoreActions.requestDelete:
      return {
        ...state,
        courses: [
          ...state.courses.slice(0, action.course.index),
          { ...action.course, isFetching: true },
          ...state.courses.slice(action.course.index + 1)
        ]
      };
    case enCourseStoreActions.receiveDelete:
      return {
        ...state,
        courses: ([
          ...state.courses.slice(0, action.course.index),
          ...state.courses.slice(action.course.index + 1)
        ]).map((a: ICourse, index: number) => ({ ...a, index }))
      };
    case enCourseStoreActions.receiveDeleteError:
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