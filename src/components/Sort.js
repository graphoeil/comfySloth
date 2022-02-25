// Imports
import React from 'react';
import { useFilterContext } from '../context/filter_context';
import { BsFillGridFill, BsList } from 'react-icons/bs';
import styled from 'styled-components';

// Fonction
const Sort = () => {

	// Contexte
	const { filteredProducts:products, gridView, 
		setListView, setGridView, sort, updateSort } = useFilterContext();
	
	// Return
	return(
		<Wrapper>
			<div className="btn-container">
				{/* Quand gridView vaut false, la classe ajoutée est .false ,-) */}
				<button type="button" className={ `${ gridView && 'active' }` } onClick={ setGridView }>
					<BsFillGridFill/>
				</button>
				<button type="button" className={ `${ !gridView && 'active' }` } onClick={ setListView }>
					<BsList/>
				</button>
			</div>
			<p>{ products.length } products found</p>
			<hr/>
			<form>
				<label htmlFor="sort">Sort by</label>
				<select name="sort" id="sort" className="sort-input" value={ sort } onChange={ updateSort }>
					<option value="price-lowest">Price (lowest)</option>
					<option value="price-highest">Price (highest)</option>
					<option value="name-a">Name (a-z)</option>
					<option value="name-z">Name (z-a)</option>
				</select>
			</form>
		</Wrapper>
	);
};

// Styled components
const Wrapper = styled.section`
	display: grid;
	grid-template-columns: auto auto 1fr auto;
	align-items: center;
	margin-bottom: 2rem;
	column-gap: 2rem;
	@media (max-width: 576px) {
		display: grid;
		grid-template-columns: 1fr;
		row-gap: 0.75rem;
		.btn-container {
		width: 50px;
		}
		label {
		display: inline-block;
		margin-right: 0.5rem;
		}
	}
	@media (min-width: 768px) {
		column-gap: 2rem;
	}
	p {
		text-transform: capitalize;
		margin-bottom: 0;
	}
	.btn-container {
		display: grid;
		grid-template-columns: 1fr 1fr;
		column-gap: 0.5rem;
		button {
		background: transparent;
		border: 1px solid var(--clr-black);
		color: var(--clr-black);
		width: 1.5rem;
		border-radius: var(--radius);
		height: 1.5rem;
		display: flex;
		align-items: center;
		justify-content: center;
		cursor: pointer;
		svg {
			font-size: 1rem;
		}
		}
		.active {
		background: var(--clr-black);
		color: var(--clr-white);
		}
	}
	.sort-input {
		border-color: transparent;
		font-size: 1rem;
		text-transform: capitalize;
		padding: 0.25rem 0.5rem;
	}
	label {
		font-size: 1rem;
		text-transform: capitalize;
	}
`;

// Export
export default Sort;