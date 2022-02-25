/* Le package dotenv (npm i dotenv) permet de récupérer les fichiers
.env dans un environnement node, donc en dehors de react. */
require('dotenv').config();

// Connexion à stripe
const stripe = require('stripe')(process.env.REACT_APP_STRIPE_SECRET_KEY);

// http://localhost:8888/.netlify/functions/create-payment-intent

/* Cette fonction fait la jonction entre le paiement stripe
et notre composant StripeCheckout via une requête post */

// Export
exports.handler = async function(event, context){

	// Console log dans le terminal => node
	// console.log(event);
	/* body: '{"cart":[
		{"id":"recQ0fMd8T0Vk211E#000","name":"modern poster","color":"#000","amount":1,"image":"https://dl.airtable.com/.attachments/e2eef862d9b7a2fb0aa74fa24fbf97bb/25c4bc17/0-pexels-pixabay-462235.jpg","price":3099,"max":10},
		{"id":"recoM2MyHJGHLVi5l#000","name":"bar stool","color":"#000","amount":1,"image":"https://dl.airtable.com/.attachments/7442c132471b205b0883929efd5a96af/16a65ea6/z-0-product.jpg","price":4099,"max":20}],
		"shippingFee":534,"totalAmount":7198}' */

	/* Nous testons si les données sont bien récupérées, au cas où 
	nous accéderions directement via 
	l'url // http://localhost:8888/.netlify/functions/create-payment-intent 
	alors que l'envoi se fait via axios dans le composant StripeCheckout. */
	if (event.body){

		// Variables
		const { cart, shippingFee, totalAmount } = JSON.parse(event.body);

		// Grand total
		const calculateOrderAmount = () => {
			return shippingFee + totalAmount;
		};

		// Try, catch
		try {
			const paymentIntent = await stripe.paymentIntents.create({
				/* La valeur doit être en centimes (ou cents), voilà
				pourquoi nous avons développé toute l'application en cents ,-) */
				amount:calculateOrderAmount(),
				currency:'usd'
			});
			return {
				statusCode:200,
				body:JSON.stringify({
					clientSecret:paymentIntent.client_secret
				})
			};
		} catch(error){
			return {
				statusCode:500,
				body:JSON.stringify({ msg:error.message })
			};
		}

	}

	// Return par défaut
	return {
		statusCode:200,
		body:'Create Payment Intent'
	};

};