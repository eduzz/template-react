import { post } from 'api';
import { Dispatch } from 'react-redux';

export function openLoginDialog() {
  return (dispatch: Dispatch<any>) => {
    dispatch({ type: 'OPEN_LOGIN_DIALOG' });
  };
}

export function requestLogin(email: string, password: string) {
  return async (dispatch: Dispatch<any>) => {
    try {
      dispatch({ type: 'REQUEST_LOGIN' });

      const token = await post<string>('/auth/login', { email, password });
      dispatch({ type: 'RECEIVE_LOGIN', token });
    } catch (error) {
      dispatch({ type: 'RECEIVE_LOGIN_ERROR', error });
    }
  };
}

export function logout() {
  return async (dispatch: Dispatch<any>) => {
    dispatch({ type: 'LOGOUT' });
  };
}

export function clearLoginError() {
  return async (dispatch: Dispatch<any>) => {
    dispatch({ type: 'RECEIVE_LOGIN_ERROR', error: null });
  };
}