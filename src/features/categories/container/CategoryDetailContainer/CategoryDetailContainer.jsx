import React, { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { Card, Col, Row } from 'antd';

import { useCategories } from '../../hooks/useCategories';

import BasePageHeader from '../../../../shared/components/BasePageHeader/BasePageHeader';

import CategoryDetail from '../../components/CategoryDetail/CategoryDetail';

const CategoryDetailContainer = () => {
	const { id } = useParams();
	const navigate = useNavigate();

	const { state, getDetail } = useCategories();

	useEffect(() => {
		id && getDetail(id);
	}, [id]);

	return (
		<Row gutter={[0, 24]}>
			<Col xs={24}>
				<BasePageHeader onBack={() => navigate('/app/categories/list')} title='Detail Category' />
			</Col>
			<Col xs={24}>
				<Card bordered={false} loading={state.status_GET === 'LOADING'}>
					<CategoryDetail {...state.detail} />
				</Card>
			</Col>
		</Row>
	);
};

export default CategoryDetailContainer;
