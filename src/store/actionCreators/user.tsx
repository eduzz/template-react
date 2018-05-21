import { logError } from 'errorHandler';
import { IUser } from 'interfaces/user';
import { IActionCreator } from 'store/interfaces';

import { enUserStoreActions } from '../reducers/user';

export function openUserFormModal(): IActionCreator<enUserStoreActions> {
  return async dispatch => dispatch({ type: enUserStoreActions.openForm });
}

export function cancelUserFormModal(): IActionCreator<enUserStoreActions> {
  return async dispatch => dispatch({ type: enUserStoreActions.closeForm });
}

export function requestUserList(): IActionCreator<enUserStoreActions> {
  return async (dispatch, getState) => {
    try {
      if (getState().user.isFetching) return;

      dispatch({ type: enUserStoreActions.requestList });

      await new Promise((resolve, reject) => setTimeout(() => {
        dispatch({
          type: enUserStoreActions.receiveList, users: new Array(5).fill('').map<IUser>((v, index) => ({
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
      dispatch({ type: enUserStoreActions.receiveListError, error });
    }
  };
}

export function cleanUserListError(): IActionCreator<enUserStoreActions> {
  return dispatch => dispatch({ type: enUserStoreActions.receiveListError, error: null });
}

export function requestUserDelete(user: IUser): IActionCreator<enUserStoreActions> {
  return async dispatch => {
    try {
      dispatch({ type: enUserStoreActions.requestDelete, user });

      await new Promise((resolve, reject) => setTimeout(() => {
        if (Math.random() > 0.5) return reject(Error('Tste'));

        dispatch({ type: enUserStoreActions.receiveDelete, user });
      }, 1000));
    } catch (error) {
      logError(error);
      dispatch({ type: enUserStoreActions.receiveDeleteError, user, error });
    }
  };
}

export function cleanUserDeleteError(user: IUser): IActionCreator<enUserStoreActions> {
  return dispatch => dispatch({ type: enUserStoreActions.receiveDeleteError, user, error: null });
}

export function requestUserSave(data: IUser): IActionCreator<enUserStoreActions> {
  return async (dispatch, getState) => {
    try {
      dispatch({ type: enUserStoreActions.requestSave, data });

      await new Promise((resolve, reject) => setTimeout(() => {
        if (Math.random() > 0.8) return reject(Error('Tste'));
        dispatch({ type: enUserStoreActions.receiveSave, data });
        requestUserList()(dispatch, getState);
      }, 2000));
    } catch (error) {
      logError(error);
      dispatch({ type: enUserStoreActions.receiveSaveError, error });
    }
  };
}

export function cleanUserSaveError(): IActionCreator<enUserStoreActions> {
  return dispatch => dispatch({ type: enUserStoreActions.receiveSaveError, error: null });
}