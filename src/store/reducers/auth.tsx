import { IUserToken } from 'interfaces/userToken';

export enum enAuthStoreActions {
  openLogin = 'AUTH_LOGIN_OPEN',
  requestLogin = 'AUTH_LOGIN_REQUEST',
  receiveLogin = 'AUTH_LOGIN_RECEIVE',
  receiveLoginError = 'AUTH_LOGIN_RECEIVE_ERROR',
  logout = 'AUTH_LOGOUT'
}

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
  switch (action.type as enAuthStoreActions) {
    case enAuthStoreActions.openLogin:
      return {
        ...state,
        isLoginFormOpened: true
      };
    case enAuthStoreActions.requestLogin:
      return {
        ...state,
        isFetching: true,
        isAuthenticated: false,
        authToken: null,
        error: null
      };
    case enAuthStoreActions.receiveLogin:
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
    case enAuthStoreActions.receiveLoginError:
      return {
        ...state,
        isFetching: false,
        error: action.error
      };
    case enAuthStoreActions.logout:
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
