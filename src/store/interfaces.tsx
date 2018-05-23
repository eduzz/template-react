import { Store } from 'redux';

import { IAppStoreAccessGroupState } from './reducers/accessGroup';
import { IAppStoreAccessGroupModuleState } from './reducers/accessGroupModule';
import { IAppStoreAuthState } from './reducers/auth';
import { IAppStoreAuthorState } from './reducers/author';
import { IAppStoreCategoryState } from './reducers/category';
import { IAppStoreCourseState } from './reducers/course';
import { IAppStoreDrawerState } from './reducers/drawer';
import { IAppStoreUserState } from './reducers/user';

export interface IAppDispatcher<T> {
  (params: { type: T, [key: string]: any }): void;
}

export interface IActionCreator<T, R = void> {
  (dispatch: IAppDispatcher<T>, getState: () => IAppStoreState): R;
}

export interface IAppStore extends Store<IAppStoreState> {
}

export interface IAppStoreState {
  auth: IAppStoreAuthState;
  drawer: IAppStoreDrawerState;
  user: IAppStoreUserState;
  course: IAppStoreCourseState;
  category: IAppStoreCategoryState;
  author: IAppStoreAuthorState;
  accessGroup: IAppStoreAccessGroupState;
  accessGroupModule: IAppStoreAccessGroupModuleState;
}