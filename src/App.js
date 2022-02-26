// Imports
import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { Navbar, Sidebar, Footer } from './components';
import { HomePage, AboutPage, SingleProductPage, CartPage, CheckoutPage, 
	ErrorPage, ProductsPage, PrivateRoute, AuthWrapper } from './pages';

// Fonction
function App(){

	// Return
	return(
		<AuthWrapper>

			{/* Router */}
			<Router>

			{/* Navbar & Sidebar */}
			<Navbar/>
			<Sidebar/>
			{/* Navbar & Sidebar */}

			{/* Switch */}
			<Switch>

				{/* HomePage */}
				<Route path="/" exact>
					<HomePage/>
				</Route>
				{/* HomePage */}

				{/* AboutPage */}
				<Route path="/about" exact>
					<AboutPage/>
				</Route>
				{/* AboutPage */}

				{/* ProductsPage */}
				<Route path="/products" exact>
					<ProductsPage/>
				</Route>
				{/* ProductsPage */}

				{/* SingleProductPage */}
				<Route path="/products/:id" exact children={ <SingleProductPage/> } />
				{/* SingleProductPage */}

				{/* CartPage */}
				<Route path="/cart" exact>
					<CartPage/>
				</Route>
				{/* CartPage */}

				{/* CheckoutPage, l'utilisateur doit être connecté
				pour pouvoir accéder à la page de paiement */}
				<PrivateRoute path="/checkout" exact>
					<CheckoutPage/>
				</PrivateRoute>
				{/* CheckoutPage */}

				{/* ErrorPage */}
				<Route path="*">
					<ErrorPage/>
				</Route>
				{/* ErrorPage */}

			</Switch>
			{/* Switch */}

			{/* Footer */}
			<Footer/>
			{/* Footer */}

			</Router>
			{/* Router */}

		</AuthWrapper>
	);

};

// Export
export default App;