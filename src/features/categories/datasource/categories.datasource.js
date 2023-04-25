import { GET, POST, PUT, DELETE } from '../../../shared/datasource/api.datasource';

const getCategories = async (param) => {
	return await GET('/private/categories', param, {}, true);
};

const getCategory = async (id) => {
	return await GET(`/private/categories/${id}`, {}, {}, true);
};

const createCategory = async (payload) => {
	return await POST('/private/categories', payload, true);
};

const updateCategory = async (id, payload) => {
	return await PUT(`/private/categories/${id}`, payload, true);
};

const deleteCategory = async (id) => {
	return await DELETE(`/private/categories/${id}`, true);
};

export default {
	getCategories,
	getCategory,
	createCategory,
	updateCategory,
	deleteCategory,
};
