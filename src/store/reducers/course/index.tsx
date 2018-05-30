import { combineReducers } from 'redux';

import get, { IAppStoreCourseGetState } from './get';
import list, { IAppStoreCourseListState } from './list';
import save, { IAppStoreCourseSaveState } from './save';
import savePartFactory, { IAppStoreCourseSavePartState } from './savePartFactory';

export interface IAppStoreCourseState {
  list: IAppStoreCourseListState;
  get: IAppStoreCourseGetState;
  save: IAppStoreCourseSaveState;
  saveAdvanced: IAppStoreCourseSavePartState;
  saveCustomization: IAppStoreCourseSaveState;
}

const courseReducers = combineReducers({
  list,
  get,
  save,
  saveAdvanced: savePartFactory('ADVANCED'),
  saveCustomization: savePartFactory('CUSTOMIZATION')
});

export default courseReducers;
