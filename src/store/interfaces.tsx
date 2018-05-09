import { Action, Store } from 'redux';

import { IAppStoreAuthState, typeAppStoreAuthActions } from './reducers/auth';

export interface IAppStore extends Store<IAppStoreState, Action<typeAppStoreAuthActions>> {
}

export interface IAppStoreState {
  auth: IAppStoreAuthState;
}