import React from 'react';
import { Link } from 'react-router-dom';

import { Alert, Typography } from 'antd';

import { useAuth } from '../../hooks/useAuth';

import AuthRegisterForm from '../../components/AuthRegisterForm/AuthRegisterForm';

const AuthRegisterContainer = () => {
	const auth = useAuth();

	const handleSubmitRegister = (val) => {
		const { password_confirmation, ...payload } = val;

		auth.register(payload);
	};

	return (
		<React.Fragment>
			<div style={{ marginBottom: 20 }}>
				<Typography.Title level={3} style={{ textAlign: 'center' }}>
					Blog CMS - Register
				</Typography.Title>
			</div>

			{['FAILED', 'SUCCESS'].includes(auth.state.status_REGISTER) && auth.state.message && (
				<Alert
					closable
					message={auth.state.message}
					onClose={() => auth.resetStatus('REGISTER')}
					showIcon
					style={{ marginBottom: 20 }}
					type={
						(auth.state.status_REGISTER === 'FAILED' && 'error') ||
						(auth.state.status_REGISTER === 'SUCCESS' && 'success')
					}
				/>
			)}

			<AuthRegisterForm
				isLoading={auth.state.status_REGISTER === 'LOADING'}
				status={auth.state.status_REGISTER}
				onSubmit={(v) => handleSubmitRegister(v)}
			/>

			<div style={{ margin: '0 auto', textAlign: 'center', marginTop: 20 }}>
				<Link to='/auth/login'>Already have an account?</Link>
			</div>
		</React.Fragment>
	);
};

export default AuthRegisterContainer;
