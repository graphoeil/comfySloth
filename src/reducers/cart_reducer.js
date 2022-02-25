// Imports
import {
  ADD_TO_CART,
  CLEAR_CART,
  COUNT_CART_TOTALS,
  REMOVE_CART_ITEM,
  TOGGLE_CART_ITEM_AMOUNT,
} from '../actions';

// Fonction reducer
const cart_reducer = (state, action) => {

	// Ajouter au panier
	if (action.type === ADD_TO_CART){
		const { id, color, amount, product } = action.payload;
		// L'article existe déjà dans le panier ?
		const tempItem = state.cart.find((item) => {
			// Un même article peut avoir plusieurs couleurs
			return item.id === id + color;
		});
		if (tempItem){
			// Déjà dans le panier
			/* Nouveau tableau qui contiendra l'article 
			avec la propriété amount augmenté */
			const tempCart = state.cart.map((cartItem => {
				if (cartItem.id === id+color){
					let newAmount = cartItem.amount + amount;
					// Nous devons également tester le stock
					if (newAmount > cartItem.max){
						newAmount = cartItem.max;
					}
					return { ...cartItem, amount:newAmount };
				} else {
					return cartItem;
				}
			}));
			return { ...state, cart:tempCart };
		} else {
			// Nouveau produit
			const newItem = { id:`${id}${color}`, name:product.name, 
				color, amount, image:product.images[0].url, 
				price:product.price, max:product.stock };
			return { ...state, cart:[...state.cart, newItem] };
		}
	}

	// Changer les quantités
	if (action.type === TOGGLE_CART_ITEM_AMOUNT){
		const { id, value } = action.payload;
			const tempCart = state.cart.map((item) => {
				if (item.id === id){
					if (value === 'inc'){
						let newAmount = item.amount + 1;
						if (newAmount > item.max){
							newAmount = item.max;
						}
						return { ...item, amount:newAmount };
					} else {
						let newAmount = item.amount - 1;
						if (newAmount < 1){
							newAmount = 1;
						}
						return { ...item, amount:newAmount };
					}
				} else {
					return item;
				}
			});
			return { ...state, cart:tempCart };
	}

	// Retirer du panier
	if (action.type === REMOVE_CART_ITEM){
		const tempCart = state.cart.filter((item) => {
			return item.id !== action.payload;
		});
		return { ...state, cart:tempCart };
	}

	// Vider le panier
	if (action.type === CLEAR_CART){
		return { ...state, cart:[] };
	}

	// Total du panier via useEffect à chaque changement du state.cart
	if (action.type === COUNT_CART_TOTALS){
		/* Nous retournons un objet (total), nous inspectons
		carItem à chaque itération sur cart. */
		const { totalItems, totalAmount } = state.cart.reduce((total, cartItem) => {
			const { amount, price } = cartItem;
			total.totalItems += amount;
			total.totalAmount += price * amount;
			return total;
		},{ totalItems:0, totalAmount:0 });
		return { ...state, totalItems, totalAmount };
	}

	// Default
	throw new Error(`No Matching "${ action.type }" - action type`);

};

// Export
export default cart_reducer;