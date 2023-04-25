import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { Row, Col, App } from 'antd';

import { useCategories } from '../../hooks/useCategories';

import BasePageHeader from '../../../../shared/components/BasePageHeader/BasePageHeader';

import CategoryForm from '../../components/CategoryForm/CategoryForm';

const CategoryEditContainer = () => {
	const { id } = useParams();
	const { message } = App.useApp();
	const navigate = useNavigate();
	const categories = useCategories();

	useEffect(() => {
		id && categories.getDetail(id);

		return () => {
			categories.resetStatus('GET');
		};
	}, [id]);

	useEffect(() => {
		if (categories.state.status_PUT === 'SUCCESS') {
			navigate('/app/categories/list');
			categories.resetStatus('PUT');
			message.success({
				content: categories.state.message,
			});
		}
		if (categories.state.status_PUT === 'FAILED') {
			categories.resetStatus('PUT');
			message.error({
				content: categories.state.message,
			});
		}
	}, [categories.state.status_PUT]);

	return (
		<Row gutter={[0, 24]}>
			<Col xs={24}>
				<BasePageHeader title='Edit Category' onBack={() => navigate('/app/categories/list')} />
			</Col>
			<CategoryForm
				isLoadingCard={categories.state.status_GET === 'LOADING'}
				isLoadingSaveButton={categories.state.status_PUT === 'LOADING'}
				onSubmit={(val) => categories.updateCategory(id, val)}
				isEdit
				data={categories.state.detail}
				onCancel={() => navigate('/app/categories/list')}
			/>
		</Row>
	);
};

export default CategoryEditContainer;
