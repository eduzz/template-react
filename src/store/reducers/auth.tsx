import { IUserToken } from 'interfaces/userToken';

export type typeAppStoreAuthActions = 'OPEN_LOGIN_DIALOG' | 'REQUEST_LOGIN' | 'RECEIVE_LOGIN' | 'RECEIVE_LOGIN_ERROR' | 'LOGOUT';

export interface IAppStoreAuthState {
  isLoginFormOpened: boolean;
  isFetching: boolean;
  isAuthenticated: boolean;
  authToken: string;
  user: IUserToken;
  error: any;
}

const authToken = localStorage.getItem('EDUZZ_PRODUCER_AUTHTOKEN');

const initialState: IAppStoreAuthState = {
  isLoginFormOpened: false,
  isFetching: false,
  isAuthenticated: !!authToken,
  authToken,
  error: null,
  user: authToken ? JSON.parse(atob(authToken.split('.')[1])) : null
};

function auth(state: IAppStoreAuthState = initialState, action: any): IAppStoreAuthState {
  switch (action.type as typeAppStoreAuthActions) {
    case 'OPEN_LOGIN_DIALOG':
      return {
        ...state,
        isLoginFormOpened: true
      };
    case 'REQUEST_LOGIN':
      return {
        ...state,
        isFetching: true,
        isAuthenticated: false,
        authToken: null,
        error: null
      };
    case 'RECEIVE_LOGIN':
      const { token, user } = action;
      localStorage.setItem('EDUZZ_PRODUCER_AUTHTOKEN', token);

      return {
        ...state,
        authToken: token,
        user,
        isFetching: false,
        isAuthenticated: true,
        isLoginFormOpened: false,
        error: null
      };
    case 'RECEIVE_LOGIN_ERROR':
      return {
        ...state,
        isFetching: false,
        error: action.error
      };
    case 'LOGOUT':
      localStorage.removeItem('EDUZZ_PRODUCER_AUTHTOKEN');

      return {
        ...state,
        isLoginFormOpened: true,
        isAuthenticated: false,
        authToken: null
      };
    default:
      return state;
  }
}

export default auth;
