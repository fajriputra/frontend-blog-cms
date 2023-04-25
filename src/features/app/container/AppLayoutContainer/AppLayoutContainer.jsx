import React, { useEffect, useState } from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';

import { Layout } from 'antd';
import { useResponsive } from 'ahooks';

import { useApp } from '../../hooks/useApp';
import { useAuth } from '../../../auth/hooks/useAuth';

import AppMenu from '../../components/AppMenu/AppMenu';
import AppHeader from '../../components/AppHeader/AppHeader';

import './AppLayoutContainer.scss';

const AppLayoutContainer = () => {
	const navigate = useNavigate();
	const { pathname } = useLocation();
	const { md } = useResponsive();
	const { ToggleSideBar, state } = useApp();
	const auth = useAuth();

	const [activeKey, setActiveKey] = useState('');

	const handleClickMenu = ({ key, keyPath }) => {
		setActiveKey(key);
		//transform keypath to route
		navigate(`${keyPath?.reverse().join('/')}`);
		!md && ToggleSideBar(!state.isSideBarOpen);
	};

	useEffect(() => {
		!md && ToggleSideBar(!state.isSideBarOpen);
		const pathnameArr = pathname.split('/');
		setActiveKey(pathnameArr[pathnameArr.length - 2]);
	}, [location]);

	return (
		<React.Fragment>
			<Layout className='features-app__App-layout__wrapper'>
				<Layout.Header className='features-app__App-layout__top-bar'>
					<AppHeader
						onCollapseSider={() => ToggleSideBar(!state.isSideBarOpen)}
						onHandleLogout={() => auth.unauthorize()}
						siderCollapsed={state.isSideBarOpen}
					/>
				</Layout.Header>
				<Layout>
					<Layout.Sider
						breakpoint='md'
						className={md ? 'features-app__App-layout__sider' : 'features-app__App-layout__sider-mobile'}
						collapsed={state.isSideBarOpen}
						{...(!md && { collapsedWidth: 0 })}
						collapsible
						trigger={null}
						width={md ? '16.25rem' : '100%'}
					>
						<AppMenu onClickMenu={(v) => handleClickMenu(v)} selectedKeys={activeKey} />
					</Layout.Sider>
					<Layout>
						<Layout.Content
							className={md ? 'features-app__App-layout__content' : 'features-app__App-layout__content-mobile'}
						>
							<Outlet />
						</Layout.Content>
					</Layout>
				</Layout>
			</Layout>
		</React.Fragment>
	);
};

export default AppLayoutContainer;
