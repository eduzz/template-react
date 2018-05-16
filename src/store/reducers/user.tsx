import { IUser } from 'interfaces/user';

export type typeAppStoreUserActions =
  'OPEN_USER_FORM_DIALOG' | 'CANCEL_USER_FORM_DIALOG' |
  'REQUEST_USER_LIST' | 'RECEIVE_USER_LIST' | 'RECEIVE_USER_LIST_ERROR' |
  'REQUEST_USER_DELETE' | 'RECEIVE_USER_DELETE' | 'RECEIVE_USER_DELETE_ERROR';

export interface IAppStoreUserState {
  isFetching: boolean;
  users: IUser[];
  error: any;
  userFormModal: {
    isOpened: boolean;
    error: boolean;
  };
}

const initialState: IAppStoreUserState = {
  isFetching: false,
  users: [],
  error: null,
  userFormModal: {
    isOpened: false,
    error: null
  }
};

function user(state: IAppStoreUserState = initialState, action: any): IAppStoreUserState {
  switch (action.type as typeAppStoreUserActions) {
    case 'OPEN_USER_FORM_DIALOG':
      return {
        ...state,
        userFormModal: {
          ...state.userFormModal,
          isOpened: true,
          error: null
        }
      };
    case 'CANCEL_USER_FORM_DIALOG':
      return {
        ...state,
        userFormModal: {
          ...state.userFormModal,
          isOpened: false,
          error: null
        }
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
    default:
      return state;
  }
}

export default user;
