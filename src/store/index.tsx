import { applyMiddleware, createStore } from 'redux';
import thunk from 'redux-thunk';

import { IAppStore } from './interfaces';
import reducers from './reducers';

export * from './interfaces';

let store: IAppStore;

export const configureStore = () => {
  return (store = createStore(
    reducers,
    window['__REDUX_DEVTOOLS_EXTENSION__'] && window['__REDUX_DEVTOOLS_EXTENSION__'](),
    applyMiddleware(thunk)
  ) as any);
};

export const getStore = () => store;