import { createSlice } from '@reduxjs/toolkit';

import { authSharedAsyncActionUnauthorized } from '../../../features/auth/store/auth.asyncAction';
import {
	createArticleAsyncAction,
	updateArticleAsyncAction,
	getArticlesAsyncAction,
	getArticleAsyncAction,
	deleteArticleAsyncAction,
} from './articles.asyncAction';

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

export const articleSlice = createSlice({
	name: 'BLOG-APP/articleSlice',
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
		builder.addCase(getArticlesAsyncAction.pending, (state) => {
			state.status_GET = 'LOADING';
		});
		builder.addCase(getArticlesAsyncAction.fulfilled, (state, { payload }) => {
			state.status_GET = 'SUCCESS';
			state.data = payload.data;
			state.meta = payload.meta;
		});
		builder.addCase(getArticlesAsyncAction.rejected, (state, { payload }) => {
			state.status_GET = 'FAILED';
			state.message = payload;
		});
		builder.addCase(getArticleAsyncAction.pending, (state) => {
			state.status_GET = 'LOADING';
		});
		builder.addCase(getArticleAsyncAction.fulfilled, (state, { payload }) => {
			state.status_GET = 'SUCCESS';
			state.detail = payload.data;
		});
		builder.addCase(getArticleAsyncAction.rejected, (state, { payload }) => {
			state.status_GET = 'FAILED';
			state.message = payload;
		});
		builder.addCase(createArticleAsyncAction.pending, (state) => {
			state.status_POST = 'LOADING';
		});
		builder.addCase(createArticleAsyncAction.fulfilled, (state, { payload }) => {
			state.status_POST = 'SUCCESS';
			state.message = payload.message;
		});
		builder.addCase(createArticleAsyncAction.rejected, (state, { payload }) => {
			state.status_POST = 'FAILED';
			state.message = payload;
		});
		builder.addCase(updateArticleAsyncAction.pending, (state) => {
			state.status_PUT = 'LOADING';
		});
		builder.addCase(updateArticleAsyncAction.fulfilled, (state, { payload }) => {
			state.status_PUT = 'SUCCESS';
			state.message = payload.message;
		});
		builder.addCase(updateArticleAsyncAction.rejected, (state, { payload }) => {
			state.status_PUT = 'FAILED';
			state.message = payload;
		});
		builder.addCase(deleteArticleAsyncAction.pending, (state) => {
			state.status_DELETE = 'LOADING';
		});
		builder.addCase(deleteArticleAsyncAction.fulfilled, (state, { payload }) => {
			state.status_DELETE = 'SUCCESS';
			state.message = payload.message;
		});
		builder.addCase(deleteArticleAsyncAction.rejected, (state, { payload }) => {
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
