import axios from 'axios';

import _ from 'lodash';

import { coreConfig } from '../config/core.config';
import { DatasourceQuery, DatasourceResponse } from './datasource.factory';
import localStorage from './localstorage.datasource';

export const getHeader = (useAuth, isFormData, extraHeader) => {
	let forgeHeader = {};

	if (useAuth) {
		forgeHeader = {
			...forgeHeader,
			...{
				Authorization: `Bearer ${localStorage.getData(coreConfig.APP.AUTH_STORAGE)}`,
			},
		};
	}

	if (isFormData) {
		forgeHeader = { ...forgeHeader, ...{ 'Content-Type': 'multipart/form-data' } };
	}

	if (extraHeader) {
		forgeHeader = { ...forgeHeader, ...extraHeader };
	}

	return forgeHeader;
};

export const parseQuery = (param) => {
	const forgequery = [];

	if (param.currentPage) {
		forgequery.push('page=' + param.currentPage);
	}
	if (param.perPage) {
		forgequery.push('size=' + param.perPage);
	}
	if (param.search) {
		forgequery.push('q=' + param.search);
	}
	if (param.filter) {
		if (param.filter.length > 0) {
			const remappedFilter = [];

			for (let index = 0; index < param.filter.length; index++) {
				if (typeof param.filter[index].key !== undefined) {
					const vValue = param.filter[index].value || [];
					if (param.filter[index].value && vValue.length > 0) {
						remappedFilter.push(param.filter[index].key + '=' + param.filter[index].value);
					}
				}
			}

			if (remappedFilter.length > 0) {
				forgequery.push(remappedFilter.join('&'));
			}
		}
	}
	return forgequery.length > 0 ? '?' + _.join(forgequery, '&') : '';
};

export const baseHTTP = async (method = 'get', url, query, body, useAuth, isFormData, extraHeader) => {
	query = new DatasourceQuery(query);
	const forgeResponse = new DatasourceResponse();
	try {
		if (method === 'post') {
			const dt = await axios.post(coreConfig.API.BASE_URL + url + parseQuery(query), body, {
				headers: getHeader(useAuth, isFormData, extraHeader),
			});

			forgeResponse.data = dt.data.data;
			forgeResponse.message = dt.data.message;
			forgeResponse.meta = query;
		}
		if (method === 'get') {
			const dt = await axios.get(coreConfig.API.BASE_URL + url + parseQuery(query), {
				headers: getHeader(useAuth, isFormData, extraHeader),
			});

			forgeResponse.data = dt.data.data;
			forgeResponse.message = dt.data.message;
			forgeResponse.meta = _.merge(query, { total: dt.data.meta?.total_data, perPage: dt.data.meta?.size });
		}
		if (method === 'delete') {
			const dt = await axios.delete(coreConfig.API.BASE_URL + url + parseQuery(query), {
				headers: getHeader(useAuth, isFormData, extraHeader),
			});

			forgeResponse.data = dt.data.data;
			forgeResponse.message = dt.data.message;
			forgeResponse.meta = _.merge(query, dt.data.meta?.total_data);
		}
		if (method === 'put') {
			const dt = await axios.put(coreConfig.API.BASE_URL + url + parseQuery(query), body, {
				headers: getHeader(useAuth, isFormData, extraHeader),
			});

			forgeResponse.data = dt.data.data;
			forgeResponse.message = dt.data.message;
			forgeResponse.meta = query;
		}
		const objectResponse = JSON.parse(JSON.stringify(forgeResponse));
		objectResponse.data = forgeResponse.data;
		return objectResponse;
	} catch (error) {
		let message = '';

		switch (error?.response?.data?.status) {
			case 400:
				message = error?.response?.data?.message;
				break;
			case 409:
				message = error?.response?.data?.message;
				break;
			case 404:
				message = error?.response?.data?.message;
				break;
			case 401:
				message = error?.response?.data?.message;
				window.dispatchEvent(new Event('APP_AUTH_UNAUTHORIZED'));
				break;
			case 403:
				message = error?.response?.data?.message;
				break;
			case 500:
				message = error?.response?.data?.message;
				break;
			default:
				message = 'Unknown Error';
				break;
		}

		throw message;
	}
};

export const POST = async (url, body, useAuth) => {
	return baseHTTP('post', url, {}, body, useAuth, false, {});
};

export const GET = async (url, query, body, useAuth) => {
	return baseHTTP('get', url, query, body, useAuth, false, {});
};

export const PUT = async (url, body, useAuth) => {
	return baseHTTP('put', url, {}, body, useAuth, false, {});
};

export const DELETE = async (url, useAuth) => {
	return baseHTTP('delete', url, {}, {}, useAuth, false, {});
};

export const UPLOAD = async (url, payload, useAuth) => {
	return baseHTTP('post', url, {}, payload, useAuth, false, {});
};
