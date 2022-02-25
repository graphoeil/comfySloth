// Imports
import axios from 'axios';
import React, { useContext, useEffect, useReducer } from 'react';
import reducer from '../reducers/products_reducer';
import { products_url as url } from '../utils/constants';
import {
  SIDEBAR_OPEN,
  SIDEBAR_CLOSE,
  GET_PRODUCTS_BEGIN,
  GET_PRODUCTS_SUCCESS,
  GET_PRODUCTS_ERROR,
  GET_SINGLE_PRODUCT_BEGIN,
  GET_SINGLE_PRODUCT_SUCCESS,
  GET_SINGLE_PRODUCT_ERROR,
} from '../actions';

// Initial state
const initialState = {
	// Menu mobile
	isSidebarOpen:false,
	// Products
	productsLoading:false,
	productsError:false,
	products:[],
	featuredProducts:[],
	// Single product
	singleProductLoading:false,
	singleProductError:false,
	singleProduct:{}
};

// Contexte & export
const ProductsContext = React.createContext();

// Provider
export const ProductsProvider = ({ children }) => {

	// Reducer
	const [state, dispatch] = useReducer(reducer,initialState);

	// Méthodes
	// Menu mobile
	const openSidebar = () => {
		dispatch({ type:SIDEBAR_OPEN });
	};
	const closeSidebar = () => {
		dispatch({ type:SIDEBAR_CLOSE });
	};

	// Fetch products
	/* L'url vient du fichier constants.js dans utils
	'https://course-api.com/react-store-products'; */
	const fetchProducts = async(url) => {
		dispatch({ type:GET_PRODUCTS_BEGIN });
		try {
			const response = await axios.get(url);
			const products = response.data;
			dispatch({ type:GET_PRODUCTS_SUCCESS, payload:products });
		} catch(error){
			dispatch({ type:GET_PRODUCTS_ERROR });
		}
	};
	useEffect(() => {
		fetchProducts(url);
	},[]);

	// Fetch single products
	const fetchSingleProduct = async(url) => {
		dispatch({ type:GET_SINGLE_PRODUCT_BEGIN });
		try {
			const response = await axios(url);
			const singleProduct = response.data;
			dispatch({ type:GET_SINGLE_PRODUCT_SUCCESS, payload:singleProduct });
		} catch(error){
			dispatch({ type:GET_SINGLE_PRODUCT_ERROR });
		}
	};

	// Return
	return (
		<ProductsContext.Provider value={ {
			...state, openSidebar, closeSidebar,
			fetchSingleProduct
		} }>
		{ children }
		</ProductsContext.Provider>
	);
};

// Custom hooks
export const useProductsContext = () => {
	return useContext(ProductsContext);
};