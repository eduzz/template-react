import React from 'react';
import { render } from 'react-dom';
import { configureStore } from './store';
import Root from './components/Root';

import 'materialize-css';
import './assets/css/css.css';

const store = configureStore();

render(<Root store={store} />, document.getElementById('root'));
