export default {
	setData(store, data) {
		localStorage.setItem(store, JSON.stringify(data));
		return data;
	},
	getData(store) {
		const data = localStorage.getItem(store);

		try {
			return JSON.parse(data);
		} catch (error) {
			return false;
		}
	},
	removeData(store) {
		localStorage.removeItem(store);
	},
};
