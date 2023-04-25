import React from 'react';

import { Outlet } from 'react-router-dom';

import './AuthLayout.scss';

const AuthLayout = () => {
	return (
		<React.Fragment>
			<div className='features-auth__Auth-layout__wrapper'>
				<div className='features-auth__Auth-layout__inside'>
					<Outlet />
				</div>
			</div>
		</React.Fragment>
	);
};

export default AuthLayout;
