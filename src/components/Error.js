// Imports
import React, { useEffect, useState } from 'react';

// Function
const Error = ({ redirect }) => {

	// State
	const [timer, setTimer] = useState(5);

	// Countdown
	useEffect(() => {
		let countDown;
		if (timer >= 2){
			countDown = setTimeout(() => {
				setTimer(timer - 1);
			},1000);
		}
		// Cleanup
		return() => {
			clearTimeout(countDown);
		}
	},[timer]);

	// Return
	return(
		<div className="section section-center text-center">
			<h2>There was an error...</h2>
			{
				redirect && <h3>Redirect to homepage in { timer } seconds</h3>
			}
			<p>Please, check console for more details.</p>
		</div>
	);
};

// Export
export default Error;