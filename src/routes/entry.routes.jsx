import { Navigate } from 'react-router-dom';

import { AppRoutes } from './app.routes';
import { AuthRoutes } from './auth.routes';

import AuthGateContainer from '../features/auth/container/AuthGateContainer/AuthGateContainer';
import AuthenticatedGateContainer from '../features/auth/container/AuthenticatedGateContainer/AuthenticatedGateContainer';

import BasePageMetaHead from '../shared/components/BasePageMetaHead/BasePageMetaHead';
import BasePageNotFound from '../shared/components/BasePageNotFound/BasePageNotFound';

export const entryRoutes = [
	{
		element: <Navigate to='/auth' />,
		index: true,
	},
	{
		children: AppRoutes,
		element: (
			<>
				<BasePageMetaHead title='Application' />
				<AuthGateContainer />
			</>
		),
		path: 'app',
	},
	{
		children: AuthRoutes,
		element: <AuthenticatedGateContainer />,
		path: 'auth',
	},
	{
		element: <BasePageNotFound />,
		path: '404',
	},
];
