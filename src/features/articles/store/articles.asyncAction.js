import { createAsyncThunk } from '@reduxjs/toolkit';

import articlesApi from '../datasource/articles.datasource';

export const getArticlesAsyncAction = createAsyncThunk('BLOG-APP/articles/get', async (param, { rejectWithValue }) => {
	try {
		const response = await articlesApi.getArticles(param);
		return response;
	} catch (error) {
		return rejectWithValue(JSON.parse(JSON.stringify(error)));
	}
});

export const getArticleAsyncAction = createAsyncThunk('BLOG-APP/articles/read', async (id, { rejectWithValue }) => {
	try {
		const response = await articlesApi.getArticle(id);
		return response;
	} catch (error) {
		return rejectWithValue(JSON.parse(JSON.stringify(error)));
	}
});

export const createArticleAsyncAction = createAsyncThunk(
	'BLOG-APP/articles/create',
	async (payload, { rejectWithValue }) => {
		try {
			const response = await articlesApi.createArticle(payload);
			return response;
		} catch (error) {
			return rejectWithValue(JSON.parse(JSON.stringify(error)));
		}
	},
);

export const updateArticleAsyncAction = createAsyncThunk(
	'BLOG-APP/articles/update',
	async ({ id, payload }, { rejectWithValue }) => {
		try {
			const response = await articlesApi.updateArticle(id, payload);
			return response;
		} catch (error) {
			return rejectWithValue(JSON.parse(JSON.stringify(error)));
		}
	},
);

export const deleteArticleAsyncAction = createAsyncThunk(
	'BLOG-APP/articles/delete',
	async (id, { rejectWithValue }) => {
		try {
			const response = await articlesApi.deleteArticle(id);
			return response;
		} catch (error) {
			return rejectWithValue(JSON.parse(JSON.stringify(error)));
		}
	},
);
