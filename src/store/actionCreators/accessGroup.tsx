import { logError } from 'errorHandler';
import { IAccessGroup } from 'interfaces/accessGroup';
import { IAppDispatcher, IAppStoreState } from 'store/interfaces';

import { typeAppStoreAccessGroupActions } from '../reducers/accessGroup';

export function requestAccessGroupList() {
  return async (dispatch: IAppDispatcher<typeAppStoreAccessGroupActions>, getState: () => IAppStoreState) => {
    try {
      if (getState().accessGroup.isFetching) return;

      dispatch({ type: 'REQUEST_ACCESS_GROUP_LIST' });

      await new Promise((resolve, reject) => setTimeout(() => {
        dispatch({
          type: 'RECEIVED_ACCESS_GROUP_LIST', accessGroups: new Array(5).fill('').map<IAccessGroup>((v, index) => ({
            id: index,
            name: 'Group ' + index
          }))
        });
        resolve();
      }, 2000));
    } catch (error) {
      logError(error);
      dispatch({ type: 'RECEIVED_ACCESS_GROUP_LIST_ERROR', error });
    }
  };
}

export function cleanAccessGroupListError() {
  return (dispatch: IAppDispatcher<typeAppStoreAccessGroupActions>) => {
    dispatch({ type: 'RECEIVED_ACCESS_GROUP_LIST_ERROR', error: null });
  };
}