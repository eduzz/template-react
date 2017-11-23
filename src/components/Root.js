import React from 'react';
import { Provider } from 'react-redux';
import { Route, Redirect, HashRouter, Switch } from 'react-router-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Producer from 'components/Producer';
import Student from 'components/Student';

const Root = ({ store }) => (
    <MuiThemeProvider>
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
    </MuiThemeProvider>
);

export default Root;
