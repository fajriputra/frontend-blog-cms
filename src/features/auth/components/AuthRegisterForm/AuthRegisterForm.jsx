import { useEffect } from 'react';

import { useFormik } from 'formik';
import * as yup from 'yup';

import { Button, Form, Input } from 'antd';
import { LockOutlined, UserOutlined } from '@ant-design/icons';

import { useScrollToFirstFormError } from '../../../../shared/hooks/useScrollToFirstFormError/useScrollToFirstFormError';

const AuthRegisterForm = (props) => {
	const { errors, handleSubmit, touched, values, resetForm, setFieldValue, isSubmitting } = useFormik({
		initialValues: {
			username: '',
			email: '',
			password: '',
			password_confirmation: '',
		},
		validateOnChange: true,
		validateOnBlur: true,
		onSubmit: props.onSubmit,
		validationSchema: yup.object().shape({
			username: yup.string().min(3, 'Username must be at least 3 characters').required('Username is required'),
			email: yup.string().email('Must be a valid email address').required('Email is required'),
			password: yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
			password_confirmation: yup.string().oneOf([yup.ref('password'), null], 'Password confirmation doesn`t match'),
		}),
	});

	useScrollToFirstFormError({ isSubmitting, errors });

	useEffect(() => {
		if (props.status === 'SUCCESS') {
			resetForm();
		}
		if (props.status === 'FAILED') {
			setFieldValue('password', '');
			setFieldValue('password_confirmation', '');
		}
	}, [props.status]);

	return (
		<Form layout='vertical' onSubmitCapture={handleSubmit}>
			<Form.Item
				help={touched.username && errors.username ? errors.username : ''}
				label='Username'
				required
				validateStatus={touched.username && errors.username ? 'error' : 'validating'}
			>
				<Input
					id='input__username'
					onChange={(e) => setFieldValue('username', e.target.value)}
					placeholder='Input your username'
					prefix={<UserOutlined />}
					size='middle'
					value={values.username}
				/>
			</Form.Item>
			<Form.Item
				help={touched.email && errors.email ? errors.email : ''}
				label='Email'
				required
				validateStatus={touched.email && errors.email ? 'error' : 'validating'}
			>
				<Input
					id='input__email'
					onChange={(e) => setFieldValue('email', e.target.value)}
					placeholder='Input your email address'
					prefix={<UserOutlined />}
					size='middle'
					value={values.email}
				/>
			</Form.Item>
			<Form.Item
				help={touched.password && errors.password ? errors.password : ''}
				label='Password'
				required
				validateStatus={touched.password && errors.password ? 'error' : 'validating'}
			>
				<Input.Password
					id='input__password'
					onChange={(e) => setFieldValue('password', e.target.value)}
					placeholder='Input your password'
					prefix={<LockOutlined type='lock' />}
					size='middle'
					value={values.password}
				/>
			</Form.Item>
			<Form.Item
				help={touched.password_confirmation && errors.password_confirmation ? errors.password_confirmation : ''}
				label='Password Confirmation'
				required
				validateStatus={touched.password_confirmation && errors.password_confirmation ? 'error' : 'validating'}
			>
				<Input.Password
					id='input__password_confirmation'
					onChange={(e) => setFieldValue('password_confirmation', e.target.value)}
					placeholder='Input password confirmation'
					prefix={<LockOutlined type='lock' />}
					size='middle'
					value={values.password_confirmation}
				/>
			</Form.Item>
			<Button
				block
				htmlType='submit'
				id='login__button'
				loading={props.isLoading}
				style={{ marginTop: 6 }}
				type='primary'
			>
				Register
			</Button>
		</Form>
	);
};

export default AuthRegisterForm;
