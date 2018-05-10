import { combineReducers } from 'redux';

import auth from './auth';
import drawer from './drawer';

export default combineReducers({
  auth,
  drawer
});