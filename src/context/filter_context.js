// Imports
import React, { useEffect, useContext, useReducer } from 'react';
import reducer from '../reducers/filter_reducer';
import {
  LOAD_PRODUCTS,
  SET_GRIDVIEW,
  SET_LISTVIEW,
  UPDATE_SORT,
  SORT_PRODUCTS,
  UPDATE_FILTERS,
  FILTER_PRODUCTS,
  CLEAR_FILTERS,
} from '../actions';
import { useProductsContext } from './products_context';

// Initial state
const initialState = {
	filteredProducts:[],
	allProducts:[],
	// Mode de vue
	gridView:true,
	// Tri
	sort:'price-lowest',
	// Filtres
	filters:{
		text:'',
		company:'all',
		category:'all',
		color:'all',
		minPrice:0,
		maxPrice:0,
		price:0,
		shipping:false
	}
};

// Contexte
const FilterContext = React.createContext();

// Provider & export
export const FilterProvider = ({ children }) => {

	// Reducer
	const [state, dispatch] = useReducer(reducer,initialState);

	// Méthodes
	/* Récupérer les produits depuis products_context.js,
	nous suivons bien entendu les changements dans products
	pour dispatcher et assigner products dans le reducer */
	const { products } = useProductsContext();
	useEffect(() => {
		dispatch({ type:LOAD_PRODUCTS, payload:products });
	},[products]);

	// GridView, ListView
	const setGridView = () => {
		dispatch({ type:SET_GRIDVIEW });
	};
	const setListView = () => {
		dispatch({ type:SET_LISTVIEW });
	};

	// Tri par prix, nom
	const updateSort = (e) => {
		const value = e.target.value;
		dispatch({ type:UPDATE_SORT, payload:value });
	};
	useEffect(() => {
		dispatch({ type:FILTER_PRODUCTS });
		dispatch({ type:SORT_PRODUCTS });
	},[products, state.sort, state.filters]);

	// Filtres
	/* Pour les filters nous utilisons le useEffect du tri, 
	car il faudra également mettre à jour le nombre de produits 
	trouvés dans le composant Sort.js*/
	const updateFilters = (name, value) => {
		dispatch({ type:UPDATE_FILTERS, payload:{ name, value } });
	};
	const clearFilters = () => {
		dispatch({ type:CLEAR_FILTERS });
	};

	// Return
	return (
		<FilterContext.Provider value={ {
			...state, setGridView, setListView, 
			updateSort, updateFilters, clearFilters
		} }>
		{ children }
		</FilterContext.Provider>
	);
};

// Custom hooks
export const useFilterContext = () => {
	return useContext(FilterContext);
};