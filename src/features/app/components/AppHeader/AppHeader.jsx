import React from 'react';

import { useResponsive } from 'ahooks';

import { Avatar, Button, Divider, Dropdown, Row, Typography } from 'antd';
import { CaretDownFilled, MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons';

import { getRange, generateColorHsl, getInitials } from '../../../../shared/helpers/avatar.helper';
import { useAuth } from '../../../auth/hooks/useAuth';

import './AppHeader.scss';

const AppHeader = (props) => {
	const { md } = useResponsive();
	const { state } = useAuth();

	const saturationRange = getRange(50, 10);
	const lightnessRange = getRange(50, 10);

	const username = state?.profile?.username;
	const email = state?.profile?.email;
	const initialsName = getInitials(username);
	const bgColor = generateColorHsl(username, saturationRange, lightnessRange);

	return (
		<React.Fragment>
			<Button
				icon={props.siderCollapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
				id='btn_toggle'
				onClick={() => props.onCollapseSider(!props.siderCollapsed)}
				type='text'
			/>
			<Typography.Title level={4}>BLOG APP</Typography.Title>
			<div
				style={{
					display: 'flex',
					alignItems: 'center',
					justifyContent: 'space-between',
					marginLeft: 'auto',
					flexGrow: 0,
				}}
			>
				<Dropdown
					menu={{
						items: [
							{
								key: '1',
								id: 'menu__logout',
								danger: true,
								label: 'Log Out',
								onClick: () => props.onHandleLogout && props.onHandleLogout(),
							},
						],
					}}
					overlayStyle={{ paddingTop: '1em' }}
					trigger={['click']}
				>
					<a id='menu__dropdown' onClick={(e) => e.preventDefault()} style={{ border: 'none' }} type='default'>
						<Row align='middle' {...(md && { justify: 'space-evenly' })}>
							<Avatar
								size={40}
								style={{
									marginRight: 8,
									backgroundColor: bgColor,
									verticalAlign: 'middle',
									fontWeight: 500,
									fontSize: 14,
								}}
							>
								{initialsName}
							</Avatar>
							{md && (
								<div style={{ display: 'flex', flexDirection: 'column' }}>
									<Typography.Text style={{ lineHeight: 1.5715 }}>{username}</Typography.Text>
									<Typography.Text style={{ lineHeight: 1.5715, fontSize: '0.714rem' }}>{email}</Typography.Text>
								</div>
							)}
							{md && <Divider style={{ height: '2.5rem' }} type='vertical' />}
							{md && <Button icon={<CaretDownFilled />} style={{ border: 'none' }} type='text' />}
						</Row>
					</a>
				</Dropdown>
			</div>
		</React.Fragment>
	);
};

export default AppHeader;
