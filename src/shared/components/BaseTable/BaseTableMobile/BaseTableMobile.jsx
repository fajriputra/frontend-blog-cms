import React from 'react';
import { FaEdit } from 'react-icons/fa';
import { BsSignIntersectionFill, BsTrashFill } from 'react-icons/bs';

import { Button, Card, Col, Row, Space, Tooltip, Typography } from 'antd';
import { EyeFilled } from '@ant-design/icons';

import BaseEmptyData from '../../BaseEmptyData/BaseEmptyData';

const BaseTableMobile = ({
	dataSource = [],
	isLoading = false,
	onDelete,
	onDetail,
	onEdit,
	RemappedTableColumn,
	setDeleteModalState,
}) => {
	return (
		<Row gutter={[16, 16]}>
			{isLoading &&
				Array(5)
					.fill('vl')
					.map((_v, idx) => (
						<Col className='BaseTable__mobile-card' key={idx} xs={24}>
							<Card loading />
						</Col>
					))}
			{dataSource?.length > 0 ? (
				dataSource.map((v, idx) => (
					<Col key={idx} xs={24}>
						<Card className='BaseTable__mobile-card' key={idx}>
							<Row gutter={[8, 16]} style={{ marginBottom: 16 }}>
								{RemappedTableColumn.map(
									(v2, idx2) =>
										v2.dataIndex &&
										v2.mobileShow && (
											<Col key={idx2} order={v2.mobileOrder} style={{ textAlign: v2.mobileAlign }} xs={v2.mobileCol}>
												<Space direction='vertical'>
													{v2.mobileTitle && <Typography.Text>{v2.title}</Typography.Text>}
													{v2.render ? v2.render(v[v2.dataIndex], v, idx2 + idx) : v[v2.dataIndex]}
												</Space>
											</Col>
										),
								)}
							</Row>
							<Row gutter={[4, 4]}>
								{onDetail && (
									<Col flex={'1'} order={RemappedTableColumn.length}>
										<Tooltip placement='bottom' title='Detail'>
											<Button block onClick={() => onDetail && onDetail(v)} size='middle'>
												<EyeFilled />
											</Button>
										</Tooltip>
									</Col>
								)}
								{onEdit && (
									<Col flex={'1'} order={RemappedTableColumn.length}>
										<Tooltip placement='bottom' title='Edit'>
											<Button block onClick={() => onEdit && onEdit(v)} size='middle'>
												<span className='anticon'>
													<FaEdit />
												</span>
											</Button>
										</Tooltip>
									</Col>
								)}
								{onDelete && (
									<Col flex={'1'} order={RemappedTableColumn.length}>
										<Tooltip placement='bottom' title='Delete'>
											<Button block onClick={() => setDeleteModalState({ isOpen: true, record: v })} size='middle'>
												<span className='anticon'>
													<BsTrashFill />
												</span>
											</Button>
										</Tooltip>
									</Col>
								)}
							</Row>
						</Card>
					</Col>
				))
			) : (
				<Col xs={24}>
					<BaseEmptyData componentType='Table' />
				</Col>
			)}
		</Row>
	);
};

export default BaseTableMobile;
