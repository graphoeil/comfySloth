// Imports
import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import styled from 'styled-components';


// Fonction
const AuthWrapper = ({ children }) => {

	// Contexte
	const { isLoading, error } = useAuth0();

	// Returns
	if (isLoading){
		/* Nous aurions pu avoir une animation ici */
		return(
			<Wrapper>
				<div className="loading"></div>
			</Wrapper>
		);
	}
	if (error){
		return(
			<Wrapper>
				<h1>{ error.message }</h1>
			</Wrapper>
		);
	}
	return(
		<React.Fragment>
			{ children }
		</React.Fragment>
	);

};

// Styled components
const Wrapper = styled.section`
	min-height: 100vh;
	display: grid;
	place-items: center;
`;

// Export
export default AuthWrapper;