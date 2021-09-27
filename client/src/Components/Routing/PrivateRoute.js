import React from 'react';
import { useSelector } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';

const PrivateRoute = ({ component: Component }) => {
	const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
	return <Route render={(props) => (isAuthenticated ? <Component {...props} /> : <Redirect to='/login' />)} />;
};

export default PrivateRoute;
