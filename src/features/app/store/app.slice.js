import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	isSideBarOpen: false,
};

export const appSlice = createSlice({
	name: 'BLOG-CMS/app',
	initialState,
	reducers: {
		toggleSidebar(state, { payload }) {
			state.isSideBarOpen = payload;
		},
	},
});
