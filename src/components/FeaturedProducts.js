// Imports
import React from 'react';
import { useProductsContext } from '../context/products_context';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import Error from './Error';
import Loading from './Loading';
import Product from './Product';

// Fonction
const FeaturedProducts = () => {

	// Contexte
	const { featuredProducts:featured, productsLoading:loading, 
		productsError:error } = useProductsContext();

	// Returns
	if (loading){
		return <Loading/>
	}
	if (error){
		return <Error/>
	}
	return(
		<Wrapper className="section">
			<div className="title">
				<h2>Featured products</h2>
				<div className="underline"></div>
			</div>
			<div className="section-center featured">
				{
					/* Avec slice nous mappons uniquement sur les 3 premiers produits,
					pour avoir les 3 derniers nous déclarons .slice(-3) */
					featured.slice(0,3).map((product) => {
						return <Product key={ product.id } product={ product }/>
					})
				}
			</div>
			<Link to="/products" className="btn">All products</Link>
		</Wrapper>
	);

};

// Styled components
const Wrapper = styled.section`
	background: var(--clr-grey-10);
	.featured {
		margin: 4rem auto;
		display: grid;
		gap: 2.5rem;
		img {
		height: 225px;
		}
	}
	.btn {
		display: block;
		width: 148px;
		margin: 0 auto;
		text-align: center;
	}
	@media (min-width: 576px) {
		.featured {
		grid-template-columns: repeat(auto-fit, minmax(360px, 1fr));
		}
	}
`;

// Export
export default FeaturedProducts;