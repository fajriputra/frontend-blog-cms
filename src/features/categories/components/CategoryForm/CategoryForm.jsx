import { useEffect } from 'react';

import { useFormik } from 'formik';
import * as yup from 'yup';

import { App, Button, Card, Form, Input, Space } from 'antd';

import { useScrollToFirstFormError } from '../../../../shared/hooks/useScrollToFirstFormError/useScrollToFirstFormError';

const CategoryForm = (props) => {
	const { modal } = App.useApp();

	const { errors, handleSubmit, submitForm, touched, values, setFieldValue, isSubmitting } = useFormik({
		initialValues: {
			name: '',
		},
		validateOnChange: true,
		validateOnBlur: true,
		onSubmit: props.onSubmit,
		validationSchema: yup.object().shape({
			name: yup.string().min(3, 'Category must be at least 3 characters').required('Email is required'),
		}),
	});

	useScrollToFirstFormError({ isSubmitting, errors });

	const confirmationModal = () => {
		modal.confirm({
			title: 'Are you sure you want to cancel this action?',
			onOk() {
				props.onCancel();
			},
		});
	};

	useEffect(() => {
		if (props.isEdit && props.data) {
			const dt = props.data;
			setFieldValue('name', dt.name);
		}
	}, [props.isEdit, props.data]);

	return (
		<Card
			bordered={false}
			loading={props.isLoadingCard}
			actions={[
				<Space
					key={0}
					style={{ width: '100%', paddingLeft: '1rem', paddingRight: '1rem', justifyContent: 'end', borderRadius: 8 }}
				>
					<Button onClick={() => confirmationModal()}>Cancel</Button>
					<Button loading={props.isLoadingSaveButton} onClick={() => submitForm()} type='primary' htmlType='submit'>
						Save
					</Button>
				</Space>,
			]}
		>
			<Form layout='vertical' onSubmitCapture={handleSubmit}>
				<Form.Item
					help={touched.name && errors.name ? errors.name : ''}
					label='Name'
					required
					validateStatus={touched.name && errors.name ? 'error' : 'validating'}
				>
					<Input
						id='input__category_name'
						onChange={(e) => setFieldValue('name', e.target.value)}
						placeholder='Input category name'
						size='middle'
						value={values.name}
					/>
				</Form.Item>
			</Form>
		</Card>
	);
};

export default CategoryForm;
