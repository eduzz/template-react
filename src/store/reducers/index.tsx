import { AnyAction, combineReducers } from 'redux';
import { IAppStoreState } from 'store/interfaces';

import accessGroup from './accessGroup';
import auth, { enAuthStoreActions } from './auth';
import course from './course';
import drawer from './drawer';
import user from './user';

const appReducers = combineReducers({
  auth,
  drawer,
  user,
  course,
  accessGroup
});

export default function rootReducers(state: IAppStoreState, action: AnyAction) {
  if (action.type === enAuthStoreActions.logout) {
    // clean all data
    state = undefined;
  }

  return appReducers(state, action);
}