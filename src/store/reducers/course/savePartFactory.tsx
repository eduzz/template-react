export type typeCourseSaveParts = 'ADVANCED' | 'CUSTOMIZATION';

export const courseStoreSavePartActions = {
  requestSave: (part: typeCourseSaveParts) => `COURSE_SAVE_${part}_REQUEST`,
  receiveSave: (part: typeCourseSaveParts) => `COURSE_SAVE_${part}_RECEIVE`,
  receiveSaveError: (part: typeCourseSaveParts) => `COURSE_SAVE_${part}_RECEIVE_ERROR`
};

export interface IAppStoreCourseSavePartState {
  isSaving: boolean;
  error: any;
}

export default function create(part: typeCourseSaveParts) {
  const initialState: IAppStoreCourseSavePartState = {
    isSaving: false,
    error: null
  };

  return (state: IAppStoreCourseSavePartState = initialState, action: any): IAppStoreCourseSavePartState => {
    switch (action.type) {
      case `COURSE_SAVE_${part}_REQUEST`:
        return {
          ...state,
          isSaving: true
        };
      case `COURSE_SAVE_${part}_RECEIVE`:
        return {
          ...state,
          isSaving: false
        };
      case `COURSE_SAVE_${part}_RECEIVE_ERROR`:
        return {
          ...state,
          isSaving: false,
          error: action.error
        };
      default:
        return state;
    }
  };
}