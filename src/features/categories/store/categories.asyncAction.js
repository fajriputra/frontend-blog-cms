import { createAsyncThunk } from '@reduxjs/toolkit';

import categoriesApi from '../datasource/categories.datasource';

export const getCategoriesAsyncAction = createAsyncThunk(
	'BLOG-APP/categories/get',
	async (param, { rejectWithValue }) => {
		try {
			const response = await categoriesApi.getCategories(param);
			return response;
		} catch (error) {
			return rejectWithValue(JSON.parse(JSON.stringify(error)));
		}
	},
);

export const getCategoryAsyncAction = createAsyncThunk('BLOG-APP/categories/read', async (id, { rejectWithValue }) => {
	try {
		const response = await categoriesApi.getCategory(id);
		return response;
	} catch (error) {
		return rejectWithValue(JSON.parse(JSON.stringify(error)));
	}
});

export const createCategoryAsyncAction = createAsyncThunk(
	'BLOG-APP/categories/create',
	async (payload, { rejectWithValue }) => {
		try {
			const response = await categoriesApi.createCategory(payload);
			return response;
		} catch (error) {
			return rejectWithValue(JSON.parse(JSON.stringify(error)));
		}
	},
);

export const updateCategoryAsyncAction = createAsyncThunk(
	'BLOG-APP/categories/update',
	async ({ id, payload }, { rejectWithValue }) => {
		try {
			const response = await categoriesApi.updateCategory(id, payload);
			return response;
		} catch (error) {
			return rejectWithValue(JSON.parse(JSON.stringify(error)));
		}
	},
);

export const deleteCategoryAsyncAction = createAsyncThunk(
	'BLOG-APP/categories/delete',
	async (id, { rejectWithValue }) => {
		try {
			const response = await categoriesApi.deleteCategory(id);
			return response;
		} catch (error) {
			return rejectWithValue(JSON.parse(JSON.stringify(error)));
		}
	},
);
