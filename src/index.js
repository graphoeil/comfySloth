// Imports
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { ProductsProvider } from './context/products_context';
import { FilterProvider } from './context/filter_context';
import { CartProvider } from './context/cart_context';
import { UserProvider } from './context/user_context';
import { Auth0Provider } from '@auth0/auth0-react';

/* FilterProvider
Nous devons placer FilterProvider à l'intérieur de ProductsProvider 
car il aura besoin d'avoir accès au produits de ce dernier. */

/* UserProvider est optionnel ici, nous avons toutes 
les informations nécessaires dans Auth0Provider, mais si nous
voulons réutiliser Auth0Provider dans différents composants 
il est plus pratique de passer par UserProvider qui contiendra
les informations de Auth0 (via le hooks useAuth0) */

// ReactDOM
ReactDOM.render(
	<React.StrictMode>
		<Auth0Provider 
			domain={ process.env.REACT_APP_AUTH0_DOMAIN }
			clientId={ process.env.REACT_APP_AUTH0_CLIENTID }
			redirectUri={ window.location.origin }
			cacheLocation="localstorage">
			<UserProvider>
				<ProductsProvider>
					<FilterProvider>
						<CartProvider>
							<App />
						</CartProvider>
					</FilterProvider>
				</ProductsProvider>
			</UserProvider>
		</Auth0Provider>
	</React.StrictMode>,
	document.getElementById('root')
);