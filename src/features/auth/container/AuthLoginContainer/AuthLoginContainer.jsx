import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import { Alert, Typography } from 'antd';

import { useAuth } from '../../hooks/useAuth';

import AuthLoginForm from '../../components/AuthLoginForm/AuthLoginForm';

const AuthLoginContainer = () => {
	const auth = useAuth();
	const navigate = useNavigate();

	useEffect(() => {
		if (auth.state.status_LOGIN === 'SUCCESS') {
			navigate('/app');
		}
	}, [auth.state.status_LOGIN]);

	return (
		<React.Fragment>
			<div style={{ marginBottom: 20 }}>
				<Typography.Title level={3} style={{ textAlign: 'center' }}>
					Blog CMS - Login
				</Typography.Title>
			</div>

			{auth.state.status_LOGIN === 'FAILED' && auth.state.message && (
				<Alert
					closable
					message={auth.state.message}
					onClose={() => auth.resetStatus('LOGIN')}
					showIcon
					style={{ marginBottom: 20 }}
					type='error'
				/>
			)}

			<AuthLoginForm isLoading={auth.state.status_LOGIN === 'LOADING'} onSubmit={(v) => auth.login(v)} />

			<div style={{ margin: '0 auto', textAlign: 'center', marginTop: 20 }}>
				<Link to='/auth/register'>Don't have an account?</Link>
			</div>
		</React.Fragment>
	);
};

export default AuthLoginContainer;
