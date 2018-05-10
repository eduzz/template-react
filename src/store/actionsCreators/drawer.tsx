import { IAppDispatcher } from 'store/interfaces';

import { typeAppStoreDrawerActions } from '../reducers/drawer';

export function openDrawer() {
  return (dispatch: IAppDispatcher<typeAppStoreDrawerActions>) => {
    dispatch({ type: 'OPEN_DRAWER' });
  };
}

export function closeDrawer() {
  return (dispatch: IAppDispatcher<typeAppStoreDrawerActions>) => {
    dispatch({ type: 'CLOSE_DRAWER' });
  };
}