import { post } from 'agent';

const receiveLogin = (user: any) => ({
  type: 'RECEIVE_LOGIN',
  token: user.token
});

const receiveLoginError = (err: any) => ({
  type: 'RECEIVE_LOGIN_ERROR',
  err
});

export const requestLogin = (creds: Object) =>
  (dispatch: any) => {
    dispatch({
      type: 'REQUEST_LOGIN',
    });

    post({ url: '/oauth/token', data: creds }).then(
      res => dispatch(receiveLogin(res.data.data)),
      err => dispatch(receiveLoginError(err)),
    );
  };

export const logout = () => ({
  type: 'LOGOUT'
});
