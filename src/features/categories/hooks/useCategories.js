import {
	createCategoryAsyncAction,
	deleteCategoryAsyncAction,
	getCategoriesAsyncAction,
	getCategoryAsyncAction,
	updateCategoryAsyncAction,
} from '../store/categories.asyncAction';
import { categorySlice } from '../store/categories.slice';

import { useReduxDispatch } from '../../../shared/hooks/useReduxDispatch/useReduxDispatch';
import { useReduxSelector } from '../../../shared/hooks/useReduxSelector/useReduxSelector';

export const useCategories = () => {
	const dispatch = useReduxDispatch();
	const state = useReduxSelector((state) => state.categories);

	const resetAll = () => {
		dispatch(categorySlice.actions.resetAll());
	};

	const resetStatus = (param) => {
		dispatch(categorySlice.actions.resetStatus(param));
	};

	const getList = (param) => {
		dispatch(getCategoriesAsyncAction(param));
	};

	const getDetail = (param) => {
		dispatch(getCategoryAsyncAction(param));
	};

	const createCategory = (payload) => {
		dispatch(createCategoryAsyncAction(payload));
	};

	const updateCategory = (id, payload) => {
		dispatch(updateCategoryAsyncAction({ id, payload }));
	};

	const deleteCategory = (id) => {
		dispatch(deleteCategoryAsyncAction(id));
	};

	return {
		state,
		resetStatus,
		resetAll,
		getList,
		getDetail,
		createCategory,
		updateCategory,
		deleteCategory,
	};
};
