// Imports
import React, { useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { useProductsContext } from '../context/products_context';
import { single_product_url as url } from '../utils/constants';
import { formatPrice } from '../utils/helpers';
import {
  Loading,
  Error,
  ProductImages,
  AddToCart,
  Stars,
  PageHero,
} from '../components';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

// Fonction
const SingleProductPage = () => {

	// Contexte
	const { singleProduct:product, singleProductLoading:loading, 
		singleProductError:error, fetchSingleProduct } = useProductsContext();

	// Variables
	const { id } = useParams();
	const history = useHistory();

	// Fetch data => didMount and id change
	useEffect(() => {
		fetchSingleProduct(`${url}${id}`);
		// eslint-disable-next-line
	},[id]);

	/* Redirection automatique vers la homepage 
	en cas d'erreur au bout de 3 secondes */
	useEffect(() => {
		if (error){
			setTimeout(() => {
				// Redirection via history vers /
				history.push('/');
			},5000);
		}
		// Il faut bien suivre error, 
		// car error faut false à l'init
	},[error, history]);

	// Return
	if (loading){
		return <Loading/>
	}
	if (error){
		return <Error redirect={ true }/>
	}
	// Variables
	const { id:sku, name, price, description, stock, stars, 
		reviews, company, images } = product;
	// Main return
	return(
		<Wrapper>
			{/* product is true, inutile de ={ true } */}
			<PageHero title={ name } product/>
			<div className="section section-center page">
				<Link to="/products" className="btn">Back to products</Link>
				<div className="product-center">
					<ProductImages images={ images }/>
					<section className="content">
						<h2>{ name }</h2>
						<Stars stars={ stars } reviews={ reviews }/>
						<h5>{ formatPrice(price) }</h5>
						<p className="description">{ description }</p>
						<p className="info">
							<span>Available : </span>
							{
								stock > 0 ? 'In stock' : 'Not available'
							}
						</p>
						<p className="info">
							<span>SKU : </span>{ sku }
						</p>
						<p className="info">
							<span>Brand : </span>{ company }
						</p>
						<hr/>
						{
							stock > 0 && <AddToCart product={ product }/>
						}
					</section>
				</div>
			</div>
		</Wrapper>
	);

};

// Styled components
const Wrapper = styled.main`
	.product-center {
		display: grid;
		gap: 4rem;
		margin-top: 2rem;
	}
	.price {
		color: var(--clr-primary-5);
	}
	.desc {
		line-height: 2;
		max-width: 45em;
	}
	.info {
		text-transform: capitalize;
		width: 300px;
		display: grid;
		grid-template-columns: 125px 1fr;
		span {
		font-weight: 700;
		}
	}
	@media (min-width: 992px) {
		.product-center {
		grid-template-columns: 1fr 1fr;
		align-items: center;
		}
		.price {
		font-size: 1.25rem;
		}
	}
`;

// Export
export default SingleProductPage;