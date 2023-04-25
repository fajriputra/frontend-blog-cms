import { Navigate, Outlet } from 'react-router-dom';

import { useAuth } from '../../hooks/useAuth';

const AuthGateContainer = () => {
	const auth = useAuth();

	return auth.state.isAuthenticated ? <Outlet /> : <Navigate replace to='/auth/login' />;
};

export default AuthGateContainer;
