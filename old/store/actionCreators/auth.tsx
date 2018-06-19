import { post } from 'api';
import { logError } from 'errorHandler';
import { IActionCreator } from 'store/interfaces';

import { enAuthStoreActions } from '../reducers/auth';

export function openLoginDialog(): IActionCreator<enAuthStoreActions> {
  return dispatch => dispatch({ type: enAuthStoreActions.openLogin });
}

export function requestLogin<T>(username: T, password: string): IActionCreator<enAuthStoreActions> {
  return async dispatch => {
    try {
      dispatch({ type: enAuthStoreActions.requestLogin });

      const { data } = await post('/oauth/token', { username, password });
      const user = JSON.parse(atob(data.token.split('.')[1]));

      dispatch({ type: enAuthStoreActions.receiveLogin, token: data.token, user });
    } catch (error) {
      logError(error);
      dispatch({ type: enAuthStoreActions.receiveLoginError, error });
    }
  };
}

export function logout(): IActionCreator<enAuthStoreActions> {
  return async dispatch => dispatch({ type: enAuthStoreActions.logout });
}

export function clearLoginError(): IActionCreator<enAuthStoreActions> {
  return async dispatch => dispatch({ type: enAuthStoreActions.receiveLoginError, error: null });
}