import { Navigate, Outlet } from 'react-router-dom';

import { useAuth } from '../../hooks/useAuth';

const AuthenticatedGateContainer = () => {
	const auth = useAuth();

	return !auth.state.isAuthenticated ? <Outlet /> : <Navigate replace to={'/app'} />;
};

export default AuthenticatedGateContainer;
