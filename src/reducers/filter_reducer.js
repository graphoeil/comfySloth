// Imports
import {
  LOAD_PRODUCTS,
  SET_LISTVIEW,
  SET_GRIDVIEW,
  UPDATE_SORT,
  SORT_PRODUCTS,
  UPDATE_FILTERS,
  FILTER_PRODUCTS,
  CLEAR_FILTERS,
} from '../actions';

// Fonction reducer
const filter_reducer = (state, action) => {

	// Load products
	if (action.type === LOAD_PRODUCTS){
		// Récupérations du prix maximum pour le filtre
		let maxPrice = action.payload.map((p) => {
			return p.price;
		});
		maxPrice = Math.max(...maxPrice);
		/* Nous devons éclater l'action.payload, car sinon nous
		ne pourrions pas le réutiliser dans filteredProducts, 
		avec le spread nous déclarons les valeurs et non pas
		l'adresse de la variable en mémoire */
		return { ...state, allProducts:[...action.payload], 
			filteredProducts:[...action.payload], 
			/* Nous devons impérativement éclater ...state.filters pour 
			pouvoir remplacer les valeurs, sinon nous remplaçons TOUT l'objet ! */
			filters:{ ...state.filters, maxPrice:maxPrice, price:maxPrice } };
	}

	// GridView, ListView
	if (action.type === SET_GRIDVIEW){
		return { ...state, gridView:true };
	}
	if (action.type === SET_LISTVIEW){
		return { ...state, gridView:false };
	}

	// Tri par nom, prix
	if (action.type === UPDATE_SORT){
		return { ...state, sort:action.payload };
	}
	if (action.type === SORT_PRODUCTS){
		const { sort, filteredProducts } = state;
		let tempProducts = [ ...filteredProducts ];
		if (sort === 'price-lowest'){
			tempProducts = tempProducts.sort((a, b) => {
				return a.price - b.price;
			});
		}
		if (sort === 'price-highest'){
			tempProducts = tempProducts.sort((a, b) => {
				return b.price - a.price;
			});
		}
		if (sort === 'name-a'){
			tempProducts = tempProducts.sort((a, b) => {
				/* La méthode localeCompare() renvoie un nombre indiquant 
				si la chaîne de caractères courante se situe avant, 
				après ou est la même que la chaîne passée en paramètre, 
				selon l'ordre lexicographique.
				Nous n'oublions pas que nous devons retourner 0, 1 ou -1 */
				return a.name.localeCompare(b.name);
			});
		}
		if (sort === 'name-z'){
			tempProducts = tempProducts.sort((a, b) => {
				return b.name.localeCompare(a.name);
			});
		}
		return { ...state, filteredProducts:tempProducts };
	}

	// Filtres
	if (action.type === UPDATE_FILTERS){
		const { name, value } = action.payload;
		return { ...state, filters:{ ...state.filters, [name]:value } };
	}
	if (action.type === FILTER_PRODUCTS){
		/* Nous repartons toujours depuis une version 
		complète des produits => allProducts !!!*/
		const { allProducts } = state;
		let tempProducts = [...allProducts];
		// Filtres
		const { text, category, company, color, price, shipping } = state.filters;
		// Filtering, pour chaque if nous écrasons (overwrite) tempProducts
		// Text
		if (text){
			tempProducts = tempProducts.filter((product) => {
				return product.name.toLowerCase().startsWith(text);
			});
		}
		// Category
		if (category !== 'all'){
			/* Si category ne vaut pas all alors nous filtrons, etc ... */
			tempProducts = tempProducts.filter((product) => {
				return product.category.toLowerCase() === category;
			});
		}
		// Company
		if (company !== 'all'){
			tempProducts = tempProducts.filter((product) => {
				return product.company.toLowerCase() === company;
			});
		}
		// Color
		if (color !== 'all'){
			tempProducts = tempProducts.filter((product) => {
				// product.color est un array
				return product.colors.find((c) => c === color);
			});
		}
		// Price
		tempProducts = tempProducts.filter((product) => {
			// Nous conservons les prix inférieurs au prix
			// définit par le input:range
			return product.price <= price;
		});
		// Shipping
		if (shipping){
			tempProducts = tempProducts.filter((product) => {
				return product.shipping;
			});
		}
		// Return
		return { ...state, filteredProducts:tempProducts };
	}
	if (action.type === CLEAR_FILTERS){
		/* Inutile de déclaré filteredProducts:state.allProducts,
		car en avec le reset des filtres nous déclenchons un filtrage */
		return { ...state, filters:{
			...state.filters,
			text:'',
			company:'all',
			category:'all',
			color:'all',
			price:state.filters.maxPrice,
			shipping:false
		} };
	}

	// Nothing match
	throw new Error(`No Matching "${ action.type }" - action type`);
};

// Export
export default filter_reducer;