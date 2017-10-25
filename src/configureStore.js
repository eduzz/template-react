import { createStore, applyMiddleware } from 'redux';
import nutrorApp from './reducers';

const configureStore = () => {
	return createStore(
		nutrorApp
	);
};

export default configureStore;