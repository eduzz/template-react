import { logError } from 'errorHandler';
import { IAccessGroup } from 'interfaces/accessGroup';
import { IActionCreator } from 'store/interfaces';

import { enAccessGroupStoreActions } from '../reducers/accessGroup';

export function openAccessGroupFormModal(): IActionCreator<enAccessGroupStoreActions> {
  return async (dispatch, getState) => dispatch({ type: enAccessGroupStoreActions.openForm });
}

export function cancelAccessGroupFormModal(): IActionCreator<enAccessGroupStoreActions> {
  return async (dispatch, getState) => dispatch({ type: enAccessGroupStoreActions.closeForm });
}

export function requestAccessGroupList(): IActionCreator<enAccessGroupStoreActions> {
  return async (dispatch, getState) => {
    try {
      if (getState().accessGroup.isFetching) return;

      dispatch({ type: enAccessGroupStoreActions.requestList });

      await new Promise((resolve, reject) => setTimeout(() => {
        dispatch({
          type: enAccessGroupStoreActions.receiveList, accessGroups: new Array(5).fill('').map<IAccessGroup>((v, index) => ({
            id: index,
            name: 'Group ' + index
          }))
        });
        resolve();
      }, 2000));
    } catch (error) {
      logError(error);
      dispatch({ type: enAccessGroupStoreActions.receiveListError, error });
    }
  };
}

export function cleanAccessGroupListError(): IActionCreator<enAccessGroupStoreActions> {
  return dispatch => dispatch({ type: enAccessGroupStoreActions.receiveListError, error: null });
}

export function requestAccessGroupDelete(accessGroup: IAccessGroup): IActionCreator<enAccessGroupStoreActions> {
  return async dispatch => {
    try {
      dispatch({ type: enAccessGroupStoreActions.requestDelete, accessGroup });

      await new Promise((resolve, reject) => setTimeout(() => {
        if (Math.random() > 0.5) return reject(Error('Tste'));

        dispatch({ type: enAccessGroupStoreActions.receiveDelete, accessGroup });
      }, 1000));
    } catch (error) {
      logError(error);
      dispatch({ type: enAccessGroupStoreActions.receiveDeleteError, accessGroup, error });
    }
  };
}

export function cleanAccessGroupDeleteError(accessGroup: IAccessGroup): IActionCreator<enAccessGroupStoreActions> {
  return dispatch => dispatch({ type: enAccessGroupStoreActions.receiveDeleteError, accessGroup, error: null });
}

export function requestAccessGroupSave(data: IAccessGroup): IActionCreator<enAccessGroupStoreActions> {
  return async dispatch => {
    try {
      dispatch({ type: enAccessGroupStoreActions.requestSave, data });

      await new Promise((resolve, reject) => setTimeout(() => {
        if (Math.random() > 0.8) return reject(Error('Tste'));
        dispatch({ type: enAccessGroupStoreActions.receiveSave, data });
      }, 2000));
    } catch (error) {
      logError(error);
      dispatch({ type: enAccessGroupStoreActions.receiveSaveError, error });
    }
  };
}

export function cleanAccessGroupSaveError(): IActionCreator<enAccessGroupStoreActions> {
  return dispatch => dispatch({ type: enAccessGroupStoreActions.receiveSaveError, error: null });
}