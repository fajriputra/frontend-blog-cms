import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { Card, Col, Row } from 'antd';

import { useArticles } from '../../hooks/useArticles';

import BasePageHeader from '../../../../shared/components/BasePageHeader/BasePageHeader';

import ArticleDetail from '../../components/ArticleDetail/ArticleDetail';

const ArticleDetailContainer = () => {
	const { id } = useParams();
	const navigate = useNavigate();

	const { state, getDetail } = useArticles();

	useEffect(() => {
		id && getDetail(id);
	}, [id]);

	return (
		<Row gutter={[0, 24]}>
			<Col xs={24}>
				<BasePageHeader onBack={() => navigate('/app/articles/list')} title='Detail Article' />
			</Col>
			<Col xs={24}>
				<Card bordered={false} loading={state.status_GET === 'LOADING'}>
					<ArticleDetail {...state.detail} />
				</Card>
			</Col>
		</Row>
	);
};

export default ArticleDetailContainer;
