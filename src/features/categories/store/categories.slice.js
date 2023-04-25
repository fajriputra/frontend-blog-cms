import { createSlice } from '@reduxjs/toolkit';

import { authSharedAsyncActionUnauthorized } from '../../../features/auth/store/auth.asyncAction';
import {
	createCategoryAsyncAction,
	updateCategoryAsyncAction,
	getCategoriesAsyncAction,
	getCategoryAsyncAction,
	deleteCategoryAsyncAction,
} from './categories.asyncAction';

const initialState = {
	status_GET: 'IDLE',
	status_POST: 'IDLE',
	status_PUT: 'IDLE',
	status_DELETE: 'IDLE',
	message: '',
	data: [],
	detail: {},
	meta: {
		currentPage: 1,
		perPage: 10,
		total: 0,
		search: '',
		filter: [],
	},
};

export const categorySlice = createSlice({
	name: 'BLOG-APP/categorySlice',
	initialState,
	reducers: {
		resetAll(state) {
			state = initialState;
			return state;
		},
		resetStatus(state, action) {
			state.message = '';
			state.status_GET = action.payload === 'GET' ? 'IDLE' : state.status_GET;
			state.status_POST = action.payload === 'POST' ? 'IDLE' : state.status_POST;
			state.status_PUT = action.payload === 'PUT' ? 'IDLE' : state.status_PUT;
			state.status_DELETE = action.payload === 'DELETE' ? 'IDLE' : state.status_DELETE;
			return state;
		},
	},
	extraReducers: (builder) => {
		builder.addCase(getCategoriesAsyncAction.pending, (state) => {
			state.status_GET = 'LOADING';
		});
		builder.addCase(getCategoriesAsyncAction.fulfilled, (state, { payload }) => {
			state.status_GET = 'SUCCESS';
			state.data = payload.data;
			state.meta = payload.meta;
		});
		builder.addCase(getCategoriesAsyncAction.rejected, (state, { payload }) => {
			state.status_GET = 'FAILED';
			state.message = payload;
		});
		builder.addCase(getCategoryAsyncAction.pending, (state) => {
			state.status_GET = 'LOADING';
		});
		builder.addCase(getCategoryAsyncAction.fulfilled, (state, { payload }) => {
			state.status_GET = 'SUCCESS';
			state.detail = payload.data;
		});
		builder.addCase(getCategoryAsyncAction.rejected, (state, { payload }) => {
			state.status_GET = 'FAILED';
			state.message = payload;
		});
		builder.addCase(createCategoryAsyncAction.pending, (state) => {
			state.status_POST = 'LOADING';
		});
		builder.addCase(createCategoryAsyncAction.fulfilled, (state, { payload }) => {
			state.status_POST = 'SUCCESS';
			state.message = payload.message;
		});
		builder.addCase(createCategoryAsyncAction.rejected, (state, { payload }) => {
			state.status_POST = 'FAILED';
			state.message = payload;
		});
		builder.addCase(updateCategoryAsyncAction.pending, (state) => {
			state.status_PUT = 'LOADING';
		});
		builder.addCase(updateCategoryAsyncAction.fulfilled, (state, { payload }) => {
			state.status_PUT = 'SUCCESS';
			state.message = payload.message;
		});
		builder.addCase(updateCategoryAsyncAction.rejected, (state, { payload }) => {
			state.status_PUT = 'FAILED';
			state.message = payload;
		});
		builder.addCase(deleteCategoryAsyncAction.pending, (state) => {
			state.status_DELETE = 'LOADING';
		});
		builder.addCase(deleteCategoryAsyncAction.fulfilled, (state, { payload }) => {
			state.status_DELETE = 'SUCCESS';
			state.message = payload.message;
		});
		builder.addCase(deleteCategoryAsyncAction.rejected, (state, { payload }) => {
			state.status_DELETE = 'FAILED';
			state.message = payload;
		});
		builder.addCase(authSharedAsyncActionUnauthorized.fulfilled, (state) => {
			state = { ...initialState };
			return state;
		});

		return builder;
	},
});
