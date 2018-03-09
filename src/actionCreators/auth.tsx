export const requestLogin = (creds: Object) => ({
  type: 'REQUEST_LOGIN',
  creds
});

export const receiveLogin = (user: any) => ({
  type: 'RECEIVE_LOGIN',
  token: user.token
});

export const receiveLoginError = (err: any) => ({
  type: 'RECEIVE_LOGIN_ERROR',
  err
});

export const logout = () => ({
  type: 'LOGOUT'
});
