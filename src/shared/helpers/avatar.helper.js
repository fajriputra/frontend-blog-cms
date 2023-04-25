export const getHashOfString = (str) => {
	let hash = 0;

	for (let i = 0; i < str.length; i++) {
		// tslint:disable-next-line: no-bitwise
		hash = str.charCodeAt(i) + ((hash << 5) - hash);
	}
	hash = Math.abs(hash);

	return hash;
};

export const normalizeHash = (hash, min, max) => {
	return Math.floor((hash % (max - min)) + min);
};

export const generateHSL = (name, saturationRange, lightnessRange) => {
	const hash = getHashOfString(name);
	const h = normalizeHash(hash, 0, 360);
	const s = normalizeHash(hash, saturationRange[0], saturationRange[1]);
	const l = normalizeHash(hash, lightnessRange[0], lightnessRange[1]);
	return [h, s, l];
};

export const HSLtoString = (hsl) => {
	return `hsl(${hsl[0]}, ${hsl[1]}%, ${hsl[2]}%)`;
};

export const generateColorHsl = (id, saturationRange, lightnessRange) => {
	return HSLtoString(generateHSL(id, saturationRange, lightnessRange));
};

export const getInitials = (user) => {
	let username = '';

	const names = user.split(' ');
	if (names.length >= 2) username = `${names[0].substring(0, 1)}${names[1].substring(0, 1)}`;
	if (names.length === 1) username = names[0].substring(0, 2);

	return username.toUpperCase();
};

export const getRange = (value, range) => {
	return [Math.max(0, value - range), Math.min(value + range, 100)];
};
