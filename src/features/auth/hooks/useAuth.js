import {
	authAsyncActionCheckAuth,
	authAsyncActionLogin,
	authAsyncActionRegister,
	authSharedAsyncActionUnauthorized,
} from '../store/auth.asyncAction';
import { authSlice } from '../store/auth.slice';

import { useReduxDispatch } from '../../../shared/hooks/useReduxDispatch/useReduxDispatch';
import { useReduxSelector } from '../../../shared/hooks/useReduxSelector/useReduxSelector';

export const useAuth = () => {
	const dispatch = useReduxDispatch();
	const state = useReduxSelector((state) => state.auth);

	const resetAll = () => {
		dispatch(authSlice.actions.resetAll());
	};

	const resetStatus = (param) => {
		dispatch(authSlice.actions.resetStatus(param));
	};

	const register = (param) => {
		dispatch(authAsyncActionRegister(param));
	};

	const login = (param) => {
		dispatch(authAsyncActionLogin(param));
	};

	const checkAuth = () => {
		dispatch(authAsyncActionCheckAuth());
	};

	const unauthorize = () => {
		dispatch(authSharedAsyncActionUnauthorized());
	};

	return {
		state,
		resetStatus,
		resetAll,
		register,
		login,
		checkAuth,
		unauthorize,
	};
};
