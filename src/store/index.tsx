import * as createRavenMiddleware from 'raven-for-redux';
import Raven from 'raven-js';
import { applyMiddleware, createStore } from 'redux';
import thunk from 'redux-thunk';

import { IAppStore, IAppStoreState } from './interfaces';
import reducers from './reducers';

export * from './interfaces';

let store: IAppStore;

export const configureStore = () => {
  return (store = createStore(
    reducers,
    window['__REDUX_DEVTOOLS_EXTENSION__'] && window['__REDUX_DEVTOOLS_EXTENSION__'](),
    applyMiddleware(thunk, createRavenMiddleware(Raven, {
      getUserContext(state: IAppStoreState) {
        if (!state.auth.isAuthenticated) return null;

        //TODO: change to the real user
        return {
          id: '1',
          username: 'Teste',
          email: 'teste@eduzz.com'
        };
      }
    }))
  ) as any);
};

export const getStore = () => store;