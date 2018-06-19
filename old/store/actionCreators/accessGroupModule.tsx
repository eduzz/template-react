import { logError } from 'errorHandler';
import { IAccessGroupModule } from 'interfaces/accessGroupModule';
import { IActionCreator } from 'store/interfaces';

import { enAccessGroupModuleStoreActions } from '../reducers/accessGroupModule';

export function requestAccessGroupModuleList(): IActionCreator<enAccessGroupModuleStoreActions> {
  return async (dispatch, getState) => {
    try {
      if (getState().accessGroupModule.isFetching) return;

      dispatch({ type: enAccessGroupModuleStoreActions.requestList });

      await new Promise((resolve, reject) => setTimeout(() => {
        dispatch({
          type: enAccessGroupModuleStoreActions.receiveList,
          modules: new Array(5).fill('').map<IAccessGroupModule>((v, index) => ({
            id: index,
            name: 'Modulo ' + index
          }))
        });
        resolve();
      }, 2000));
    } catch (error) {
      logError(error);
      dispatch({ type: enAccessGroupModuleStoreActions.receiveListError, error });
    }
  };
}

export function cleanAccessGroupModuleListError(): IActionCreator<enAccessGroupModuleStoreActions> {
  return dispatch => dispatch({ type: enAccessGroupModuleStoreActions.receiveListError, error: null });
}