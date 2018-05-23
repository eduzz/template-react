import { IUser } from 'interfaces/user';

export enum enUserStoreActions {
  openForm = 'USER_FORM_OPEN',
  closeForm = 'USER_FORM_CANCEL',

  requestList = 'USER_LIST_REQUEST',
  receiveList = 'USER_LIST_RECEIVE',
  receiveListError = 'USER_LIST_RECEIVE_ERROR',

  requestDelete = 'USER_DELETE_REQUEST',
  receiveDelete = 'USER_DELETE_RECEIVE',
  receiveDeleteError = 'USER_DELETE_RECEIVE_ERROR',

  requestSave = 'USER_SAVE_REQUEST',
  receiveSave = 'USER_SAVE_RECEIVE',
  receiveSaveError = 'USER_SAVE_RECEIVE_ERROR'
}

export interface IAppStoreUserState {
  isFetching: boolean;
  isSaving: boolean;
  users: IUser[];
  error: any;
  saveError: any;
  isFormOpened: boolean;
}

const initialState: IAppStoreUserState = {
  isFetching: false,
  isSaving: false,
  users: [],
  error: null,
  saveError: null,
  isFormOpened: false
};

export default function user(state: IAppStoreUserState = initialState, action: any): IAppStoreUserState {
  switch (action.type as enUserStoreActions) {
    case enUserStoreActions.openForm:
    case enUserStoreActions.closeForm:
      return form(state, action);

    case enUserStoreActions.requestList:
    case enUserStoreActions.receiveList:
    case enUserStoreActions.receiveListError:
      return list(state, action);

    case enUserStoreActions.requestDelete:
    case enUserStoreActions.receiveDelete:
    case enUserStoreActions.receiveDeleteError:
      return del(state, action);

    case enUserStoreActions.requestSave:
    case enUserStoreActions.receiveSave:
    case enUserStoreActions.receiveSaveError:
      return save(state, action);
    default:
      return state;
  }
}

function form(state: IAppStoreUserState, action: any): IAppStoreUserState {
  switch (action.type as enUserStoreActions) {
    case enUserStoreActions.openForm:
      return {
        ...state,
        isFormOpened: true
      };
    case enUserStoreActions.closeForm:
      return {
        ...state,
        isFormOpened: false
      };
    default:
      return state;
  }
}

function list(state: IAppStoreUserState, action: any): IAppStoreUserState {
  switch (action.type as enUserStoreActions) {
    case enUserStoreActions.requestList:
      return {
        ...state,
        isFetching: true,
        error: null
      };
    case enUserStoreActions.receiveList:
      return {
        ...state,
        isFetching: false,
        users: (action.users as IUser[] || [])
          .map((a: IUser, index: number) => ({ ...a, index }))
          .sort((a, b) => a.name > b.name ? 1 : a.name < b.name ? -1 : 0),
        error: null
      };
    case enUserStoreActions.receiveListError:
      return {
        ...state,
        isFetching: false,
        error: action.error
      };
    default:
      return state;
  }
}

function save(state: IAppStoreUserState, action: any): IAppStoreUserState {
  switch (action.type as enUserStoreActions) {
    case enUserStoreActions.requestSave:
      return {
        ...state,
        isSaving: true
      };
    case enUserStoreActions.receiveSave:
      const user: IUser = action.user;

      const users = state.users.filter(a => a.id !== user.id);
      users.push(user);

      return {
        ...state,
        isSaving: false,
        isFormOpened: false,
        users: users
          .map((a: IUser, index: number) => ({ ...a, index }))
          .sort((a, b) => a.name > b.name ? 1 : a.name < b.name ? -1 : 0)
      };
    case enUserStoreActions.receiveSaveError:
      return {
        ...state,
        isSaving: false,
        saveError: action.error
      };
    default:
      return state;
  }
}

function del(state: IAppStoreUserState = initialState, action: any): IAppStoreUserState {
  switch (action.type as enUserStoreActions) {
    case enUserStoreActions.requestDelete:
      return {
        ...state,
        users: [
          ...state.users.slice(0, action.user.index),
          { ...action.user, isFetching: true },
          ...state.users.slice(action.user.index + 1)
        ]
      };
    case enUserStoreActions.receiveDelete:
      return {
        ...state,
        users: ([
          ...state.users.slice(0, action.user.index),
          ...state.users.slice(action.user.index + 1)
        ]).map((a: IUser, index: number) => ({ ...a, index }))
      };
    case enUserStoreActions.receiveDeleteError:
      return {
        ...state,
        users: [
          ...state.users.slice(0, action.user.index),
          { ...action.user, isFetching: false, error: action.error },
          ...state.users.slice(action.user.index + 1)
        ]
      };
    default:
      return state;
  }
}