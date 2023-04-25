import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { App, Col, Row } from 'antd';

import { useArticles } from '../../hooks/useArticles';
import { useCategories } from '../../../categories/hooks/useCategories';

import BasePageHeader from '../../../../shared/components/BasePageHeader/BasePageHeader';

import ArticleForm from '../../components/ArticleForm/ArticleForm';

const ArticleEditContainer = () => {
	const { id } = useParams();
	const { message } = App.useApp();
	const navigate = useNavigate();
	const articles = useArticles();
	const categories = useCategories();

	const CATEGORY_OPTIONS = categories.state.data.map((category) => ({ label: category.name, value: category._id }));

	useEffect(() => {
		if (id) {
			articles.getDetail(id);
			categories.getList({ currentPage: 1, perPage: 1000 });

			return () => {
				articles.resetStatus('GET');
				categories.resetStatus('GET');
			};
		}
	}, [id]);

	useEffect(() => {
		if (articles.state.status_PUT === 'SUCCESS') {
			navigate('/app/articles/list');
			articles.resetStatus('PUT');
			message.success({
				content: articles.state.message,
				duration: 3,
			});
		}
		if (articles.state.status_PUT === 'FAILED') {
			articles.resetStatus('PUT');
			message.error({
				content: articles.state.message,
				duration: 3,
			});
		}
	}, [articles.state.status_PUT]);

	return (
		<Row gutter={[0, 24]}>
			<Col xs={24}>
				<BasePageHeader title='Edit Article' onBack={() => navigate('/app/articles/list')} />
			</Col>
			<ArticleForm
				isLoadingCard={articles.state.status_GET === 'LOADING'}
				isLoadingSaveButton={articles.state.status_PUT === 'LOADING'}
				onSubmit={(val) => articles.updateArticle(id, val)}
				onCancel={() => navigate('/app/articles/list')}
				categoryOptions={CATEGORY_OPTIONS}
				isEdit
				data={articles.state.detail}
			/>
		</Row>
	);
};

export default ArticleEditContainer;
