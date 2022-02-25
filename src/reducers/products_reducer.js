// Imports
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

// Fonction reducer
const products_reducer = (state, action) => {
	switch (action.type){

		// Menu mobile
		case SIDEBAR_OPEN:
			return { ...state, isSidebarOpen:true };
		case SIDEBAR_CLOSE:
			return { ...state, isSidebarOpen:false };

		// Products
		case GET_PRODUCTS_BEGIN:
			return { ...state, productsLoading:true };
		case GET_PRODUCTS_SUCCESS:
			const featuredProducts = action.payload.filter((product) => {
				// Inutile d'ajouter === true (!falsey value);
				return product.featured;
			});
			return { ...state, products:action.payload, featuredProducts, 
				productsLoading:false };
		case GET_PRODUCTS_ERROR:
			return { ...state, productsError:true, productsLoading:false };

		// Single product
		case GET_SINGLE_PRODUCT_BEGIN:{
			/* Nous réinitialisons singleProductError à false au cas ou 
			une ancienne erreur persisterait */
			return { ...state, singleProductLoading:true, singleProductError:false };
		}
		case GET_SINGLE_PRODUCT_SUCCESS:{
			return { ...state, singleProductLoading:false,  singleProduct:action.payload };
		}
		case GET_SINGLE_PRODUCT_ERROR:{
			return { ...state, singleProductLoading:false, singleProductError:true };
		}

		// Default
		default: throw new Error(`No Matching "${ action.type }" - action type`);
	}
};

// Export
export default products_reducer;