// Formatage du prix, nous passons de cents à $
/* https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Global_Objects/Intl/NumberFormat */
export const formatPrice = (number) => {
	/* return new ... évite déclarer une variable et
	de la retourner plus bas ,-) */
	return new Intl.NumberFormat('en-US',{
		style:'currency',
		currency:'USD'
	}).format(number/100);
};

// Valeurs unique
export const getUniqueValues = (data, type) => {
	let unique = data.map((item) => {
		return item[type];
	});
	// Colors est un tableau de tableaux
	/* var arr1 = [1, 2, [3, 4]];
	arr1.flat();
	// [1, 2, 3, 4] */
	if (type === 'colors'){
		unique = unique.flat();
	}
	/* Nous renvoyons tout (all), puis
	les valeurs correspondant au type */
	return ['all', ...new Set(unique)];
};