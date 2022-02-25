// Imports
import React from 'react';
import styled from 'styled-components';
import { PageHero } from '../components';
import aboutImg from '../assets/hero-bcg.jpeg';

// Fonction
const AboutPage = () => {

	// Return
	return(
		<main>
			<PageHero title="about"/>
			<Wrapper className="page section section-center">
				<img src={ aboutImg } alt="Nice desk" />
				<article>
					<div className="title">
						<h2>Our story</h2>
						<div className="underline"></div>
						<p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Illo eveniet earum libero, 
							officia quam nemo cum soluta sint id et voluptatum numquam inventore minus 
							culpa voluptas vel. Error velit ad id consequatur nemo veritatis voluptatibus 
							debitis saepe consequuntur expedita quibusdam optio, ab numquam cum vel 
							voluptate officiis ! Nihil, rem consequatur.</p>
					</div>
				</article>
			</Wrapper>
		</main>
	);

};

// Styled components
const Wrapper = styled.section`
	display: grid;
	gap: 4rem;
	img {
		width: 100%;
		display: block;
		border-radius: var(--radius);
		height: 500px;
		object-fit: cover;
	}
	p {
		line-height: 2;
		max-width: 45em;
		margin: 0 auto;
		margin-top: 2rem;
		color: var(--clr-grey-5);
	}
	.title {
		text-align: left;
	}
	.underline {
		margin-left: 0;
	}
	@media (min-width: 992px) {
		grid-template-columns: 1fr 1fr;
	}
`;

// Export
export default AboutPage;