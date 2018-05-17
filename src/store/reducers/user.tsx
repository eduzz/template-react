import { IUser } from 'interfaces/user';

export type typeAppStoreUserActions =
  'OPEN_USER_FORM_DIALOG' | 'CANCEL_USER_FORM_DIALOG' |
  'REQUEST_USER_LIST' | 'RECEIVE_USER_LIST' | 'RECEIVE_USER_LIST_ERROR' |
  'REQUEST_USER_DELETE' | 'RECEIVE_USER_DELETE' | 'RECEIVE_USER_DELETE_ERROR' |
  'REQUEST_USER_SAVE' | 'RECEIVED_USER_SAVE' | 'RECEIVED_USER_SAVE_ERROR';

export interface IAppStoreUserState {
  isFetching: boolean;
  isSaving: boolean;
  users: IUser[];
  error: any;
  saveError: any;
  isUserFormModalOpened: boolean;
}

const initialState: IAppStoreUserState = {
  isFetching: false,
  isSaving: false,
  users: [],
  error: null,
  saveError: null,
  isUserFormModalOpened: false
};

function user(state: IAppStoreUserState = initialState, action: any): IAppStoreUserState {
  switch (action.type as typeAppStoreUserActions) {
    case 'OPEN_USER_FORM_DIALOG':
      return {
        ...state,
        isUserFormModalOpened: true
      };
    case 'CANCEL_USER_FORM_DIALOG':
      return {
        ...state,
        isUserFormModalOpened: false
      };
    case 'REQUEST_USER_LIST':
      return {
        ...state,
        isFetching: true,
        error: null
      };
    case 'RECEIVE_USER_LIST':
      return {
        ...state,
        isFetching: false,
        users: action.users.map((u: IUser, index: number) => ({ ...u, index })),
        error: null
      };
    case 'RECEIVE_USER_LIST_ERROR':
      return {
        ...state,
        isFetching: false,
        error: action.error
      };
    case 'REQUEST_USER_DELETE':
      return {
        ...state,
        users: [
          ...state.users.slice(0, action.user.index),
          { ...action.user, isFetching: true },
          ...state.users.slice(action.user.index + 1)
        ]
      };
    case 'RECEIVE_USER_DELETE':
      return {
        ...state,
        users: ([
          ...state.users.slice(0, action.user.index),
          ...state.users.slice(action.user.index + 1)
        ]).map((u: IUser, index: number) => ({ ...u, index }))
      };
    case 'RECEIVE_USER_DELETE_ERROR':
      return {
        ...state,
        users: [
          ...state.users.slice(0, action.user.index),
          { ...action.user, isFetching: false, error: action.error },
          ...state.users.slice(action.user.index + 1)
        ]
      };
    case 'REQUEST_USER_SAVE':
      return {
        ...state,
        isSaving: true
      };
    case 'RECEIVED_USER_SAVE':
      return {
        ...state,
        isSaving: false,
        isUserFormModalOpened: false
      };
    case 'RECEIVED_USER_SAVE_ERROR':
      return {
        ...state,
        isSaving: false,
        saveError: action.error
      };
    default:
      return state;
  }
}

export default user;
