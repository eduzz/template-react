import React from 'react';
import { Provider } from 'react-redux';
import { Route, Redirect, HashRouter, Switch } from 'react-router-dom';
import Producer from './Producer';
import Student from './Student';
import Backend from './Backend/Backend';

const Root = ({ store }) => (
    <Provider store={store}>
    	<HashRouter>
	    	<div>
		        <Switch>
		        	<Redirect exact from='/' to='/producer' />
		        	<Route path='/producer' component={ Producer } />
		        	<Route path='/student' component={ Student } />
		        	<Route path='/backend' component={ Backend } />
		        </Switch>
		    </div>
		</HashRouter>
  	</Provider>
);

export default Root;
