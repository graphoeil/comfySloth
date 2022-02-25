// Imports
import React from 'react';
import { FeaturedProducts, Hero, Services, Contact } from '../components';

// Fonction
const HomePage = () => {

	// Return
	return(
		<main>
			<Hero/>
			<FeaturedProducts/>
			<Services/>
			<Contact/>
		</main>
	);

};

// Export
export default HomePage;