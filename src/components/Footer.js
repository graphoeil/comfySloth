// Imports
import React from 'react';
import styled from 'styled-components';

// Fonction
const Footer = () => {

	// Return
	return(
		<Wrapper>
			<h5>&copy; { new Date().getFullYear() }</h5>
			<span>Comfy Sloth</span>
			<h5>All rights reserved</h5>
		</Wrapper>
	);

};

// Styled components
const Wrapper = styled.footer`
	height: 5rem;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	background: var(--clr-black);
	text-align: center;
	span {
		color: var(--clr-primary-5);
		font-size: 18px;
	}
	h5 {
		color: var(--clr-white);
		margin: 0.1rem;
		font-weight: 400;
		text-transform: none;
		line-height: 1.25;
	}
	@media (min-width: 776px) {
		flex-direction: row;
		span, h5{ margin-right: 10px; }
	}
`;

// Export
export default Footer;