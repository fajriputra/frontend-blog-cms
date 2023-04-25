import { createAsyncThunk } from '@reduxjs/toolkit';

import authApi from '../../../shared/datasource/auth.datasource';
import meApi from '../../../shared/datasource/me.datasource';

export const authAsyncActionRegister = createAsyncThunk(
	'BLOG-APP/auth/register',
	async (payload, { rejectWithValue }) => {
		try {
			const response = await authApi.Register(payload);
			return response;
		} catch (error) {
			return rejectWithValue(JSON.parse(JSON.stringify(error)));
		}
	},
);

export const authAsyncActionLogin = createAsyncThunk('BLOG-APP/auth/login', async (payload, { rejectWithValue }) => {
	try {
		const { data } = await authApi.Login(payload);
		await authApi.storeToken(data.token);
		const respMe = await meApi.getMe();
		return respMe;
	} catch (error) {
		return rejectWithValue(JSON.parse(JSON.stringify(error)));
	}
});

export const authAsyncActionCheckAuth = createAsyncThunk('BLOG-APP/auth/check-auth', async (_, { rejectWithValue }) => {
	try {
		const token = await authApi.getToken();

		if (token) {
			const { data } = await meApi.getMe();

			return data;
		} else {
			throw new Error();
		}
	} catch (error) {
		return rejectWithValue(JSON.parse(JSON.stringify(error)));
	}
});

export const authSharedAsyncActionUnauthorized = createAsyncThunk('BLOG-APP/unauthorized', async () => {
	await authApi.deleteToken();
	return {};
});
