import React from 'react';
import { Provider } from 'react-redux';
import { Route, Redirect, HashRouter, Switch } from 'react-router-dom';
import Producer from 'components/Producer';
import Student from 'components/Student';
import Login from 'components/Login';

import './root.css';

const Root = ({ store }) => (
    <Provider store={store}>
    	<HashRouter>
	        <Switch>
	        	<Redirect exact from='/' to='/producer' />
                <Route path='/login' component={ Login } />
	        	<Route path='/producer' component={ Producer } />
	        	<Route path='/student' component={ Student } />
	        </Switch>
		</HashRouter>
  	</Provider>
);

export default Root;
