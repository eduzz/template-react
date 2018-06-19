import { ICourse } from 'interfaces/course';

export enum enCourseStoreSaveActions {
  requestSave = 'COURSE_SAVE_REQUEST',
  receiveSave = 'COURSE_SAVE_RECEIVE',
  receiveSaveError = 'COURSE_SAVE_RECEIVE_ERROR',
}

export interface IAppStoreCourseSaveState {
  isSaving: boolean;
  lastSaved: ICourse;
  error: any;
}

const initialState: IAppStoreCourseSaveState = {
  isSaving: false,
  lastSaved: null,
  error: null
};

export default function save(state: IAppStoreCourseSaveState = initialState, action: any): IAppStoreCourseSaveState {
  switch (action.type as enCourseStoreSaveActions) {
    case enCourseStoreSaveActions.requestSave:
      return {
        ...state,
        isSaving: true
      };
    case enCourseStoreSaveActions.receiveSave:
      return {
        ...state,
        isSaving: false,
        lastSaved: action.course
      };
    case enCourseStoreSaveActions.receiveSaveError:
      return {
        ...state,
        isSaving: false,
        error: action.error
      };
    default:
      return state;
  }
}