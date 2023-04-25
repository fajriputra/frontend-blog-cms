import { Navigate } from 'react-router-dom';

import BasePageLoader from '../shared/components/BasePageLoader/BasePageLoader';
import BasePageMetaHead from '../shared/components/BasePageMetaHead/BasePageMetaHead';
import AuthLayout from '../features/auth/components/AuthLayout/AuthLayout';

export const AuthRoutes = [
	{
		children: [
			{
				element: <Navigate to='login' />,
				index: true,
			},
			{
				element: (
					<>
						<BasePageMetaHead title='Authentication | Login' />
						<BasePageLoader pagePath='auth/PageAuthLogin' />
					</>
				),
				path: 'login',
			},
			{
				element: (
					<>
						<BasePageMetaHead title='Authentication | Register' />
						<BasePageLoader pagePath='auth/PageAuthRegister' />
					</>
				),
				path: 'register',
			},
		],
		element: <AuthLayout />,
	},
];
