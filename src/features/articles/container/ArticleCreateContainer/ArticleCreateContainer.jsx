import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { App, Col, Row } from 'antd';

import { useArticles } from '../../hooks/useArticles';
import { useCategories } from '../../../categories/hooks/useCategories';

import BasePageHeader from '../../../../shared/components/BasePageHeader/BasePageHeader';

import ArticleForm from '../../components/ArticleForm/ArticleForm';

const ArticleCreateContainer = () => {
	const { message } = App.useApp();
	const navigate = useNavigate();
	const articles = useArticles();
	const categories = useCategories();

	const CATEGORY_OPTIONS = categories.state.data.map((category) => ({ label: category.name, value: category._id }));

	useEffect(() => {
		categories.getList({ currentPage: 1, perPage: 1000 });

		return () => {
			categories.resetStatus('GET');
		};
	}, []);

	useEffect(() => {
		if (articles.state.status_POST === 'SUCCESS') {
			navigate('/app/articles/list');
			articles.resetStatus('POST');
			message.success({
				content: articles.state.message,
				duration: 3,
			});
		}
		if (articles.state.status_POST === 'FAILED') {
			articles.resetStatus('POST');
			message.error({
				content: articles.state.message,
				duration: 3,
			});
		}
	}, [articles.state.status_POST]);

	return (
		<Row gutter={[0, 24]}>
			<Col xs={24}>
				<BasePageHeader title='Create Article' onBack={() => navigate('/app/articles/list')} />
			</Col>
			<ArticleForm
				isLoadingSaveButton={articles.state.status_POST === 'LOADING'}
				onSubmit={(val) => articles.createArticle(val)}
				onCancel={() => navigate('/app/articles/list')}
				categoryOptions={CATEGORY_OPTIONS}
			/>
		</Row>
	);
};

export default ArticleCreateContainer;
