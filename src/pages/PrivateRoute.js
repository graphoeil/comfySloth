// Imports
import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';

// Fonction
/* children => les enfants de PrivateRoute
...rest => les props de PrivateRoute */
const PrivateRoute = ({ children, ...rest }) => {

	// Contexte
	const { user } = useAuth0();

	// Export
	return <Route { ...rest } render={ () => {
		return user ? children : <Redirect to="/"/>
	} }></Route>;

};

// Export
export default PrivateRoute;