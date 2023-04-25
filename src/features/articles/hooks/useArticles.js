import {
	createArticleAsyncAction,
	deleteArticleAsyncAction,
	getArticlesAsyncAction,
	getArticleAsyncAction,
	updateArticleAsyncAction,
} from '../store/articles.asyncAction';
import { articleSlice } from '../store/articles.slice';

import { useReduxDispatch } from '../../../shared/hooks/useReduxDispatch/useReduxDispatch';
import { useReduxSelector } from '../../../shared/hooks/useReduxSelector/useReduxSelector';

export const useArticles = () => {
	const dispatch = useReduxDispatch();
	const state = useReduxSelector((state) => state.articles);

	const resetAll = () => {
		dispatch(articleSlice.actions.resetAll());
	};

	const resetStatus = (param) => {
		dispatch(articleSlice.actions.resetStatus(param));
	};

	const getList = (param) => {
		dispatch(getArticlesAsyncAction(param));
	};

	const getDetail = (param) => {
		dispatch(getArticleAsyncAction(param));
	};

	const createArticle = (payload) => {
		dispatch(createArticleAsyncAction(payload));
	};

	const updateArticle = (id, payload) => {
		dispatch(updateArticleAsyncAction({ id, payload }));
	};

	const deleteArticle = (id) => {
		dispatch(deleteArticleAsyncAction(id));
	};

	return {
		state,
		resetStatus,
		resetAll,
		getList,
		getDetail,
		createArticle,
		updateArticle,
		deleteArticle,
	};
};
