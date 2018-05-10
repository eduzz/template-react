import { post } from 'api';
import { IAppDispatcher } from 'store/interfaces';

import { typeAppStoreAuthActions } from '../reducers/auth';

export function openLoginDialog() {
  return (dispatch: IAppDispatcher<typeAppStoreAuthActions>) => {
    dispatch({ type: 'OPEN_LOGIN_DIALOG' });
  };
}

export function requestLogin<T>(email: T, password: string) {
  return async (dispatch: IAppDispatcher<typeAppStoreAuthActions>) => {
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
  return async (dispatch: IAppDispatcher<typeAppStoreAuthActions>) => {
    dispatch({ type: 'LOGOUT' });
  };
}

export function clearLoginError() {
  return async (dispatch: IAppDispatcher<typeAppStoreAuthActions>) => {
    dispatch({ type: 'RECEIVE_LOGIN_ERROR', error: null });
  };
}