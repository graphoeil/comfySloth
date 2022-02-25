// Imports
import React, { useState } from 'react';
import styled from 'styled-components';

// Fonction
const ProductImages = (props) => {

	// Variables
	/* Si images n'est pas encore défini => [] avec
	les propriétés dont nous avons besoin, un useEffect
	didMount aurait été préférable je pense ... */
	const { images = [{ url:'' }] } = props;

	// State
	const [main, setMain] = useState(images[0]);

	// Return
	return(
		<Wrapper>
			<img src={ main.url } alt="main" className="main"/>
			<div className="gallery">
				{
					images.map((image, index) => {
						// Return
						return <img src={ image.url && image.thumbnails.large.url } key={ index } alt={ image.filename } 
							onClick={ () => { setMain(images[index]) } }
							className={ image.url === main.url ? 'active' : null }/>
					})
				}
			</div>
		</Wrapper>
	);

};

// Styled components
const Wrapper = styled.section`
	.main {
		height: 600px;
	}
	img {
		width: 100%;
		display: block;
		border-radius: var(--radius);
		object-fit: cover;
	}
	img.active{ border: 1px solid var(--clr-primary-7); }
	.gallery {
		margin-top: 1rem;
		display: grid;
		grid-template-columns: repeat(5, 1fr);
		column-gap: 1rem;
		img {
		height: 100px;
		cursor: pointer;
		}
	}
	.active {
		box-shadow: 0px 0px 0px 2px var(--clr-primary-5);
	}
	@media (max-width: 576px) {
		.main {
		height: 300px;
		}
		.gallery {
		img {
			height: 50px;
		}
		}
	}
	@media (min-width: 992px) {
		.main {
		height: 500px;
		}
		.gallery {
		img {
			height: 75px;
		}
		}
	}
`;

// Export
export default ProductImages;