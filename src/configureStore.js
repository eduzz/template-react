import { createStore, applyMiddleware } from 'redux';
import nutrorApp from './reducers';
import middleware from './middleware';

const configureStore = () => {
	return createStore(
		nutrorApp,
		applyMiddleware(middleware)
	);
};

export default configureStore;
