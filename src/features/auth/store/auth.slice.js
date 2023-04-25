import { createSlice } from '@reduxjs/toolkit';

import {
	authAsyncActionCheckAuth,
	authAsyncActionRegister,
	authAsyncActionLogin,
	authSharedAsyncActionUnauthorized,
} from './auth.asyncAction';

const initialState = {
	isAuthenticated: false,
	isAuthReady: false,
	message: '',
	status_LOGIN: 'IDLE',
	status_REGISTER: 'IDLE',
	profile: {},
};

export const authSlice = createSlice({
	name: 'BLOG-APP/auth',
	initialState,
	reducers: {
		resetStatus(state, action) {
			state.message = '';
			state.status_LOGIN = action.payload === 'LOGIN' ? 'IDLE' : state.status_LOGIN;
			state.status_REGISTER = action.payload === 'REGISTER' ? 'IDLE' : state.status_REGISTER;
			return state;
		},
		resetAll(state) {
			state = initialState;
			return state;
		},
	},
	extraReducers: (builder) => {
		builder.addCase(authAsyncActionRegister.pending, (state) => {
			state.status_REGISTER = 'LOADING';
		});
		builder.addCase(authAsyncActionRegister.fulfilled, (state, { payload }) => {
			state.status_REGISTER = 'SUCCESS';
			state.message = payload.message;
		});
		builder.addCase(authAsyncActionRegister.rejected, (state, { payload }) => {
			state.status_REGISTER = 'FAILED';
			state.message = payload;
		});
		builder.addCase(authAsyncActionLogin.pending, (state) => {
			state.status_LOGIN = 'LOADING';
		});
		builder.addCase(authAsyncActionLogin.fulfilled, (state, { payload }) => {
			state.status_LOGIN = 'SUCCESS';
			state.isAuthenticated = true;
			state.isAuthReady = true;
			state.profile = payload.data.user;
		});
		builder.addCase(authAsyncActionLogin.rejected, (state, { payload }) => {
			state.status_LOGIN = 'FAILED';
			state.message = payload;
		});
		builder.addCase(authAsyncActionCheckAuth.pending, (state) => {
			state.status_LOGIN = 'LOADING';
		});
		builder.addCase(authAsyncActionCheckAuth.fulfilled, (state, { payload }) => {
			state.status_LOGIN = 'SUCCESS';
			state.isAuthenticated = true;
			state.isAuthReady = true;
			state.profile = payload.user;
		});
		builder.addCase(authAsyncActionCheckAuth.rejected, (state) => {
			state.status_LOGIN = 'FAILED';
			state.isAuthenticated = false;
			state.isAuthReady = true;
		});
		builder.addCase(authSharedAsyncActionUnauthorized.fulfilled, (state) => {
			state = { ...initialState };
			state.isAuthReady = true;
			return state;
		});
		return builder;
	},
});
