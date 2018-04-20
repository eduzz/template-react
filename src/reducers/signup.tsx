const initialState = {
  isFetching: false,
  isAuthenticated: false
};

const signup = (state: any = initialState, action: any) => {
  switch (action.type) {
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
    default:
      return state;
  }
};

export default signup;
