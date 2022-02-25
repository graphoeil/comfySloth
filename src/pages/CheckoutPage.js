// Imports
import React from 'react';
import styled from 'styled-components';
import { PageHero, StripeCheckout } from '../components';
// Extra imports
import { useCartContext } from '../context/cart_context';
import { Link } from 'react-router-dom';

// Fonction
const CheckoutPage = () => {

	// Contexte
	const { cart } = useCartContext();

	// Return
	return(
		<main>
			<PageHero title="checkout"/>
			<Wrapper className="page">
				{
					cart.length < 1
					? <div className="empty">
						<h2>Your cart is empty</h2>
						<Link to="/products" className="btn">Fill it</Link>
					</div>
					: <StripeCheckout/>
				}
			</Wrapper>
		</main>
	);

};

// Styled components
const Wrapper = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
	.empty{ text-align: center; }
`;

// Export
export default CheckoutPage;