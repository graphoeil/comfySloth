// Imports
import React from 'react';
import styled from 'styled-components';
import { BsStarFill, BsStarHalf, BsStar } from 'react-icons/bs';

// Fonction
const Stars = ({ stars, reviews }) => {

	// Array des étoiles
	/* Nous aurions crée le tableau tempStars avec 5 éléments vide, 
	puis boucler avec un map dans le return du Wrapper */
	const tempStars = Array.from({ length:5 },(_, index) => {
		// Ici nous bouclons sur le tableau crée ,-)
		// number pour les demi-étoiles
		const number = index + 0.5;
		// Return
		return(
			<span key={ index }>
				{ stars >= index + 1 ? <BsStarFill/> : stars >= number ? <BsStarHalf/> : <BsStar/> }
			</span>
		);
	});

	// Return
	return(
		<Wrapper>
			<div className="stars">
				{ tempStars }
			</div>
			<p className="reviews">({ reviews } customer reviews)</p>
		</Wrapper>
	);

};

// Styled components
const Wrapper = styled.div`
	display: flex;
	align-items: center;
	span {
		color: #ffb900;
		font-size: 1rem;
		margin-right: 0.25rem;
	}
	p {
		margin-left: 0.5rem;
		margin-bottom: 0;
	}
	margin-bottom: 0.5rem;
`;

// Export
export default Stars;