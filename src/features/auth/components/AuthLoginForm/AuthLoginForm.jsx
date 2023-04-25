import { useFormik } from 'formik';
import * as yup from 'yup';

import { Button, Form, Input } from 'antd';
import { LockOutlined, UserOutlined } from '@ant-design/icons';

import { useScrollToFirstFormError } from '../../../../shared/hooks/useScrollToFirstFormError/useScrollToFirstFormError';

const AuthLoginForm = (props) => {
	const { errors, handleSubmit, touched, setFieldValue, isSubmitting } = useFormik({
		initialValues: {
			email: '',
			password: '',
		},
		validateOnChange: true,
		validateOnBlur: true,
		onSubmit: props.onSubmit,
		validationSchema: yup.object().shape({
			email: yup.string().email('Must be a valid email address').required('Email is required'),
			password: yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
		}),
	});

	useScrollToFirstFormError({ isSubmitting, errors });

	return (
		<Form layout='vertical' onSubmitCapture={handleSubmit}>
			<Form.Item
				help={touched.email && errors.email ? errors.email : ''}
				label='Email'
				name='email'
				required
				validateStatus={touched.email && errors.email ? 'error' : 'validating'}
			>
				<Input
					id='input__email'
					onChange={(e) => setFieldValue('email', e.target.value)}
					placeholder='Input your email address'
					prefix={<UserOutlined />}
					size='middle'
				/>
			</Form.Item>
			<Form.Item
				help={touched.password && errors.password ? errors.password : ''}
				label='Password'
				name='password'
				required
				validateStatus={touched.password && errors.password ? 'error' : 'validating'}
			>
				<Input.Password
					id='input__password'
					onChange={(e) => setFieldValue('password', e.target.value)}
					placeholder='Input your password'
					prefix={<LockOutlined type='lock' />}
					size='middle'
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
				Log in
			</Button>
		</Form>
	);
};

export default AuthLoginForm;
