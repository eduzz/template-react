import { IActionCreator } from 'store/interfaces';

import { enDrawerStoreActions } from '../reducers/drawer';

export function openDrawer(): IActionCreator<enDrawerStoreActions> {
  return dispatch => dispatch({ type: enDrawerStoreActions.open });
}

export function closeDrawer(): IActionCreator<enDrawerStoreActions> {
  return dispatch => dispatch({ type: enDrawerStoreActions.close });
}