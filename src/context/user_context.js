// Imports
import React, { useContext, useEffect, useState } from 'react';
import { useAuth0 } from '@auth0/auth0-react';

// Contexte
const UserContext = React.createContext();

// Provider & export
export const UserProvider = ({ children }) => {

	// Variables
	const { loginWithRedirect, logout, user } = useAuth0();

	// State
	const [myUser, setMyUser] = useState(false);

	// Nous observons les login logout via user
	useEffect(() => {
		setMyUser(user);
		// eslint-disable-next-line
	},[user]);

	// Return
	return (
		<UserContext.Provider value={ {
			loginWithRedirect, logout, myUser
		} }>{ children }</UserContext.Provider>
	);
};

// Custom hooks
export const useUserContext = () => {
	return useContext(UserContext);
};