import { createStore, applyMiddleware } from 'redux';
import nutrorApp from './reducers';
import middleware from './middleware';

let store;

export const configureStore = () => {
    return store = createStore(
		nutrorApp,
        window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
		applyMiddleware(middleware)
	);
};

export const getStore = () => store;
