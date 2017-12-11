export const submitLogin = (email, password) => ({
    type: 'SUBMIT_LOGIN',
    email,
    password,
});

export const submitLoginError = err => ({
    type: 'SUBMIT_LOGIN_ERROR',
    err,
});

export const receiveToken = token => ({
    type: 'RECEIVE_TOKEN',
    token,
});
