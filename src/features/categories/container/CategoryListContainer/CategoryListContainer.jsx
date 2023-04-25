import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { Col, Row } from 'antd';

import { useCategories } from '../../hooks/useCategories';

import BasePageHeader from '../../../../shared/components/BasePageHeader/BasePageHeader';
import BaseTable from '../../../../shared/components/BaseTable/BaseTable';

const CategoryListContainer = () => {
	const navigate = useNavigate();
	const categories = useCategories();

	const COLUMN_CATEGORY_LIST = [
		{
			title: 'No',
			dataIndex: '_id',
			sorter: false,
			mobileCol: 12,
			mobileShow: true,
			mobileOrder: 1,
			mobileAlign: 'left',
			mobileTitle: true,
			// eslint-disable-next-line
			render: (_, __, index) => categories.state.meta.perPage * (categories.state.meta.currentPage - 1) + ++index,
		},
		{
			title: 'Name',
			dataIndex: 'name',
			sorter: false,
			mobileCol: 24,
			mobileShow: true,
			mobileOrder: 3,
			mobileAlign: 'left',
			mobileTitle: true,
		},
	];

	useEffect(() => {
		categories.getList({ currentPage: 1, perPage: 10 });

		return () => {
			categories.resetStatus('GET');
		};
	}, []);

	return (
		<Row gutter={[0, 24]}>
			<Col xs={24}>
				<BasePageHeader
					title='List Category'
					onAddDataTitle='Add category'
					onAddData={() => navigate('/app/categories/create')}
				/>
			</Col>
			<Col xs={24}>
				<BaseTable
					column={COLUMN_CATEGORY_LIST}
					dataSource={categories.state.data}
					isLoading={categories.state.status_GET === 'LOADING'}
					meta={categories.state.meta}
					onChange={(v) => categories.getList(v)}
					onDetail={(v) => navigate(`/app/categories/detail/${v._id}`)}
					onEdit={(v) => navigate(`/app/categories/edit/${v._id}`)}
					showFilter
					showInput
					showFooter={categories.state.data.length > 0 ? true : false}
					showHeader
				/>
			</Col>
		</Row>
	);
};

export default CategoryListContainer;
