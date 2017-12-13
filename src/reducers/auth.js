const initialState = {
    isFetching: false,
    isAuthenticated: !!localStorage.getItem('authToken'),
};

const auth = (state = initialState, action) => {
    switch (action.type) {
        case 'REQUEST_LOGIN':
            return {
                ...state,
                isFetching: true,
                isAuthenticated: false,
            };
        case 'RECEIVE_LOGIN':
            localStorage.setItem('authToken', action.token);

            return {
                ...state,
                isFetching: false,
                isAuthenticated: true,
                err: '',
            };
        case 'RECEIVE_LOGIN_ERROR':
            return {
                ...state,
                isFetching: false,
                isAuthenticated: false,
                err: action.err,
            };
        case 'LOGOUT':
            localStorage.removeItem('authToken');

            return {
                ...state,
                isFetching: false,
                isAuthenticated: false,
            };
        default:
            return state;
    }
};

export default auth;
