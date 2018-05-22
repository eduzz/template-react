import { AnyAction, combineReducers } from 'redux';
import { IAppStoreState } from 'store/interfaces';

import accessGroup from './accessGroup';
import accessGroupModule from './accessGroupModule';
import auth, { enAuthStoreActions } from './auth';
import category from './category';
import course from './course';
import drawer from './drawer';
import user from './user';

const appReducers = combineReducers({
  auth,
  drawer,
  user,
  course,
  category,
  accessGroup,
  accessGroupModule
});

export default function rootReducers(state: IAppStoreState, action: AnyAction) {
  if (action.type === enAuthStoreActions.logout) {
    // clean all data
    state = undefined;
  }

  return appReducers(state, action);
}