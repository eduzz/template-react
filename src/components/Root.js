import React from 'react';
import { Provider } from 'react-redux';
import { Route, Redirect, HashRouter, Switch } from 'react-router-dom';
import Producer from 'components/Producer';
import Student from 'components/Student';
import './root.css';

const Root = ({ store }) => (
    <Provider store={store}>
    	<HashRouter>
	    	<div>
		        <Switch>
		        	<Redirect exact from='/' to='/producer' />
		        	<Route path='/producer' component={ Producer } />
		        	<Route path='/student' component={ Student } />
		        </Switch>
		    </div>
		</HashRouter>
  	</Provider>
);

export default Root;
