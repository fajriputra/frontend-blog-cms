import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { Row, Col, App } from 'antd';

import { useCategories } from '../../hooks/useCategories';

import BasePageHeader from '../../../../shared/components/BasePageHeader/BasePageHeader';

import CategoryForm from '../../components/CategoryForm/CategoryForm';

const CategoryCreateContainer = () => {
	const { message } = App.useApp();
	const navigate = useNavigate();
	const categories = useCategories();

	useEffect(() => {
		if (categories.state.status_POST === 'SUCCESS') {
			navigate('/app/categories/list');
			categories.resetStatus('POST');
			message.success({
				content: categories.state.message,
				duration: 3,
			});
		}
		if (categories.state.status_POST === 'FAILED') {
			categories.resetStatus('POST');
			message.error({
				content: categories.state.message,
				duration: 3,
			});
		}
	}, [categories.state.status_POST]);

	return (
		<Row gutter={[0, 24]}>
			<Col xs={24}>
				<BasePageHeader title='Create Category' onBack={() => navigate('/app/categories/list')} />
			</Col>
			<CategoryForm
				isLoadingSaveButton={categories.state.status_POST === 'LOADING'}
				onSubmit={(val) => categories.createCategory(val)}
				onCancel={() => navigate('/app/categories/list')}
			/>
		</Row>
	);
};

export default CategoryCreateContainer;
