import { Store } from 'redux';

import { IAppStoreAccessGroupState } from './reducers/accessGroup';
import { IAppStoreAuthState } from './reducers/auth';
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
  accessGroup: IAppStoreAccessGroupState;
}