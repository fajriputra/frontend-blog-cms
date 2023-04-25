import React, { useEffect } from 'react';
import { useRoutes } from 'react-router-dom';

import { App } from 'antd';

import { useAuth } from '../features/auth/hooks/useAuth';

import { entryRoutes } from './entry.routes';

const RoutesComponent = () => {
	const route = useRoutes(entryRoutes);
	const auth = useAuth();
	const { notification } = App.useApp();

	useEffect(() => {
		auth.checkAuth();

		const evtFn = () => {
			auth.unauthorize();
			new window.Notification('Session has expired');
			notification.error({
				message: 'Session has expired',
			});
			window.location.reload();
		};

		window.addEventListener('APP_AUTH_UNAUTHORIZED', evtFn);

		return () => {
			window.removeEventListener('APP_AUTH_UNAUTHORIZED', evtFn);
		};
	}, []);

	return auth.state.isAuthReady ? route : <React.Fragment></React.Fragment>;
};

export default RoutesComponent;
