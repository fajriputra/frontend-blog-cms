import React, { useEffect, useMemo, useState } from 'react';

import { useResponsive } from 'ahooks';
import { BsTrashFill, BsSignIntersectionFill } from 'react-icons/bs';
import { FaEdit } from 'react-icons/fa';

import { Button, Card, Col, Modal, Row, Space, Table, Tooltip, Typography } from 'antd';
import { EyeFilled } from '@ant-design/icons';

import BaseTableHeader from './BaseTableHeader/BaseTableHeader';
import BaseTablePagination from './BaseTablePagination/BaseTablePagination';
import BaseTableMobile from './BaseTableMobile/BaseTableMobile';

import './BaseTable.scss';

const BaseTable = ({
	column = [],
	dataSource = [],
	meta,
	onChange,
	filterOptions,
	isLoading = false,
	onDelete,
	onDetail,
	onEdit,
	showFilter,
	showFooter,
	showHeader,
	showInput,
	style,
	className,
}) => {
	const responsive = useResponsive();
	const [state, setState] = useState({
		currentPage: 0,
		perPage: 0,
		total: 0,
		search: '',
		filter: [],
	});

	const [deleteModalState, setDeleteModalState] = useState({
		isOpen: false,
		record: undefined,
	});

	const RemappedTableColumn = useMemo(() => {
		const nColumn = [];

		for (let index = 0; index < column.length; index++) {
			if (column[index].dataIndex === state?.sort?.by) {
				nColumn.push({
					...column[index],
					sortOrder: state?.sort?.direction,
					key: column[index].key,
				});
			} else {
				nColumn.push({
					...column[index],
					sortOrder: undefined,
				});
			}
		}

		return [
			...nColumn,
			...(onDelete || onEdit || onDetail
				? [
						{
							key: '_id',
							dataIndex: 'action',
							title: 'Action',
							align: 'center',
							width: 128,
							render: (_v, record) => {
								return (
									<Space>
										{onDetail && (
											<Tooltip placement='bottom' title='Detail'>
												<Button icon={<EyeFilled />} onClick={() => onDetail(record)} id='btn_detail' />
											</Tooltip>
										)}
										{onEdit && (
											<Tooltip placement='bottom' title='Edit'>
												<Button
													icon={
														<span className='anticon'>
															<FaEdit />
														</span>
													}
													onClick={() => onEdit(record)}
													id='btn_edit'
												/>
											</Tooltip>
										)}
										{onDelete && (
											<Tooltip placement='bottom' title='Delete'>
												<Button
													icon={
														<span className='anticon'>
															<BsTrashFill />
														</span>
													}
													onClick={() => setDeleteModalState({ isOpen: true, record: record })}
													id='btn_delete'
												/>
											</Tooltip>
										)}
									</Space>
								);
							},
						},
				  ]
				: []),
		];
	}, [column, state, meta, meta?.sort]);

	const internalHandleChange = (v) => {
		setState({ ...state, ...v });
		onChange && onChange({ ...state, ...v });
	};

	useEffect(() => {
		if (meta) {
			setState(meta);
		}
	}, [meta]);

	return (
		<React.Fragment>
			<div className={`shared-component BaseTable ${className}`} style={style}>
				<Card
					bordered={false}
					className={`BaseTable__outer-card ${!responsive['md'] && 'BaseTable__outer-card--mobile'}`}
				>
					<Row gutter={[8, 16]}>
						{showHeader && (
							<Col xs={24}>
								<BaseTableHeader
									data={state}
									showInput={showInput}
									onChange={(v) => internalHandleChange({ ...state, ...v, currentPage: 1 })}
									showFilter={showFilter}
									filterOptions={filterOptions}
								/>
							</Col>
						)}
						{responsive['md'] && (
							<Col xs={24}>
								<Table
									columns={RemappedTableColumn}
									dataSource={dataSource || []}
									loading={{
										tip: 'Loading Data...',
										spinning: isLoading,
									}}
									onChange={() => internalHandleChange(state)}
									pagination={false}
									rowKey={'_id'}
									showSorterTooltip={false}
									size='small'
								/>
							</Col>
						)}
						{!responsive['md'] && (
							<Col xs={24}>
								<BaseTableMobile
									{...{
										dataSource,
										isLoading,
										onDelete,
										onDetail,
										onEdit,
										RemappedTableColumn,
										setDeleteModalState,
									}}
								/>
							</Col>
						)}
						<Col xs={24}>
							{showFooter && (
								<BaseTablePagination data={state} onChange={(v) => internalHandleChange({ ...state, ...v })} />
							)}
						</Col>
					</Row>
				</Card>
			</div>
			<Modal
				cancelText='Cancel'
				okText='Yes, Delete'
				onCancel={() => setDeleteModalState({ isOpen: false, record: undefined })}
				onOk={() => {
					setDeleteModalState((vs) => ({ ...vs, ...{ isOpen: false } }));
					if (deleteModalState.record) {
						onDelete && onDelete(deleteModalState.record);
					}
				}}
				open={deleteModalState.isOpen}
				title='Confirmation Delete'
			>
				<Typography.Text>Are you sure want to delete this data?</Typography.Text>
			</Modal>
		</React.Fragment>
	);
};

export default BaseTable;
