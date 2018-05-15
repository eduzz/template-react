import { Store } from 'redux';

import { IAppStoreAuthState } from './reducers/auth';
import { IAppStoreDrawerState } from './reducers/drawer';
import { IAppStoreUserState } from './reducers/user';

export interface IAppDispatcher<T> {
  (params: { type: T, [key: string]: any }): void;
}

export interface IAppStore extends Store<IAppStoreState> {
}

export interface IAppStoreState {
  auth: IAppStoreAuthState;
  drawer: IAppStoreDrawerState;
  user: IAppStoreUserState;
}