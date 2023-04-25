import { useEffect } from 'react';

import { useFormik, getIn } from 'formik';
import * as yup from 'yup';

import { App, Button, Card, Empty, Form, Image, Input, Select, Space } from 'antd';

import { useScrollToFirstFormError } from '../../../../shared/hooks/useScrollToFirstFormError/useScrollToFirstFormError';

import BaseUploader from '../../../../shared/components/BaseUploader/BaseUploader';
import BaseTextEditor from '../../../../shared/components/BaseTextEditor/BaseTextEditor';

const ArticleForm = (props) => {
	const { modal } = App.useApp();

	const initialValues = {
		title: '',
		description: '',
		category: undefined,
		image_url: '',
	};

	const { errors, handleSubmit, submitForm, touched, values, setFieldValue, isSubmitting } = useFormik({
		initialValues,
		onSubmit: (val) => props.onSubmit(val),
		validateOnChange: true,
		validateOnBlur: true,
		validationSchema: yup.object().shape({
			title: yup.string().min(3, 'Title must be at least 3 characters').required('Title is required'),
			description: yup
				.string()
				.min(16, 'Description must be at least 16 characters')
				.required('Description is required'),
			category: yup.string().required('Category is required'),
			image_url: yup.string().required('Image URL is required'),
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
		if (props.isEdit && props?.data) {
			const dt = props?.data;
			setFieldValue('title', dt.title);
			setFieldValue('description', dt.description);
			setFieldValue('category', dt.category?._id);
			setFieldValue('image_url', dt.image_url);
		}
	}, [props.isEdit, props.data]);

	return (
		<>
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
				<Form layout='vertical' onSubmitCapture={handleSubmit} autoComplete='off'>
					<Form.Item
						label='Title'
						required
						help={touched.title && errors.title ? getIn(errors, 'title') : ''}
						validateStatus={getIn(touched, 'title') && getIn(errors, 'title') ? 'error' : 'validating'}
					>
						<Input
							placeholder='Input article title'
							id='input__title'
							onChange={(e) => setFieldValue('title', e.target.value)}
							size='middle'
							value={values.title}
						/>
					</Form.Item>

					<Form.Item
						label='Category'
						required
						help={touched.category && errors.category ? getIn(errors, 'category') : ''}
						validateStatus={getIn(touched, 'category') && getIn(errors, 'category') ? 'error' : 'validating'}
					>
						<Select
							allowClear
							filterOption={(inpt, opt) => (opt?.label.toUpperCase()?.includes(inpt.toUpperCase()) ? true : false)}
							maxTagCount='responsive'
							notFoundContent={
								<Empty
									description='Category Not Found'
									image={
										<Image
											src='https://res.cloudinary.com/ddo4hnmnv/image/upload/v1682065293/nqljos2zz2yr7dsk4aq6.png'
											preview={false}
											width={100}
										/>
									}
									style={{ padding: 16 }}
								/>
							}
							onChange={(v) => setFieldValue('category', v)}
							options={props.categoryOptions}
							placeholder='Select Category'
							style={{ width: '100%' }}
							value={values.category}
						/>
					</Form.Item>

					<Form.Item
						label='Thumbnail'
						required
						help={touched.image_url && errors.image_url ? getIn(errors, 'image_url') : ''}
						validateStatus={getIn(touched, 'image_url') && getIn(errors, 'image_url') ? 'error' : 'validating'}
					>
						<BaseUploader
							url={values.image_url}
							alt='Thumbnail'
							afterUpload={(url) => {
								setFieldValue('image_url', url);
							}}
						/>
					</Form.Item>

					<Form.Item
						label='Description'
						required
						help={touched.image_url && errors.image_url ? getIn(errors, 'image_url') : ''}
						validateStatus={getIn(touched, 'image_url') && getIn(errors, 'image_url') ? 'error' : 'validating'}
					>
						<BaseTextEditor onChange={(e) => setFieldValue('description', e)} value={values.description} />
					</Form.Item>
				</Form>
			</Card>
		</>
	);
};

export default ArticleForm;
