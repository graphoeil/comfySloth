// Imports
import React, { useEffect, useState, useRef } from 'react';
import styled from 'styled-components';
import { useFilterContext } from '../context/filter_context';
import { getUniqueValues, formatPrice } from '../utils/helpers';
import { FaCheck } from 'react-icons/fa';

// Fonction
const Filters = () => {

	// Contexte
	const { filters:{
		text, category, company, color, minPrice, maxPrice, price, shipping
	}, updateFilters, clearFilters, allProducts } = useFilterContext();

	// State pour l'autocomplétion controlée
	const [value, setValue] = useState(text);

	// useEffect + timer => envoi de updateFilters juste pour le texte
	let timerText = useRef();
	useEffect(() => {
		if (timerText.current){ clearTimeout(timerText.current); }
		timerText.current = setTimeout(() => {
			updateFilters('text',value);
		},500);
		// eslint-disable-next-line
	},[value]);

	// Données du filtre qui doivent être unique
	/* Nous allons extraire de allProducts toutes les category 
	par exemple puis grâce à new Set() nous renvoyons la liste 
	des catégories pour pouvoir mapper dessus dans le return ,-) */
	const categories = getUniqueValues(allProducts, 'category');
	const companies = getUniqueValues(allProducts, 'company');
	const colors = getUniqueValues(allProducts, 'colors');

	// Return
	return(
		<Wrapper>
			<form onSubmit={ (e) => { e.preventDefault(); } }>

				{/* Search input */}
				<div className="form-control">
					<input type="text" name="text" placeholder="Search" 
						className="search-input" value={ value } 
						onChange={ (e) => { setValue(e.target.value) } }/>
				</div>
				{/* Search input */}

				{/* Category */}
				<div className="form-control">
					<h5>Category</h5>
					<div>
						{
							categories.map((c, index) => {
								return(
									<button type="button" key={ index } 
										className={ `${ c === category ? 'active' : '' }` } 
										onClick={ () => { updateFilters('category', c); } }>
										{ c }
									</button>
								);
							})
						}
					</div>
				</div>
				{/* Category */}

				{/* Companies */}
				<div className="form-control">
					<h5>Company</h5>
					<select name="company" id="company" value={ company } 
						onChange={ (e) => { updateFilters('company', e.target.value); } }>
						{
							companies.map((c, index) => {
								return(
									<option key={ index } value={ c }>
										{ c.substring(0,1).toUpperCase() + c.substring(1) }
									</option>
								);
							})
						}
					</select>
				</div>
				{/* Companies */}

				{/* Colors */}
				<div className="form-control">
					<h5>Colors</h5>
					<div className="colors">
						{
							colors.map((c, index) => {
								// Return
								return(
									<button key={ index } 
									className={ `color-btn ${ color === c ? 'active' : '' }` } 
									style={ { backgroundColor:c } }
									onClick={ () => { updateFilters('color', c); } }>
										{ color === c && <FaCheck/> }
									</button>
								);
							})
						}
					</div>
				</div>
				{/* Colors */}

				{/* Price */}
				<div className="form-control">
					<h5>Price</h5>
					<p className="price">{ formatPrice(price) }</p>
					<input type="range" name="price" 
						min={ minPrice } max={ maxPrice } value={ price }
						onChange={ (e) => { updateFilters('price', Number(e.target.value)); } }/>
				</div>
				{/* Price */}

				{/* Shipping */}
				<div className="form-control shipping">
					<label htmlFor="shipping">Free shipping</label>
					<input type="checkbox" name="shipping" id="shipping" checked={ shipping } 
						onChange={ (e) => { updateFilters('shipping', e.target.checked) } }/>
				</div>
				{/* Shipping */}

			</form>
			{/* Clear filters */}
			<button type="button" className="clear-btn" onClick={ clearFilters }>
				Clear filters
			</button>
			{/* Clear filters */}
		</Wrapper>
	);

};

// Styled components
const Wrapper = styled.section`
	.form-control {
		margin-bottom: 1.25rem;
		h5 {
		margin-bottom: 0.5rem;
		}
	}
	.search-input {
		padding: 0.5rem;
		background: var(--clr-grey-10);
		border-radius: var(--radius);
		border-color: transparent;
		letter-spacing: var(--spacing);
	}
	.search-input::placeholder {
		text-transform: capitalize;
	}
	button {
		display: block;
		margin: 0.25em 0;
		padding: 0.25rem 0;
		text-transform: capitalize;
		background: transparent;
		border: none;
		border-bottom: 1px solid transparent;
		letter-spacing: var(--spacing);
		color: var(--clr-grey-5);
		cursor: pointer;
	}
	.active {
		border-color: var(--clr-grey-5);
	}
	.company {
		background: var(--clr-grey-10);
		border-radius: var(--radius);
		border-color: transparent;
		padding: 0.25rem;
	}
	.colors {
		display: flex;
		align-items: center;
	}
	.color-btn {
		display: inline-block;
		width: 1rem;
		height: 1rem;
		border-radius: 50%;
		background: #222;
		margin-right: 0.5rem;
		border: none;
		cursor: pointer;
		opacity: 0.5;
		display: flex;
		align-items: center;
		justify-content: center;
		svg {
		font-size: 0.5rem;
		color: var(--clr-white);
		}
	}
	.all-btn {
		display: flex;
		align-items: center;
		justify-content: center;
		margin-right: 0.5rem;
		opacity: 0.5;
	}
	.active {
		opacity: 1;
	}
	.all-btn .active {
		text-decoration: underline;
	}
	.price {
		margin-bottom: 0.25rem;
	}
	.shipping {
		display: grid;
		grid-template-columns: auto 1fr;
		align-items: center;
		text-transform: capitalize;
		column-gap: 0.5rem;
		font-size: 1rem;
	}
	.clear-btn {
		background: var(--clr-red-dark);
		color: var(--clr-white);
		padding: 0.25rem 0.5rem;
		border-radius: var(--radius);
	}
	@media (min-width: 768px) {
		.content {
		position: sticky;
		top: 1rem;
		}
	}
`;

// Export
export default Filters;