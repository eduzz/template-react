import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import Header from '../Header';
import SideMenu from '../SideMenu';
import Footer from '../Footer';
import BackendUsers from './BackendUsers';

const Backend = () => (
	<div>
		<Header />
		<SideMenu />

		<Switch>
			<Redirect exact from='/backend' to='/backend/users' />
	    	<Route exact path='/backend/users' component={ BackendUsers } />
	    </Switch>

	    <Footer />
	</div>
);

export default Backend;
