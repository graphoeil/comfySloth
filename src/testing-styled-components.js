// Imports
import React from 'react';
import styled from "styled-components";

// Fonction
const Testing = () => {

	// Return
	return(
		<Wrapper>
			<h3>Hello World!</h3>
			<p>Hello people</p>
			<div className="article">
				<p>This is article</p>
			</div>
			<button onClick={ () => { console.log('click'); } }>Click me</button>
		</Wrapper>
	);

};

// Styled components
const Wrapper = styled.section`
	h3{ color: firebrick; }
	p{ color: purple; }
	button{ background-color: green; color: white; padding: 10px; border: none; 
		cursor: pointer; }
	.article{
		p{ font-size: 28px; color: burlywood; }
	}
`;

// Export
export default Testing;