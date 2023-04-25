import { useEffect, useState } from 'react';

import { useResponsive } from 'ahooks';

import { DownOutlined } from '@ant-design/icons';
import { Button, Col, Dropdown, Pagination, Row, Space, Typography } from 'antd';

const BaseTablePagination = ({ data, onChange }) => {
	const responsive = useResponsive();

	const [state, setState] = useState({
		perPage: 0,
		currentPage: 1,
		total: 0,
	});

	const internalHandleChange = (param) => {
		setState(param);
		onChange && onChange(param);
	};

	useEffect(() => {
		if (data) {
			setState(data);
		}
	}, [data]);

	return (
		<div className='BaseTable__pagination-wrap'>
			<Row>
				<Col md={12} xs={24}>
					{responsive['lg'] && (
						<Space>
							<Dropdown
								menu={{
									items: [
										{
											key: '5',
											label: 5,
										},
										{
											key: '10',
											label: 10,
										},
										{
											key: '20',
											label: 20,
										},
										{
											key: '40',
											label: 40,
										},
										{
											key: '50',
											label: 50,
										},
									],
									onClick: (v) => internalHandleChange({ ...state, perPage: parseInt(v.key), currentPage: 1 }),
									selectable: true,
									selectedKeys: [String(state.perPage)],
								}}
								placement='top'
							>
								<Button type='text'>
									<Space>
										<b>{state.perPage} Entries</b>
										<b>
											<DownOutlined />
										</b>
									</Space>
								</Button>
							</Dropdown>
							<Typography.Text>
								Showing {(state.perPage || 0) * (state.currentPage || 0) - (state.perPage || 0) + 1} to{' '}
								<b>
									{Math.ceil((state.total || 0) / (state.perPage || 0)) === (state.currentPage || 0)
										? state.total || 0
										: (state.perPage || 0) * (state.currentPage || 0)}
								</b>
								&nbsp;of&nbsp;
								<b>{state.total}</b> results&nbsp;
								<br />
							</Typography.Text>
						</Space>
					)}
				</Col>
				<Col lg={12} style={{ textAlign: responsive['lg'] ? 'right' : 'center' }} xs={24}>
					<Pagination
						current={state.currentPage}
						onChange={(v) => internalHandleChange({ ...state, currentPage: v })}
						pageSize={state.perPage}
						showSizeChanger={false}
						total={state.total}
					/>
				</Col>
			</Row>
		</div>
	);
};

export default BaseTablePagination;
