import React from 'react';
import { Provider } from 'react-redux';
import { Route, Redirect, BrowserRouter, Switch } from 'react-router-dom';
import Producer from 'components/Producer';
import Student from 'components/Student';
import Login from 'components/Login';
import NotFound from 'components/NotFound';

import './root.css';

const Root = ({ store }) => {
    const isAuthenticated = store.getState().auth.isAuthenticated;
    const token = localStorage.getItem('authToken');
    const isProducer = token ? JSON.parse(atob(localStorage.getItem('authToken').split('.')[1])).producer : false;

    return (
        <Provider store={store}>
        	<BrowserRouter>
    	        <Switch>
                    <Redirect exact from='/' to='/login'/>
                    <Route path='/login' render={() => (
                        isAuthenticated ? (
                            isProducer ? <Redirect to='/producer' /> : <Redirect to='/student' />
                        ) : (
                            <Login />
                        )
                    )} />
    	        	<Route path='/producer' render={() => (
                        isAuthenticated ? (
                            isProducer ? <Producer /> : <Redirect to='/student' />
                        ) : (
                            <Redirect to='/login' />
                        )
                    )} />
    	        	<Route path='/student' render={() => (
                        isAuthenticated ? (
                            <Student />
                        ) : (
                            <Redirect to='/login' />
                        )
                    )} />
                    <Route path='*' component={ NotFound } />
    	        </Switch>
    		</BrowserRouter>
      	</Provider>
    );
};

export default Root;
