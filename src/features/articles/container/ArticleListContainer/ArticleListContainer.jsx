import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { Col, Row, App } from 'antd';

import { useArticles } from '../../hooks/useArticles';
import { useCategories } from '../../../categories/hooks/useCategories';

import BasePageHeader from '../../../../shared/components/BasePageHeader/BasePageHeader';
import BaseTable from '../../../../shared/components/BaseTable/BaseTable';

const ArticleListContainer = () => {
	const { message } = App.useApp();
	const navigate = useNavigate();
	const articles = useArticles();
	const categories = useCategories();

	const COLUMN_ARTICLE_LIST = [
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
			render: (_, __, index) => articles.state.meta.perPage * (articles.state.meta.currentPage - 1) + ++index,
		},
		{
			title: 'Title',
			dataIndex: 'title',
			sorter: false,
			mobileCol: 24,
			mobileShow: true,
			mobileOrder: 3,
			mobileAlign: 'left',
			mobileTitle: true,
		},
		{
			title: 'Category',
			dataIndex: 'category',
			sorter: false,
			mobileCol: 12,
			mobileShow: true,
			mobileOrder: 5,
			mobileAlign: 'left',
			mobileTitle: true,
			render: (record) => (record ? record.name : '-'),
		},
		{
			title: 'Author',
			dataIndex: 'author',
			sorter: false,
			mobileCol: 12,
			mobileShow: true,
			mobileOrder: 6,
			mobileAlign: 'left',
			mobileTitle: true,
			render: (record) => (record ? record.username : '-'),
		},
	];

	useEffect(() => {
		articles.getList({ currentPage: 1, perPage: 10 });
		categories.getList({ currentPage: 1, perPage: 1000 });

		return () => {
			articles.resetStatus('GET');
			categories.resetStatus('GET');
		};
	}, []);

	useEffect(() => {
		if (articles.state.status_DELETE === 'SUCCESS') {
			articles.getList({ currentPage: 1, perPage: 10 });
			articles.resetStatus('DELETE');
			message.success({
				content: articles.state.message,
			});
		}
		if (articles.state.status_DELETE === 'FAILED') {
			articles.resetStatus('DELETE');
			message.error({
				content: articles.state.message,
			});
		}
	}, [articles.state.status_DELETE]);

	return (
		<Row gutter={[0, 24]}>
			<Col xs={24}>
				<BasePageHeader
					title='List Article'
					onAddDataTitle='Add article'
					onAddData={() => navigate('/app/articles/create')}
				/>
			</Col>
			<Col xs={24}>
				<BaseTable
					column={COLUMN_ARTICLE_LIST}
					dataSource={articles.state.data}
					filterOptions={[
						{
							key: 'category',
							options: categories.state.data.map((category) => ({ label: category.name, value: category._id })),
							placeholder: 'Category',
						},
					]}
					isLoading={articles.state.status_GET === 'LOADING'}
					meta={articles.state.meta}
					onChange={(v) => articles.getList(v)}
					onDelete={(v) => articles.deleteArticle(v._id)}
					onDetail={(v) => navigate(`/app/articles/detail/${v._id}`)}
					onEdit={(v) => navigate(`/app/articles/edit/${v._id}`)}
					showFilter
					showInput
					showFooter={articles.state.data.length > 0 ? true : false}
					showHeader
				/>
			</Col>
		</Row>
	);
};

export default ArticleListContainer;
