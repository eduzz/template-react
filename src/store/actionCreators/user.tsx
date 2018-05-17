import { logError } from 'errorHandler';
import { IUser } from 'interfaces/user';
import { IAppDispatcher, IAppStoreState } from 'store/interfaces';

import { typeAppStoreUserActions } from '../reducers/user';

export function openUserFormModal() {
  return async (dispatch: IAppDispatcher<typeAppStoreUserActions>, getState: () => IAppStoreState) => {
    dispatch({ type: 'OPEN_USER_FORM_DIALOG' });
  };
}

export function cancelUserFormModal() {
  return async (dispatch: IAppDispatcher<typeAppStoreUserActions>, getState: () => IAppStoreState) => {
    dispatch({ type: 'CANCEL_USER_FORM_DIALOG' });
  };
}

export function requestUserList<T>() {
  return async (dispatch: IAppDispatcher<typeAppStoreUserActions>, getState: () => IAppStoreState) => {
    try {
      if (getState().user.isFetching) return;
      dispatch({ type: 'REQUEST_USER_LIST' });

      await new Promise((resolve, reject) => setTimeout(() => {
        if (Math.random() > 0.8) return reject(Error('Tste'));

        dispatch({
          type: 'RECEIVE_USER_LIST', users: new Array(152).fill('').map<IUser>((v, index) => ({
            id: index,
            name: 'Daniel Prado ' + index,
            email: `daniel.prado.${index}@eduzz.com`,
            course: 'Curso de Teste',
            group: 'Administradores'
          }))
        });
        resolve();
      }, 2000));
    } catch (error) {
      logError(error);
      dispatch({ type: 'RECEIVE_USER_LIST_ERROR', error });
    }
  };
}

export function cleanListError() {
  return async (dispatch: IAppDispatcher<typeAppStoreUserActions>) => {
    dispatch({ type: 'RECEIVE_USER_LIST_ERROR', error: null });
  };
}

export function requestUserDelete(user: IUser) {
  return async (dispatch: IAppDispatcher<typeAppStoreUserActions>) => {
    try {
      dispatch({ type: 'REQUEST_USER_DELETE', user });

      await new Promise((resolve, reject) => setTimeout(() => {
        if (Math.random() > 0.5) return reject(Error('Tste'));

        dispatch({ type: 'RECEIVE_USER_DELETE', user });
      }, 1000));
    } catch (error) {
      logError(error);
      dispatch({ type: 'RECEIVE_USER_DELETE_ERROR', user, error });
    }
  };
}

export function cleanUserDeleteError(user: IUser) {
  return (dispatch: IAppDispatcher<typeAppStoreUserActions>) => {
    dispatch({ type: 'RECEIVE_USER_DELETE_ERROR', user, error: null });
  };
}

export function requestUserSave(data: { email: string, group: number, course: number }) {
  return async (dispatch: IAppDispatcher<typeAppStoreUserActions>) => {
    try {
      dispatch({ type: 'REQUEST_USER_SAVE', data });

      await new Promise((resolve, reject) => setTimeout(() => {
        if (Math.random() > 0.8) return reject(Error('Tste'));
        dispatch({ type: 'RECEIVED_USER_SAVE', data });
      }, 2000));
    } catch (error) {
      logError(error);
      dispatch({ type: 'RECEIVED_USER_SAVE_ERROR', error });
    }
  };
}

export function cleanUserSaveError() {
  return (dispatch: IAppDispatcher<typeAppStoreUserActions>) => {
    dispatch({ type: 'RECEIVED_USER_SAVE_ERROR', error: null });
  };
}