import { useState } from 'react';

import { App, Upload } from 'antd';
import { LoadingOutlined, InboxOutlined } from '@ant-design/icons';

import { fileToBase64 } from '../../helpers/fileToBase64';

import uploadApi from '../../datasource/upload.datasource';

import './BaseUploader.scss';

const BaseUploader = ({ url = '', alt, afterUpload = () => {} }) => {
	const [uploading, setUploading] = useState(false);
	const { message } = App.useApp();

	const beforeUpload = async (file) => {
		try {
			setUploading(true);

			const { base64 } = await fileToBase64(file);

			const resp = await uploadApi.Uploader({
				image: base64,
			});

			message.success({
				content: resp.message,
				duration: 3,
			});
			afterUpload(resp.data.image_url);
		} catch (err) {
			message.error({
				content: err,
				duration: 3,
			});
		} finally {
			setUploading(false);
		}
	};

	return (
		<Upload.Dragger
			className='shared-component uploader'
			showUploadList={false}
			beforeUpload={(file) => {
				beforeUpload(file);
			}}
		>
			{!url || uploading ? (
				<>
					<p className='ant-upload-drag-icon'>{uploading ? <LoadingOutlined /> : <InboxOutlined />}</p>
					<p className='ant-upload-text'>Click or drag to import an image</p>
				</>
			) : (
				<img className='img-container' alt={alt} src={url} />
			)}
		</Upload.Dragger>
	);
};

export default BaseUploader;
