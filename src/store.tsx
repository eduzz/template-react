import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import nutrorApp from './reducers';

let store: any;

export const configureStore = () => {
  return (store = createStore(
    nutrorApp,
    applyMiddleware(thunk)
  ));
};

export const getStore = () => store;
