const initialState = {
  isFetching: false,
  isAuthenticated: !!localStorage.getItem('authToken')
};

const auth = (state: any = initialState, action: any) => {
  switch (action.type) {
    case 'REQUEST_LOGIN':
      return {
        ...state,
        isFetching: true,
        isAuthenticated: false
      };
    case 'RECEIVE_LOGIN':
      localStorage.setItem('authToken', action.token);
      window.location.href = '/producer';

      return {
        ...state,
        isFetching: false,
        isAuthenticated: true,
        err: ''
      };
    case 'RECEIVE_LOGIN_ERROR':
      return {
        ...state,
        isFetching: false,
        isAuthenticated: false,
        err: action.err
      };
    case 'LOGOUT':
      localStorage.removeItem('authToken');
      window.location.href = '/login';

      return {
        ...state,
        isFetching: false,
        isAuthenticated: false
      };
    default:
      return state;
  }
};

export default auth;
