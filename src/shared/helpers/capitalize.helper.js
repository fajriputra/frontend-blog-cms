export const capitalize = (str) => {
	if (!str) return '';

	const arr = str.split('_').join(' ').toLowerCase();
	const result = arr.split(' ');

	for (var i = 0; i < result.length; i++) {
		result[i] = result[i].charAt(0).toUpperCase() + result[i].slice(1);
	}

	return result.join(' ');
};
