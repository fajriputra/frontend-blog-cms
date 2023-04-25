import { GET, POST, PUT, DELETE } from '../../../shared/datasource/api.datasource';

const getArticles = async (param) => {
	return await GET('/private/articles', param, {}, true);
};

const getArticle = async (id) => {
	return await GET(`/private/articles/${id}`, {}, {}, true);
};

const createArticle = async (payload) => {
	return await POST('/private/articles', payload, true);
};

const updateArticle = async (id, payload) => {
	return await PUT(`/private/articles/${id}`, payload, true);
};

const deleteArticle = async (id) => {
	return await DELETE(`/private/articles/${id}`, true);
};

export default {
	getArticles,
	getArticle,
	createArticle,
	updateArticle,
	deleteArticle,
};
