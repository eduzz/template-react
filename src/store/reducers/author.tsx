import { IAuthor } from 'interfaces/author';

export enum enAuthorStoreActions {
  openForm = 'AUTHOR_FORM_OPEN',
  closeForm = 'AUTHOR_FORM_CANCEL',

  requestList = 'AUTHOR_LIST_REQUEST',
  receiveList = 'AUTHOR_LIST_RECEIVE',
  receiveListError = 'AUTHOR_LIST_RECEIVE_ERROR',

  requestSave = 'AUTHOR_SAVE_REQUEST',
  receiveSave = 'AUTHOR_SAVE_RECEIVE',
  receiveSaveError = 'AUTHOR_SAVE_RECEIVE_ERROR'
}

export interface IAppStoreAuthorState {
  isFetching: boolean;
  isSaving: boolean;
  isFormOpened: boolean;
  authors: IAuthor[];
  saveError: any;
  error: any;
}

const initialState: IAppStoreAuthorState = {
  isFetching: false,
  isSaving: false,
  isFormOpened: false,
  authors: [],
  error: null,
  saveError: null
};

function author(state: IAppStoreAuthorState = initialState, action: any): IAppStoreAuthorState {
  switch (action.type as enAuthorStoreActions) {
    case enAuthorStoreActions.openForm:
    case enAuthorStoreActions.closeForm:
      return form(state, action);
    case enAuthorStoreActions.requestList:
    case enAuthorStoreActions.receiveList:
    case enAuthorStoreActions.receiveListError:
      return list(state, action);
    case enAuthorStoreActions.requestSave:
    case enAuthorStoreActions.receiveSave:
    case enAuthorStoreActions.receiveSaveError:
      return save(state, action);
    default:
      return state;
  }
}

function form(state: IAppStoreAuthorState, action: any): IAppStoreAuthorState {
  switch (action.type as enAuthorStoreActions) {
    case enAuthorStoreActions.openForm:
      return {
        ...state,
        isFormOpened: true
      };
    case enAuthorStoreActions.closeForm:
      return {
        ...state,
        isFormOpened: false
      };
    default:
      return state;
  }
}

function list(state: IAppStoreAuthorState, action: any): IAppStoreAuthorState {
  switch (action.type as enAuthorStoreActions) {
    case enAuthorStoreActions.requestList:
      return {
        ...state,
        isFetching: true,
        error: null
      };
    case enAuthorStoreActions.receiveList:
      return {
        ...state,
        isFetching: false,
        authors: (action.authors as IAuthor[] || [])
          .sort((a, b) => a.name > b.name ? 1 : a.name < b.name ? -1 : 0),
        error: null
      };
    case enAuthorStoreActions.receiveListError:
      return {
        ...state,
        isFetching: false,
        error: action.error
      };
    default:
      return state;
  }
}

function save(state: IAppStoreAuthorState, action: any): IAppStoreAuthorState {
  switch (action.type as enAuthorStoreActions) {
    case enAuthorStoreActions.requestSave:
      return {
        ...state,
        isSaving: true
      };
    case enAuthorStoreActions.receiveSave:
      return {
        ...state,
        isSaving: false,
        isFormOpened: false
      };
    case enAuthorStoreActions.receiveSaveError:
      return {
        ...state,
        isSaving: false,
        saveError: action.error
      };
    default:
      return state;
  }
}

export default author;
