import React from 'react';

import { useResponsive } from 'ahooks';

import { Button, Col, Row, Space, Tooltip, Typography } from 'antd';
import { ArrowLeftOutlined, PlusOutlined } from '@ant-design/icons';

import './BasePageHeader.scss';

const BasePageHeader = (props) => {
	const responsive = useResponsive();

	const isFullWidth = props.onAddData;

	return (
		<React.Fragment>
			<div className={`shared-component BasePageHeader`}>
				<Row align='middle' gutter={[16, 16]} justify='space-between'>
					<Col xl={isFullWidth ? 12 : 24} xs={24}>
						<Space align='center' size={16}>
							{props.onBack && (
								<Button
									icon={<ArrowLeftOutlined />}
									id='btn_back'
									onClick={props.onBack}
									size='middle'
									type='primary'
								/>
							)}
							<Typography.Title
								id='page_title'
								level={1}
								style={{ fontSize: responsive['md'] ? 24 : 16, marginBottom: 0 }}
							>
								{props.title}
							</Typography.Title>
						</Space>
					</Col>
					<Col xl={12} xs={24}>
						<Row align='middle' gutter={[responsive['md'] ? 16 : 8, 16]} justify='end'>
							{props.onAddData && (
								<Col xl={9} xs={12}>
									<Tooltip placement='bottom' title='Add New Data'>
										<Button
											block
											icon={<PlusOutlined />}
											id='btn_add_data'
											onClick={props.onAddData}
											size='middle'
											type='primary'
										>
											{props.onAddDataTitle ? props.onAddDataTitle : ' Add Data'}
										</Button>
									</Tooltip>
								</Col>
							)}
						</Row>
					</Col>
				</Row>
			</div>
		</React.Fragment>
	);
};

export default BasePageHeader;
