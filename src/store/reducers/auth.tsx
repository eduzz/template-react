export type typeAppStoreAuthActions = 'OPEN_LOGIN_DIALOG' | 'REQUEST_LOGIN' | 'RECEIVE_LOGIN' | 'RECEIVE_LOGIN_ERROR' | 'LOGOUT';

export interface IAppStoreAuthState {
  isLoginFormOpened: boolean;
  isFetching: boolean;
  isAuthenticated: boolean;
  authToken: string;
  error: any;
}

const initialState: IAppStoreAuthState = {
  isLoginFormOpened: false,
  isFetching: false,
  isAuthenticated: !!localStorage.getItem('EDUZZ_PRODUCER_AUTHTOKEN'),
  authToken: localStorage.getItem('EDUZZ_PRODUCER_AUTHTOKEN'),
  error: null
};

function auth(state: IAppStoreAuthState = initialState, action: any): IAppStoreAuthState {
  switch (action.type) {
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
      localStorage.setItem('EDUZZ_PRODUCER_AUTHTOKEN', action.token);

      return {
        ...state,
        authToken: action.token,
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
