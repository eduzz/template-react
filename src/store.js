import { createStore, applyMiddleware } from 'redux';
import nutrorApp from './reducers';
import middleware from './middleware';

let store;

export const configureStore = () => {
    return store = createStore(
		nutrorApp,
		applyMiddleware(middleware)
	);
};

export const getStore = () => store;
