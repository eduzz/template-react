export const requestLogin = creds => ({
  type: 'REQUEST_LOGIN',
  creds
});

export const receiveLogin = user => ({
  type: 'RECEIVE_LOGIN',
  token: user.token
});

export const receiveLoginError = err => ({
  type: 'RECEIVE_LOGIN_ERROR',
  err
});

export const logout = () => ({
  type: 'LOGOUT'
});
