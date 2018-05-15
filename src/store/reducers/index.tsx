import { combineReducers } from 'redux';

import auth from './auth';
import drawer from './drawer';
import user from './user';

export default combineReducers({
  auth,
  drawer,
  user
});