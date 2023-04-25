import { combineReducers, configureStore } from '@reduxjs/toolkit';

import { appSlice } from '../../features/app/store/app.slice';
import { authSlice } from '../../features/auth/store/auth.slice';
import { categorySlice } from '../../features/categories/store/categories.slice';
import { articleSlice } from '../../features/articles/store/articles.slice';

const combinedReducer = combineReducers({
	app: appSlice.reducer,
	auth: authSlice.reducer,
	categories: categorySlice.reducer,
	articles: articleSlice.reducer,
});

export const reduxStore = configureStore({
	reducer: combinedReducer,
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware({
			immutableCheck: false,
			serializableCheck: false,
		}),
	devTools: {
		trace: false,
	},
});
