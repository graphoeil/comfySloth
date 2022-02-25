// Imports
import React from 'react';
import { useFilterContext } from '../context/filter_context';
import GridView from './GridView';
import ListView from './ListView';

// Fonction
const ProductList = () => {

	// Contexte
	const { filteredProducts:products, gridView } = useFilterContext();

	// Returns
	if (products.length < 1){
		/* Aucun produit à afficher après le tri */
		return <h5 style={ { textTransform:'none' } }>
			Sorry, no product matched your search...
		</h5>
	}
	if (!gridView){
		return <ListView products={ products }/>
	}
	return(
		<GridView products={ products }/>
	);

};

// Export
export default ProductList;