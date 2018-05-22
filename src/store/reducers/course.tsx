import { ICourse } from 'interfaces/course';

export enum enCourseStoreActions {
  requestList = 'COURSE_LIST_REQUEST',
  receiveList = 'COURSE_LIST_RECEIVE',
  receiveListError = 'COURSE_LIST_RECEIVE_ERROR',

  requestSave = 'COURSE_SAVE_REQUEST',
  receiveSave = 'COURSE_SAVE_RECEIVE',
  receiveSaveError = 'COURSE_SAVE_RECEIVE_ERROR'
}

export interface IAppStoreCourseState {
  isFetching: boolean;
  isSaving: boolean;
  courses: ICourse[];
  saveError: any;
  error: any;
}

const initialState: IAppStoreCourseState = {
  isFetching: false,
  isSaving: false,
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
        courses: (action.courses || []).map((c: ICourse, index: number) => ({ ...c, index })),
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