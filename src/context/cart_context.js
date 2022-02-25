// Imports
import React, { useEffect, useContext, useReducer } from 'react';
import reducer from '../reducers/cart_reducer';
import {
  ADD_TO_CART,
  REMOVE_CART_ITEM,
  TOGGLE_CART_ITEM_AMOUNT,
  CLEAR_CART,
  COUNT_CART_TOTALS,
} from '../actions';

// LocalStorage ?
const getLocalStorage = () => {
	const cart = localStorage.getItem('comfySloth');
	if (cart){
		return JSON.parse(localStorage.getItem('comfySloth'));
	} else {
		return [];
	}
};

// Initial State
const initialState = {
	cart:getLocalStorage(),
	totalItems:0,
	totalAmount:0,
	shippingFee:534
};

// Contexte
const CartContext = React.createContext();

// Provider & export
export const CartProvider = ({ children }) => {

	// Reducer
	const [state, dispatch] = useReducer(reducer, initialState);

	// Sauvegarde du panier en localStorage à chaque changement dans le panier
	useEffect(() => {
		dispatch({ type:COUNT_CART_TOTALS });
		localStorage.setItem('comfySloth',JSON.stringify(state.cart));
	},[state.cart]);

	// Méthodes
	// Ajouter au panier
	const addToCart = (id, color, amount, product) => {
		dispatch({ type:ADD_TO_CART, payload:{ id, color, amount, product } });
	};
	// Retirer du panier
	const removeItem = (id) => {
		dispatch({ type:REMOVE_CART_ITEM, payload:id });
	};
	// Changer la quantité
	const toggleAmount = (id, value) => {
		dispatch({ type:TOGGLE_CART_ITEM_AMOUNT, payload:{ id, value } });
	};
	// Vider le panier
	const clearCart = () => {
		dispatch({ type:CLEAR_CART });
	};

	// Return
	return (
		<CartContext.Provider value={ {
			...state, addToCart, removeItem, 
			toggleAmount, clearCart
		} }>{ children }</CartContext.Provider>
	);
};

// Custom hooks
export const useCartContext = () => {
	return useContext(CartContext);
};